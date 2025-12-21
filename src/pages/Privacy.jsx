import { Link } from 'react-router-dom'
import './Privacy.css'

function Privacy() {
  return (
    <div className="privacy-page">
      <div className="privacy-hero">
        <h1 className="logo-font">Privacy Notice</h1>
        <p className="privacy-subtitle">How we handle your data</p>
      </div>

      <div className="privacy-content card">
        <h3>TACTIQ Spar – Privacy Notice</h3>
        <p className="last-updated"><strong>Last updated:</strong> December 15, 2025</p>
        
        <p>
          TACTIQ Spar ("we", "our", "us") respects your privacy and is committed to protecting your personal data. 
          This Privacy Notice explains how we collect, use, and store your information when you use our platform 
          to upload sparring videos or interact with our services.
        </p>

        <hr />

        <h4>1. Who We Are</h4>
        <p>
          TACTIQ Spar is a platform that allows fighters and coaches to upload, analyse, and review sparring footage.
        </p>
        <p>
          If you have any questions about this notice or your data, please contact us at:{' '}
          <a href="https://tally.so/r/3XVA9P" target="_blank" rel="noopener noreferrer">Contact Form</a>
        </p>

        <hr />

        <h4>2. How We Handle Your Videos</h4>
        <p>
          TACTIQ Spar operates with a <strong>Privacy-First</strong> approach:
        </p>
        <ul>
          <li>Your videos are processed but <strong>never stored on our servers</strong>.</li>
          <li>Results are available only during your session and are <strong>deleted immediately</strong> when you leave.</li>
          <li>Videos are <strong>not used to train AI models</strong>.</li>
        </ul>

        <hr />

        <h4>3. What Data We Collect</h4>
        <p>When you use TACTIQ Spar, we may collect and process the following types of data:</p>
        <ul>
          <li><strong>Uploaded Videos</strong> – including any visible or audible personal data (e.g. likeness, voice). These are processed temporarily and deleted immediately when you leave the page.</li>
          <li><strong>Metadata</strong> – such as upload time, file type, and device details.</li>
          <li><strong>Technical Data</strong> – IP address, browser type, and analytics data (via cookies or app telemetry). This data helps us analyze usage patterns and trends.</li>
          <li><strong>Optional Contact Information</strong> – if you choose to subscribe to our newsletter or contact us, we collect your name and email address.</li>
        </ul>

        <hr />

        <h4>4. How We Use Your Data</h4>
        <p>We use your data to:</p>
        <ol>
          <li><strong>Provide the core service</strong> – process and display your uploaded videos.</li>
          <li><strong>Maintain platform security</strong> – detect misuse or unauthorised activity.</li>
          <li><strong>Improve our services</strong> – analyze usage patterns, trends, and user behavior to enhance the user experience and platform functionality.</li>
          <li><strong>Communication</strong> – if you provide your email and name, we use this to send newsletters, promotional updates, or respond to your enquiries.</li>
        </ol>
        <p>
          We do <strong>not</strong> use your videos to train AI models.
        </p>

        <hr />

        <h4>5. Data Storage and Security</h4>
        <p>
          Videos are processed temporarily on secure servers and deleted immediately when you leave the page. We do not permanently store your video files.
        </p>

        <hr />

        <h4>6. Data Sharing</h4>
        <p>We do not sell or share your personal data with third parties for marketing.</p>

        <hr />

        <h4>7. Changes to This Notice</h4>
        <p>
          We may update this Privacy Notice periodically. Any changes will be posted on this page with an updated revision date.
        </p>

        <hr />

        <h4>8. Contact Us</h4>
        <p>If you have questions, contact:</p>
        <p>
          <a href="https://tally.so/r/3XVA9P" target="_blank" rel="noopener noreferrer">Contact Form</a><br />
          TACTIQ Spar
        </p>
      </div>

      <div className="back-link">
        <Link to="/">← Back to Home</Link>
      </div>
    </div>
  )
}

export default Privacy
