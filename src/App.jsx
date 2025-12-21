import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Upload from './pages/Upload'
import Privacy from './pages/Privacy'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Upload />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
