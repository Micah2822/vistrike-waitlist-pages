import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
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
        <h1 className="logo-font">TACT<span className="highlight-white">IQ</span> SPAR</h1>
        <p className="tagline logo-font">AI-POWERED BOXING ANALYSIS</p>
        <p className="subtitle">Welcome to the future of Combat Sports.<span style={{ display: 'block', marginBottom: '0.75rem' }}></span>Powered by cutting edge AI, TACTIQ delivers instant insights on every punch, fight, and training session straight to your phone. See your performance with precision and clarity.</p>
      </div>

      <div className="waitlist-cta">
        <Newsletter />
      </div>

      {!processing && !results && (
        <section className="preview-section">
          <div className="coming-soon-banner">Coming Soon</div>
          <h2 className="section-title">A sneak peek</h2>
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
          <h2 className="section-subtitle">Features Coming Soon</h2>
          <div className="features-reel">
            <div className="features-track">
              <div className="reel-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                <strong>Real-Time Detection</strong>
                <span>Frame-by-frame tracking</span>
              </div>
              <div className="reel-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8c0-2.2-1.8-4-4-4s-4 1.8-4 4c0 1.5.8 2.7 2 3.4V14l-6 6h4v2h6v-2h4l-6-6v-2.6c1.2-.7 2-1.9 2-3.4z"/></svg>
                <strong>Complete Metrics</strong>
                <span>Punches, accuracy, stance</span>
              </div>
              <div className="reel-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                <strong>AI Verdict</strong>
                <span>Objective winner analysis</span>
              </div>
              <div className="reel-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <strong>Personal AI Coach</strong>
                <span>Live feedback and drills</span>
              </div>
              <div className="reel-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                <strong>Technique Breakdown</strong>
                <span>Form analysis</span>
              </div>
              <div className="reel-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                <strong>Performance Trends</strong>
                <span>Track your progress</span>
              </div>
              <div className="reel-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <strong>Community Leaderboard</strong>
                <span>Compete with others</span>
              </div>
              <div className="reel-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                <strong>Real-Time Detection</strong>
                <span>Frame-by-frame tracking</span>
              </div>
              <div className="reel-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8c0-2.2-1.8-4-4-4s-4 1.8-4 4c0 1.5.8 2.7 2 3.4V14l-6 6h4v2h6v-2h4l-6-6v-2.6c1.2-.7 2-1.9 2-3.4z"/></svg>
                <strong>Complete Metrics</strong>
                <span>Punches, accuracy, stance</span>
              </div>
              <div className="reel-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                <strong>AI Verdict</strong>
                <span>Objective winner analysis</span>
              </div>
              <div className="reel-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <strong>Personal AI Coach</strong>
                <span>Live feedback and drills</span>
              </div>
              <div className="reel-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                <strong>Technique Breakdown</strong>
                <span>Form analysis</span>
              </div>
              <div className="reel-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                <strong>Performance Trends</strong>
                <span>Track your progress</span>
              </div>
              <div className="reel-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <strong>Community Leaderboard</strong>
                <span>Compete with others</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {!processing && !results && (
        <>
          <footer className="page-footer">
            <div className="footer-content">
              <p className="tech-info">
                Built by boxers for boxers and coaches.
              </p>
              <div className="footer-links">
                <Link to="/privacy">Privacy</Link>
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
