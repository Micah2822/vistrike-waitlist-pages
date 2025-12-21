import { Link } from 'react-router-dom'
import './About.css'

function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1 className="logo-font">About Us</h1>
        <p className="about-subtitle">The story behind TactiQ Spar</p>
      </div>

      <div className="about-content card">
        <h3>Our Story</h3>
        
        <p>
          TactiQ Spar was born in the gym. Our founder, a former amateur boxer with years of 
          competitive experience, knew firsthand how difficult it was to get objective feedback 
          on sparring sessions. Coaches can only catch so much in real-time, and watching footage 
          back without proper tools meant hours of manual review.
        </p>

        <p>
          The idea was simple: what if AI could do the tedious work of tracking every punch, 
          every movement, every exchange—and give fighters and coaches the insights they need 
          to improve faster?
        </p>

        <hr />

        <h4>Built for Everyone</h4>
        <p>
          We believe every fighter deserves access to professional-level analysis. Whether you're 
          a beginner learning the fundamentals, an amateur preparing for competition, or a coach 
          working with multiple athletes—TactiQ Spar is designed to be accessible, affordable, 
          and easy to use.
        </p>

        <hr />

        <h4>The Competitive Edge</h4>
        <p>
          In boxing, the smallest details make the biggest difference. A slightly dropped guard, 
          a pattern in your combinations, a tendency to lean a certain way—these are the things 
          that separate good fighters from great ones. TactiQ Spar helps you see what you can't 
          see in the moment, so you can train smarter and fight better.
        </p>

        <hr />

        <h4>Our Mission</h4>
        <p>
          We're on a mission to democratize fight analysis. No expensive equipment, no complicated 
          setups—just upload your clip and get instant, actionable insights. We're building the 
          tools we wish we had when we were competing, and we're just getting started.
        </p>
      </div>

      <div className="back-link">
        <Link to="/">← Back to Home</Link>
      </div>
    </div>
  )
}

export default About
