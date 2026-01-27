import { useState } from 'react'
import './Newsletter.css'

function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    if (window.mixpanel) {
      window.mixpanel.track('Waitlist Join Button Pressed', {
        email_provided: !!email
      })
    }

    setStatus('loading')

    try {
      const formData = new FormData()
      formData.append('email', email)
      
      await fetch('https://tally.so/r/7RN5AR', {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      })
      setStatus('success')
      setEmail('')
    } catch (err) {
      setStatus('success')
    }
  }

  return (
    <div className="newsletter-section" data-testid="section-newsletter">
      <div className="newsletter-container">
        <div className="newsletter-glow"></div>
        {status === 'success' ? (
          <div className="newsletter-success" data-testid="text-success">
            <div className="success-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div className="success-text">
              <span className="success-title">You're in!</span>
              <span className="success-subtitle">We'll notify you when we launch.</span>
            </div>
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email"
                value={email}
                data-testid="input-email"
                onFocus={() => {
                  if (window.mixpanel) {
                    window.mixpanel.track('Waitlist Email Input Focused')
                  }
                }}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              className="newsletter-btn"
              disabled={status === 'loading'}
              data-testid="button-join-beta"
            >
              {status === 'loading' ? (
                <span className="btn-loading">
                  <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                  </svg>
                  Joining...
                </span>
              ) : (
                'Join the Beta'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Newsletter
