import { useTheme } from '../hooks/useTheme'
import './ThemeToggle.css'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
    >
      {theme === 'light' ? (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M10 2.5C6.25 2.5 3.125 5.625 3.125 9.375C3.125 13.125 6.25 16.25 10 16.25C13.75 16.25 16.875 13.125 16.875 9.375C16.875 9.025 16.85 8.6825 16.805 8.3475C16.7275 8.995 16.1525 9.5 15.45 9.5C14.4375 9.5 13.625 8.6875 13.625 7.675C13.625 6.8775 14.135 6.1975 14.865 5.955C14.9525 5.9275 15.0425 5.905 15.135 5.8875C14.4825 4.205 12.87 3 11 3C8.5525 3 6.5 5.0525 6.5 7.5C6.5 8.03 6.5925 8.54 6.7625 9.01C6.035 9.3375 5.5 10.1075 5.5 11C5.5 12.2425 6.5075 13.25 7.75 13.25H12.5C13.7425 13.25 14.75 12.2425 14.75 11C14.75 9.8975 13.975 8.9725 12.94 8.7825C13.5125 8.375 13.875 7.645 13.875 6.8375"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M10 2.5V4M10 16V17.5M17.5 10H16M4 10H2.5M15.303 4.697L14.232 5.768M5.768 14.232L4.697 15.303M15.303 15.303L14.232 14.232M5.768 5.768L4.697 4.697"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  )
}

export default ThemeToggle
