import { useState, useCallback, createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RakhiSelectPage from './pages/RakhiSelectPage'
import MessagePage from './pages/MessagePage'
import PreviewPage from './pages/PreviewPage'
import WishPage from './pages/WishPage'
import LoadingScreen from './components/LoadingScreen'
import { ThemeProvider } from './hooks/useTheme'
import { generateWishId } from './utils/wishId'
import { saveWish } from './utils/wishStore'
import type { Rakhi } from './data/rakhis'

/* ── Create Flow Context ── */

interface CreateFlowState {
  selectedRakhi: Rakhi | null
  recipientName: string
  senderName: string
  message: string
  isSaving: boolean
  saveError: string | null
  view: 'steps' | 'letter'
  setSelectedRakhi: (rakhi: Rakhi) => void
  setRecipientName: (name: string) => void
  setSenderName: (name: string) => void
  setMessage: (msg: string) => void
  showLetter: () => void
  backToSteps: () => void
  createAndShare: () => Promise<void>
}

const CreateFlowContext = createContext<CreateFlowState | null>(null)

export function useCreateFlow() {
  const ctx = useContext(CreateFlowContext)
  if (!ctx) throw new Error('useCreateFlow must be used within CreateFlowProvider')
  return ctx
}

/* ── Create Flow Provider ── */

function CreateFlowProvider({ children }: { children: React.ReactNode }) {
  const [selectedRakhi, setSelectedRakhi] = useState<Rakhi | null>(null)
  const [recipientName, setRecipientName] = useState('')
  const [senderName, setSenderName] = useState('')
  const [message, setMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [view, setView] = useState<'steps' | 'letter'>('steps')

  const showLetter = useCallback(() => {
    setView('letter')
    setSaveError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const backToSteps = useCallback(() => {
    setView('steps')
    setSaveError(null)
  }, [])

  const createAndShare = useCallback(async () => {
    if (!selectedRakhi || !recipientName.trim() || !message.trim()) return

    setIsSaving(true)
    setSaveError(null)
    try {
      const wishId = generateWishId()
      await saveWish(selectedRakhi, recipientName, senderName, message, wishId)
      window.location.href = `/wish/${wishId}`
    } catch {
      setSaveError('Failed to save your wish. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }, [selectedRakhi, recipientName, senderName, message])

  return (
    <CreateFlowContext.Provider
      value={{
        selectedRakhi,
        recipientName,
        senderName,
        message,
        isSaving,
        saveError,
        view,
        setSelectedRakhi,
        setRecipientName,
        setSenderName,
        setMessage,
        showLetter,
        backToSteps,
        createAndShare,
      }}
    >
      {children}
    </CreateFlowContext.Provider>
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

/* ── App with Router ── */

function App() {
  return (
    <>
      <LoadingScreen />
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* Create flow — layout route shares one provider */}
            <Route
              path="/create"
              element={
                <CreateFlowProvider>
                  <Outlet />
                </CreateFlowProvider>
              }
            >
              <Route index element={<RakhiSelectPage />} />
              <Route path="message" element={<MessagePage />} />
              <Route path="preview" element={<PreviewPage />} />
            </Route>

            <Route path="/wish/:id" element={<WishPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
