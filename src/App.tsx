import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import CreateWishPage from './pages/CreateWishPage'
import LetterPage from './pages/LetterPage'
import WishPage from './pages/WishPage'
import LoadingScreen from './components/LoadingScreen'
import { ThemeProvider } from './hooks/useTheme'
import { generateWishId } from './utils/wishId'
import { saveWish } from './utils/wishStore'
import type { Rakhi } from './data/rakhis'

/* ── Create Flow (state managed here) ── */

function CreateFlow() {
  const navigate = useNavigate()
  const [selectedRakhi, setSelectedRakhi] = useState<Rakhi | null>(null)
  const [recipientName, setRecipientName] = useState('')
  const [message, setMessage] = useState('')
  const [view, setView] = useState<'create' | 'letter'>('create')
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const handleShowLetter = useCallback(() => {
    setView('letter')
    setSaveError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleBackToEdit = useCallback(() => {
    setView('create')
    setSaveError(null)
  }, [])

  const handleCreateAndShare = useCallback(async () => {
    if (!selectedRakhi || !recipientName.trim() || !message.trim()) return

    setIsSaving(true)
    setSaveError(null)
    try {
      const wishId = generateWishId()
      await saveWish(selectedRakhi, recipientName, message, wishId)
      navigate(`/wish/${wishId}`)
    } catch {
      setSaveError('Failed to save your wish. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }, [selectedRakhi, recipientName, message, navigate])

  if (view === 'letter') {
    return (
      <LetterPage
        selectedRakhi={selectedRakhi}
        recipientName={recipientName}
        message={message}
        onBack={handleBackToEdit}
        onShare={handleCreateAndShare}
        isSaving={isSaving}
        saveError={saveError}
      />
    )
  }

  return (
    <CreateWishPage
      selectedRakhi={selectedRakhi}
      recipientName={recipientName}
      message={message}
      onRakhiSelect={setSelectedRakhi}
      onRecipientNameChange={setRecipientName}
      onMessageChange={setMessage}
      onCreateWish={handleShowLetter}
    />
  )
}

/* ── App with Router ── */

function App() {
  return (
    <>
    <LoadingScreen />
    <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateFlow />} />
        <Route path="/wish/:id" element={<WishPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
    </>
  )
}

/* ── 404 Page ── */

function NotFound() {
  return (
    <main className="wish-page wish-page--error">
      <div className="wish-page__status animate-fade-in-up">
        <div className="wish-page__status-icon" aria-hidden="true">404</div>
        <h1 className="wish-page__status-title">Page Not Found</h1>
        <p className="wish-page__status-text">
          The page you're looking for doesn't exist.
        </p>
        <a href="/" className="btn btn-primary">
          Go Home
        </a>
      </div>
    </main>
  )
}

export default App
