import { useState, useRef } from 'react'
import Processing from '../components/Processing'
import Results from '../components/Results'
import Newsletter from '../components/Newsletter'
import './Upload.css'

const MAX_FILE_SIZE_MB = 50

function Upload() {
  const [file, setFile] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFile = (selectedFile) => {
    setError(null)
    const fileSizeMB = selectedFile.size / (1024 * 1024)
    
    if (!selectedFile.name.toLowerCase().match(/\.(mp4|mov)$/)) {
      setError('Only .mp4 and .mov files are supported')
      return
    }
    
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      setError(`File too large! Your file is ${fileSizeMB.toFixed(1)}MB, but the maximum is ${MAX_FILE_SIZE_MB}MB.`)
      return
    }
    
    setFile(selectedFile)
    
    if (window.mixpanel) {
      window.mixpanel.track('Clip Upload Added', {
        file_size_mb: fileSizeMB.toFixed(2),
        file_type: selectedFile.name.split('.').pop().toLowerCase()
      })
    }
  }

  const handleAnalyze = () => {
    if (!file) return
    setProcessing(true)
    setError(null)
  }

  const handleProcessingComplete = (data) => {
    setProcessing(false)
    setResults(data)
    
    if (window.mixpanel) {
      window.mixpanel.track('Clip Upload Completed', {
        has_metrics: !!data?.metrics,
        fighter_count: data?.metrics?.fighter_stats ? Object.keys(data.metrics.fighter_stats).length : 0
      })
    }
  }

  const handleProcessingError = (err) => {
    setProcessing(false)
    setError(err)
  }

  const handleReset = () => {
    setFile(null)
    setProcessing(false)
    setResults(null)
    setError(null)
  }

  if (results) {
    return <Results data={results} onReset={handleReset} />
  }

  return (
    <div className="upload-page">
      <div className="hero">
        <h1 className="logo-font">TACTIQ SPAR</h1>
        <p className="tagline logo-font">BOXING CLIP ANALYSER</p>
        <p className="subtitle">Upload a boxing clip. Get instant AI-powered insights.</p>
      </div>

      {!processing && !results && (
        <section className="demo-section">
          <h2 className="section-title">See it in action</h2>
          <div className="demo-content">
            <div className="demo-videos">
              <div className="demo-video-container">
                <span className="demo-label">Before</span>
                <video 
                  className="demo-video"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                >
                  <source src="/assets/demo-before.mov" type="video/quicktime" />
                  <source src="/assets/demo-before.mov" type="video/mp4" />
                </video>
              </div>
              <div className="demo-video-container">
                <span className="demo-label">After</span>
                <video 
                  className="demo-video processed"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                >
                  <source src="/assets/demo-after.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
            
            <div className="sample-results">
              <div className="results-grid">
                <div className="result-item winner centered">
                  <span className="result-label">AI Verdict</span>
                  <span className="result-value">Fighter 1 (Red) Wins</span>
                </div>
                <div className="result-item punches">
                  <span className="result-label">Punches Thrown</span>
                  <div className="result-comparison">
                    <span className="fighter-red">4</span>
                    <span className="vs">vs</span>
                    <span className="fighter-blue">3</span>
                  </div>
                </div>
                <div className="result-item punches">
                  <span className="result-label">Punches Landed</span>
                  <div className="result-comparison">
                    <span className="fighter-red">3</span>
                    <span className="vs">vs</span>
                    <span className="fighter-blue">1</span>
                  </div>
                </div>
                <div className="result-item centered">
                  <span className="result-label">Accuracy</span>
                  <div className="result-comparison">
                    <span className="fighter-red">75%</span>
                    <span className="vs">vs</span>
                    <span className="fighter-blue">33%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="upload-section">
        {!processing && (
          <>
            <div className="upload-card">
              <div 
                className={`upload-zone ${dragActive ? 'active' : ''} ${file ? 'has-file' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept=".mp4,.mov,video/mp4,video/quicktime"
                  onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
                  hidden
                />
                {file ? (
                  <div className="file-info">
                    <span className="file-icon">🎬</span>
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">({(file.size / (1024 * 1024)).toFixed(1)} MB)</span>
                  </div>
                ) : (
                  <div className="upload-prompt">
                    <span className="upload-icon">📁</span>
                    <span>Drag & drop or click to select</span>
                  </div>
                )}
              </div>

              {error && <div className="error-message">❌ {error}</div>}

              {file && (
                <button 
                  className="btn-primary analyze-btn"
                  onClick={handleAnalyze}
                >
                  Analyze Clip
                </button>
              )}
            </div>

            {file && (
              <div className="privacy-notice">
                <div className="privacy-icon-large">🔒</div>
                <div className="privacy-text">
                  <strong>Privacy First</strong>
                  <span>Your footage is never stored or used for AI training. Files delete instantly when you leave.</span>
                </div>
              </div>
            )}
          </>
        )}

        {processing && (
          <Processing 
            file={file} 
            onComplete={handleProcessingComplete}
            onError={handleProcessingError}
          />
        )}
      </section>

      {!processing && !results && (
        <section className="features-section">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
              </div>
              <h3>Fighter Tracking</h3>
              <p>AI detects and tracks both fighters throughout the clip</p>
              <p className="feature-benefit">See winning positions and defensive gaps</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8c0-2.2-1.8-4-4-4s-4 1.8-4 4c0 1.5.8 2.7 2 3.4V14l-6 6h4v2h6v-2h4l-6-6v-2.6c1.2-.7 2-1.9 2-3.4z"/>
                </svg>
              </div>
              <h3>Punch Counting</h3>
              <p>Counts punches thrown and landed for each fighter</p>
              <p className="feature-benefit">Identify your best shots and where you're exposed</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
              </div>
              <h3>AI Verdict</h3>
              <p>Determines the winner based on performance metrics</p>
              <p className="feature-benefit">Understand what worked and what didn't</p>
            </div>
          </div>
          <div className="coming-soon-container">
            <p className="features-coming-soon">Much more coming soon including:</p>
            <div className="coming-soon-features">
              <div className="coming-soon-item">
                <strong>Personal AI Coach</strong> – Personalized improvements, drills, and live feedback
              </div>
              <div className="coming-soon-item">
                <strong>Bag Work & Pads Analysis</strong> – Heavy bag and pad technique breakdown
              </div>
              <div className="coming-soon-item">
                <strong>Performance Trends</strong> – Track your progress across multiple sessions
              </div>
              <div className="coming-soon-item">
                <strong>Technique Library</strong> – AI-powered recommendations for your style
              </div>
            </div>
          </div>
        </section>
      )}

      {!processing && !results && (
        <>
          <Newsletter />
          <footer className="page-footer">
            <div className="footer-content">
              <p className="tech-info">
                Powered by YOLOv8-pose ONNX. Built by boxers for boxers and coaches.
              </p>
              <div className="footer-links">
                <a href="/privacy">Privacy</a>
                <span className="separator">·</span>
                <a href="https://tally.so/r/m6b09Y" target="_blank" rel="noopener noreferrer">Feedback</a>
                <span className="separator">·</span>
                <a href="https://www.instagram.com/tactiqlabs" target="_blank" rel="noopener noreferrer" className="instagram-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  )
}

export default Upload
