import { useState, useEffect, useRef } from 'react'
import Newsletter from './Newsletter'
import './Results.css'

function Results({ data, onReset }) {
  const [downloading, setDownloading] = useState(false)
  const canvasRef = useRef(null)

  const metrics = data.metrics || {}
  const fighterStats = metrics.fighter_stats || {}
  const fighter1 = fighterStats.fighter_1 || {}
  const fighter2 = fighterStats.fighter_2 || {}
  const momentumData = metrics.momentum || []
  const heatmapData = metrics.heatmap || []

  useEffect(() => {
    if (momentumData.length > 0 && canvasRef.current) {
      drawSparkline()
    }
  }, [momentumData])

  useEffect(() => {
    const uploadId = data?.upload_id
    if (!uploadId || data?.storage_mode !== 'transient') return

    const cleanupFiles = () => {
      navigator.sendBeacon(`/api/cleanup/${uploadId}`)
    }

    const handleBeforeUnload = () => {
      cleanupFiles()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [data?.upload_id, data?.storage_mode])

  const drawSparkline = () => {
    const canvas = canvasRef.current
    if (!canvas || momentumData.length === 0) return

    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height
    const padding = 10

    ctx.clearRect(0, 0, width, height)

    const maxVal = Math.max(...momentumData, 1)
    const minVal = Math.min(...momentumData, 0)
    const range = maxVal - minVal || 1

    ctx.beginPath()
    ctx.strokeStyle = '#00E6A8'
    ctx.lineWidth = 2

    momentumData.forEach((val, i) => {
      const x = padding + (i / (momentumData.length - 1)) * (width - 2 * padding)
      const y = height - padding - ((val - minVal) / range) * (height - 2 * padding)
      
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    ctx.beginPath()
    ctx.fillStyle = 'rgba(0, 230, 168, 0.1)'
    momentumData.forEach((val, i) => {
      const x = padding + (i / (momentumData.length - 1)) * (width - 2 * padding)
      const y = height - padding - ((val - minVal) / range) * (height - 2 * padding)
      
      if (i === 0) {
        ctx.moveTo(x, height - padding)
        ctx.lineTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.lineTo(width - padding, height - padding)
    ctx.closePath()
    ctx.fill()
  }

  const getDownloadUrl = (url) => {
    if (!url) return null
    if (url.startsWith('/download/')) {
      return `/api${url}`
    }
    return url
  }

  const handleDownload = async () => {
    if (!data.video_url) return
    
    setDownloading(true)
    try {
      const downloadUrl = getDownloadUrl(data.video_url)
      const response = await fetch(downloadUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Vistrike_processed_${data.upload_id}.mp4`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      console.error('Download failed:', err)
      window.open(data.video_url, '_blank')
    }
    setDownloading(false)
  }

  const renderHeatmap = () => {
    if (!heatmapData || heatmapData.length === 0) {
      return <p className="no-data">No heatmap data available</p>
    }

    const maxHeat = Math.max(...heatmapData.flat(), 1)

    return (
      <div className="heatmap-grid">
        {heatmapData.map((row, rowIdx) => (
          row.map((cell, colIdx) => {
            const alpha = Math.min(cell / maxHeat, 1) * 0.8 + 0.1
            return (
              <div
                key={`${rowIdx}-${colIdx}`}
                className="heatmap-cell"
                style={{
                  backgroundColor: `rgba(0, 230, 168, ${alpha})`
                }}
              />
            )
          })
        ))}
      </div>
    )
  }

  const avgMomentum = momentumData.length > 0 
    ? (momentumData.reduce((a, b) => a + b, 0) / momentumData.length).toFixed(1)
    : '0'
  const peakMomentum = momentumData.length > 0 
    ? Math.max(...momentumData).toFixed(1)
    : '0'

  const calculateVerdict = () => {
    const f1Landed = fighter1.punches_landed || 0
    const f2Landed = fighter2.punches_landed || 0
    const f1Accuracy = fighter1.punch_accuracy || 0
    const f2Accuracy = fighter2.punch_accuracy || 0
    
    const maxLanded = Math.max(f1Landed, f2Landed, 1)
    const maxAccuracy = Math.max(f1Accuracy, f2Accuracy, 1)
    
    const f1LandedScore = (f1Landed / maxLanded) * 70
    const f2LandedScore = (f2Landed / maxLanded) * 70
    const f1AccuracyScore = (f1Accuracy / maxAccuracy) * 30
    const f2AccuracyScore = (f2Accuracy / maxAccuracy) * 30
    
    let f1Total = f1LandedScore + f1AccuracyScore
    let f2Total = f2LandedScore + f2AccuracyScore
    
    if (momentumData.length > 0 && Math.abs(f1Total - f2Total) < 5) {
      const avgMom = parseFloat(avgMomentum)
      if (avgMom > 0) {
        f1Total += Math.abs(avgMom) * 0.5
      } else if (avgMom < 0) {
        f2Total += Math.abs(avgMom) * 0.5
      }
    }
    
    const diff = Math.abs(f1Total - f2Total)
    
    if (diff < 3 || (f1Landed === 0 && f2Landed === 0)) {
      return {
        winner: null,
        message: "Too close to call - both fighters showed strong performance",
        isTie: true
      }
    }
    
    if (f1Total > f2Total) {
      return {
        winner: 1,
        message: "Based on the stats, Fighter 1 won in this clip",
        isTie: false
      }
    } else {
      return {
        winner: 2,
        message: "Based on the stats, Fighter 2 won in this clip",
        isTie: false
      }
    }
  }

  const verdict = calculateVerdict()

  return (
    <div className="results-page">
      <div className="results-header">
        <h2 className="results-title logo-font">Analysis Results</h2>
        <button className="btn-ghost" onClick={onReset}>
          ← Analyze Another Clip
        </button>
      </div>

      <section className="verdict-section">
        <h3>🤖 AI Verdict</h3>
        <div className={`verdict-card ${verdict.isTie ? 'tie' : verdict.winner === 1 ? 'fighter-1-win' : 'fighter-2-win'}`}>
          <div className="verdict-icon">
            {verdict.isTie ? '⚖️' : '🏆'}
          </div>
          <p className="verdict-message">{verdict.message}</p>
          {!verdict.isTie && (
            <div className="verdict-badge">
              {verdict.winner === 1 ? 'Fighter 1 (Red)' : 'Fighter 2 (Blue)'}
            </div>
          )}
        </div>
      </section>

      <section className="video-section">
        <h3>🎬 Processed Video</h3>
        {data.video_url ? (
          <>
            <video 
              className="result-video" 
              controls 
              src={getDownloadUrl(data.video_url)}
              playsInline
            />
            <button 
              className="btn-primary download-btn"
              onClick={handleDownload}
              disabled={downloading}
            >
              {downloading ? 'Downloading...' : '⬇️ Download Processed Video'}
            </button>
            {data.storage_mode === 'transient' && (
              <p className="transient-notice">
                This video is not stored. Download now - files are deleted when you leave this page.
              </p>
            )}
          </>
        ) : (
          <div className="video-placeholder">Video not available</div>
        )}
      </section>

      <section className="metrics-section">
        <h3>📊 Fight Metrics</h3>
        
        <div className="fighters-grid">
          <div className="fighter-card fighter-1">
            <div className="fighter-label">Fighter 1 (Red)</div>
            <div className="fighter-stats">
              <div className="stat">
                <span className="stat-value">{fighter1.punches_thrown || 0}</span>
                <span className="stat-label">Punches Thrown</span>
              </div>
              <div className="stat">
                <span className="stat-value">{fighter1.punches_landed || 0}</span>
                <span className="stat-label">Punches Landed</span>
              </div>
              <div className="stat">
                <span className="stat-value">{fighter1.punch_accuracy ? `${fighter1.punch_accuracy}%` : '0%'}</span>
                <span className="stat-label">Accuracy</span>
              </div>
            </div>
          </div>

          <div className="fighter-card fighter-2">
            <div className="fighter-label">Fighter 2 (Blue)</div>
            <div className="fighter-stats">
              <div className="stat">
                <span className="stat-value">{fighter2.punches_thrown || 0}</span>
                <span className="stat-label">Punches Thrown</span>
              </div>
              <div className="stat">
                <span className="stat-value">{fighter2.punches_landed || 0}</span>
                <span className="stat-label">Punches Landed</span>
              </div>
              <div className="stat">
                <span className="stat-value">{fighter2.punch_accuracy ? `${fighter2.punch_accuracy}%` : '0%'}</span>
                <span className="stat-label">Accuracy</span>
              </div>
            </div>
          </div>
        </div>

        {metrics.total_exchanges !== undefined && (
          <div className="exchange-info">
            <span className="exchange-badge">
              ⚡ {metrics.total_exchanges} Total Exchanges
            </span>
          </div>
        )}
      </section>

      {momentumData.length > 0 && (
        <section className="momentum-section">
          <h3>📈 Activity Over Time</h3>
          <div className="momentum-stats">
            <div className="momentum-stat">
              <span className="stat-value">{avgMomentum}</span>
              <span className="stat-label">Average Activity</span>
            </div>
            <div className="momentum-stat">
              <span className="stat-value">{peakMomentum}</span>
              <span className="stat-label">Peak Activity</span>
            </div>
          </div>
          <div className="sparkline-container">
            <canvas ref={canvasRef} width={600} height={120} className="sparkline-canvas" />
          </div>
        </section>
      )}

      {heatmapData.length > 0 && (
        <section className="heatmap-section">
          <h3>🗺️ Ring Position Heatmap</h3>
          <p className="heatmap-desc">Where fighters spent the most time</p>
          {renderHeatmap()}
        </section>
      )}

      <section className="report-section">
        <h3>📄 Download Report</h3>
        {data.pdf_report_url ? (
          <a 
            href={getDownloadUrl(data.pdf_report_url)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary"
          >
            📥 Download PDF Report
          </a>
        ) : (
          <p className="no-data">Report not available</p>
        )}
      </section>

      <div className="feedback-cta">
        <p>How was your experience?</p>
        <a 
          href="https://tally.so/r/m6b09Y" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-primary"
        >
          📝 Share Feedback
        </a>
      </div>

      <Newsletter />
    </div>
  )
}

export default Results
