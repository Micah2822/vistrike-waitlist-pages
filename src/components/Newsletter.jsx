import { useEffect } from 'react'
import './Newsletter.css'

function Newsletter() {
  useEffect(() => {
    const loadTallyScript = () => {
      if (typeof window.Tally !== 'undefined') {
        window.Tally.loadEmbeds()
        return
      }

      const scriptSrc = 'https://tally.so/widgets/embed.js'
      if (document.querySelector(`script[src="${scriptSrc}"]`)) return

      const script = document.createElement('script')
      script.src = scriptSrc
      script.onload = () => {
        if (typeof window.Tally !== 'undefined') {
          window.Tally.loadEmbeds()
        } else {
          document.querySelectorAll('iframe[data-tally-src]:not([src])').forEach((iframe) => {
            iframe.src = iframe.dataset.tallySrc
          })
        }
      }
      script.onerror = () => {
        document.querySelectorAll('iframe[data-tally-src]:not([src])').forEach((iframe) => {
          iframe.src = iframe.dataset.tallySrc
        })
      }
      document.body.appendChild(script)
    }

    loadTallyScript()
  }, [])

  return (
    <div className="newsletter-section" data-testid="section-newsletter">
      <div className="newsletter-container">
        <div className="newsletter-glow"></div>
        <div className="tally-wrapper">
          <iframe
            data-tally-src="https://tally.so/embed/7RN5AR?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="189"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="VISTRIKE Sign Up"
            data-testid="iframe-signup"
          />
        </div>
      </div>
    </div>
  )
}

export default Newsletter
