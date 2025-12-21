import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo logo-font">
          TACTIQ SPAR
        </Link>
        <nav className="nav">
          <a 
            href="https://tally.so/r/m6b09Y" 
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-link"
          >
            Share Feedback
          </a>
          <Link to="/about" className="nav-link">
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
