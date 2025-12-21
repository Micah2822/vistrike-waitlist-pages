import { useState, useEffect } from 'react'
import './Processing.css'

const PHASE_NAMES = {
  uploading: '📤 Uploading video',
  preprocessing: '⚙️ Preparing analysis',
  detection: '🔍 Detecting fighters',
  rendering: '🎬 Rendering video',
  encoding: '🔄 Converting video',
  analysis: '📊 Analyzing punches',
  reports: '📝 Generating reports',
  uploading_results: '☁️ Uploading results',
  complete: '✅ Complete',
  unknown: '⏳ Processing'
}

function Processing({ file, onComplete, onError }) {
  const [phase, setPhase] = useState('uploading')
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    let pollInterval = null
    let mounted = true

    const mapServerProgress = (serverPercent) => {
      if (serverPercent <= 5) return 25
      if (serverPercent <= 50) return 25 + ((serverPercent - 5) / 45) * 35
      if (serverPercent <= 80) return 60 + ((serverPercent - 50) / 30) * 25
      return 85 + ((serverPercent - 80) / 20) * 15
    }

    const uploadAndProcess = async () => {
      try {
        const formData = new FormData()
        formData.append('file', file)

        const uploadPromise = new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest()
          
          xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable && mounted) {
              const uploadPercent = Math.floor((e.loaded / e.total) * 25)
              setPercent(Math.max(1, uploadPercent))
            }
          })

          xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                resolve(JSON.parse(xhr.responseText))
              } catch {
                reject(new Error('Invalid response'))
              }
            } else {
              try {
                const error = JSON.parse(xhr.responseText)
                reject(new Error(error.detail || 'Upload failed'))
              } catch {
                reject(new Error('Upload failed'))
              }
            }
          })

          xhr.addEventListener('error', () => reject(new Error('Upload failed')))
          xhr.open('POST', '/api/upload')
          xhr.send(formData)
        })

        const result = await uploadPromise
        if (!mounted) return

        setPercent(25)
        setPhase('detection')

        const pollStatus = async () => {
          if (!mounted) return

          try {
            const statusResponse = await fetch(`/api/status/${result.upload_id}`)
            if (!statusResponse.ok) return

            const statusData = await statusResponse.json()
            const progress = statusData.progress || {}

            if (progress.phase) {
              setPhase(progress.phase === 'uploading' ? 'uploading_results' : progress.phase)
            }

            const serverPercent = progress.percent || 0
            if (serverPercent > 0) {
              setPercent(Math.floor(mapServerProgress(serverPercent)))
            }

            if (statusData.status === 'completed') {
              clearInterval(pollInterval)
              setPercent(100)
              setPhase('complete')

              const resultsResponse = await fetch(`/api/results/${result.upload_id}`)
              if (resultsResponse.ok) {
                const resultsData = await resultsResponse.json()
                onComplete(resultsData)
              } else {
                throw new Error('Failed to retrieve results')
              }
            } else if (statusData.status === 'failed') {
              clearInterval(pollInterval)
              throw new Error('Processing failed. Please try again.')
            }
          } catch (err) {
            console.error('Status poll error:', err)
          }
        }

        pollStatus()
        pollInterval = setInterval(pollStatus, 3000)

      } catch (err) {
        if (pollInterval) clearInterval(pollInterval)
        onError(err.message)
      }
    }

    uploadAndProcess()

    return () => {
      mounted = false
      if (pollInterval) clearInterval(pollInterval)
    }
  }, [file, onComplete, onError])

  return (
    <div className="processing">
      <div className="processing-status">
        <div className="status-icon">
          {phase === 'complete' ? '✅' : '🎬'}
        </div>
        <div className="status-text">
          {PHASE_NAMES[phase] || PHASE_NAMES.unknown}
        </div>
      </div>

      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="progress-percent">{percent}%</div>

      <p className="processing-note">
        This may take a few minutes. Please don't close this page.
      </p>
    </div>
  )
}

export default Processing
