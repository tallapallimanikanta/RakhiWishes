import { useState, useEffect } from 'react'
import './LoadingScreen.css'

function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    // Start fading after 2 seconds
    const fadeTimer = setTimeout(() => {
      setFading(true)
    }, 2000)

    // Remove from DOM after fade
    const removeTimer = setTimeout(() => {
      setVisible(false)
    }, 2500)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div className={`loading-screen ${fading ? 'loading-screen--fade' : ''}`}>
      <div className="loading-screen__content">
        <img
          src="/loading.gif"
          alt="Loading..."
          className="loading-screen__gif"
        />
        <p className="loading-screen__text">Loading...</p>
      </div>
    </div>
  )
}

export default LoadingScreen
