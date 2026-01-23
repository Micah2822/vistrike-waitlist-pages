import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo" data-testid="link-home">
          <span className="logo-text">VISTRKE</span>
        </Link>
        <nav className="nav">
          <a 
            href="https://tally.so/r/m6b09Y" 
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-link"
            data-testid="link-feedback"
          >
            Feedback
          </a>
          <Link to="/about" className="nav-link" data-testid="link-about">
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
