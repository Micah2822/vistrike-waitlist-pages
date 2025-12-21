import { useState } from 'react'
import './Newsletter.css'

function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    const formData = new FormData()
    formData.append('fields[email]', email)
    formData.append('ml-submit', '1')
    formData.append('anticsrf', 'true')

    try {
      await fetch('https://assets.mailerlite.com/jsonp/1989417/forms/174078332395062862/subscribe', {
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
    <div className="newsletter-section">
      <div className="newsletter-content">
        <h3 className="newsletter-title">Join the Waitlist</h3>
        <p className="newsletter-subtitle">Get notified when we launch v2.0</p>
        
        {status === 'success' ? (
          <div className="newsletter-success">
            <span className="success-icon">✓</span>
            <span>You're on the list!</span>
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="newsletter-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button 
              type="submit" 
              className="newsletter-btn"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Newsletter
