import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Processing from '../components/Processing'
import Results from '../components/Results'
import Newsletter from '../components/Newsletter'
import './Upload.css'

const MAX_FILE_SIZE_MB = 50

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
    title: 'Real-Time Detection',
    subtitle: 'Frame-by-frame tracking'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    title: 'Complete Metrics',
    subtitle: 'Punches, accuracy, stance'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
      </svg>
    ),
    title: 'AI Verdict',
    subtitle: 'Objective winner analysis'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    title: 'Personal AI Coach',
    subtitle: 'Live feedback and drills'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    title: 'Technique Breakdown',
    subtitle: 'Form analysis'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Community',
    subtitle: 'Compete with others'
  }
]

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
      <div className="hero-section">
        <div className="hero-background">
          <div className="hero-glow"></div>
          <div className="hero-grid"></div>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-headline animate-fade-in" data-testid="text-headline">
            Fight smarter with<br /><span>visual intelligence</span>
          </h1>
          <h2 className="hero-subheadline animate-fade-in animate-delay-1" data-testid="text-subheadline">
            Built for everyday fighters. Powered by AI.
          </h2>
          <p className="hero-body animate-fade-in animate-delay-2" data-testid="text-body">
            Vistrike helps fighters train smarter with real-time feedback on every punch, every round, every session - straight to your device, with no cameras or extra equipment needed.
          </p>
          
          <div className="hero-cta animate-fade-in animate-delay-3">
            <Newsletter />
          </div>
        </div>
      </div>

      {!processing && !results && (
        <section className="preview-section" data-testid="section-preview">
          <div className="preview-background">
            <div className="preview-glow"></div>
            <div className="preview-glow-secondary"></div>
            <div className="preview-grid"></div>
            <div className="preview-scanlines"></div>
          </div>
          
          <div className="section-header">
            <span className="section-badge">Coming Soon</span>
            <h2 className="section-title">A sneak peek</h2>
            <p className="section-subtitle">See how Vistrike transforms your training footage</p>
          </div>
          
          <div className="demo-showcase">
            <div className="video-frame">
              <div className="frame-corner top-left"></div>
              <div className="frame-corner top-right"></div>
              <div className="frame-corner bottom-left"></div>
              <div className="frame-corner bottom-right"></div>
              <div className="frame-glow"></div>
              <video 
                className="showcase-video"
                autoPlay 
                loop 
                muted 
                playsInline
                data-testid="video-preview"
              >
                <source src="/assets/demo-preview.mp4" type="video/mp4" />
                <source src="/assets/demo-preview.mov" type="video/quicktime" />
              </video>
              <div className="video-overlay"></div>
            </div>
            
            <div className="analysis-dashboard">
              <div className="dashboard-header">
                <span className="dashboard-badge">AI Analysis</span>
                <h3 className="dashboard-title">Round Breakdown</h3>
              </div>
              
              <div className="fighters-comparison">
                <div className="fighter-card blue-corner">
                  <div className="fighter-header">
                    <span className="corner-indicator blue"></span>
                    <span className="corner-label">Blue Corner</span>
                  </div>
                  <div className="fighter-stats">
                    <div className="stat-row">
                      <span className="stat-name">Punches</span>
                      <span className="stat-number">3</span>
                    </div>
                    <div className="stat-row">
                      <span className="stat-name">Accuracy</span>
                      <div className="accuracy-bar">
                        <div className="accuracy-fill" style={{width: '0%'}}></div>
                        <span className="accuracy-text">0%</span>
                      </div>
                    </div>
                    <div className="stat-row">
                      <span className="stat-name">Defense</span>
                      <div className="accuracy-bar warning">
                        <div className="accuracy-fill" style={{width: '0%'}}></div>
                        <span className="accuracy-text">0/2</span>
                      </div>
                    </div>
                  </div>
                  <div className="fighter-insight">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 16v-4M12 8h.01"/>
                    </svg>
                    <span>High guard failed vs uppercut + hook pressure</span>
                  </div>
                </div>

                <div className="vs-divider">
                  <span>VS</span>
                </div>

                <div className="fighter-card red-corner">
                  <div className="fighter-header">
                    <span className="corner-indicator red"></span>
                    <span className="corner-label">Red Corner</span>
                  </div>
                  <div className="fighter-stats">
                    <div className="stat-row">
                      <span className="stat-name">Punches</span>
                      <span className="stat-number">4</span>
                    </div>
                    <div className="stat-row">
                      <span className="stat-name">Accuracy</span>
                      <div className="accuracy-bar success">
                        <div className="accuracy-fill" style={{width: '50%'}}></div>
                        <span className="accuracy-text">50%</span>
                      </div>
                    </div>
                    <div className="stat-row">
                      <span className="stat-name">Defense</span>
                      <div className="accuracy-bar success">
                        <div className="accuracy-fill" style={{width: '100%'}}></div>
                        <span className="accuracy-text">3/3</span>
                      </div>
                    </div>
                  </div>
                  <div className="fighter-insight success">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    <span>2 heavy head shots landed clean</span>
                  </div>
                </div>
              </div>

              <div className="key-moments">
                <h4 className="moments-title">Key Moments</h4>
                <div className="moments-timeline">
                  <div className="moment">
                    <div className="moment-time">0:01</div>
                    <div className="moment-event">
                      <span className="moment-dot blue"></span>
                      <span className="moment-text">Blue probes with jab — blocked</span>
                    </div>
                  </div>
                  <div className="moment highlight">
                    <div className="moment-time">0:04</div>
                    <div className="moment-event">
                      <span className="moment-dot red"></span>
                      <span className="moment-text">Red step-in uppercut — landed clean</span>
                    </div>
                  </div>
                  <div className="moment highlight">
                    <div className="moment-time">0:05</div>
                    <div className="moment-event">
                      <span className="moment-dot red"></span>
                      <span className="moment-text">Red rear hook — landed heavy</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="training-insights">
                <h4 className="insights-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  Training Focus
                </h4>
                <div className="insights-grid">
                  <div className="insight-card blue">
                    <span className="insight-corner">Blue</span>
                    <p>Drill catch-and-roll defense against uppercuts. Add double-jab setups before power shots.</p>
                  </div>
                  <div className="insight-card red">
                    <span className="insight-corner">Red</span>
                    <p>Keep hands home after hooks. Repeat step-in uppercut to hook combo — it's working.</p>
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
        <section className="features-section" data-testid="section-features">
          <div className="section-header">
            <h2 className="section-title">Features Coming Soon</h2>
          </div>
          <div className="features-reel">
            <div className="features-track">
              {[...features, ...features].map((feature, index) => (
                <div className="reel-item" key={index}>
                  <div className="reel-icon">{feature.icon}</div>
                  <strong>{feature.title}</strong>
                  <span>{feature.subtitle}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {!processing && !results && (
        <section className="use-cases-section" data-testid="section-use-cases">
          <div className="use-cases-glow"></div>
          <div className="use-cases-content">
            <h2 className="use-cases-title">What fighters use it for today</h2>
            <p className="use-cases-intro">Right now, fighters use Vistrike to:</p>
            <ul className="use-cases-list">
              <li>
                <span className="use-case-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="23 7 16 12 23 17 23 7"/>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                  </svg>
                </span>
                <span className="use-case-text">Break down sparring and fights</span>
              </li>
              <li>
                <span className="use-case-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                </span>
                <span className="use-case-text">Track patterns across sessions</span>
              </li>
              <li>
                <span className="use-case-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20h9"/>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                </span>
                <span className="use-case-text">Get objective feedback without constant coaching</span>
              </li>
            </ul>
          </div>
        </section>
      )}

      {!processing && !results && (
        <section className="beta-section" data-testid="section-beta">
          <div className="beta-glow"></div>
          <div className="beta-content">
            <h2 className="beta-title">Join the beta</h2>
            <p className="beta-intro">We're opening early access to a small group of fighters.</p>
            <p className="beta-subtitle">As a beta tester, you'll:</p>
            <ul className="beta-list">
              <li>
                <span className="beta-bullet"></span>
                <span className="beta-text">Get early access to Vistrike</span>
              </li>
              <li>
                <span className="beta-bullet"></span>
                <span className="beta-text">Help shape how the platform develops</span>
              </li>
              <li>
                <span className="beta-bullet"></span>
                <span className="beta-text">Be part of the first wave using AI to train smarter</span>
              </li>
            </ul>
            <div className="beta-cta">
              <Newsletter />
              <p className="beta-microcopy">No spam. Just early access.</p>
            </div>
          </div>
        </section>
      )}

      {!processing && !results && (
        <footer className="page-footer">
          <div className="footer-content">
            <p className="tech-info">Built by fighters, for fighters.</p>
            <div className="footer-links">
              <Link to="/privacy" data-testid="link-privacy">Privacy</Link>
              <span className="separator"></span>
              <a href="https://tally.so/r/m6b09Y" target="_blank" rel="noopener noreferrer" data-testid="link-footer-feedback">Feedback</a>
              <span className="separator"></span>
              <a href="https://www.instagram.com/vistrike_ai" target="_blank" rel="noopener noreferrer" className="instagram-link" data-testid="link-instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}

export default Upload
