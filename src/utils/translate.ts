/**
 * Translate text using MyMemory API (free, no key needed).
 * Falls back to original text on error.
 */
export async function translateText(
  text: string,
  targetLang: string
): Promise<string> {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`
    const res = await fetch(url)
    const data = await res.json()

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return data.responseData.translatedText
    }
    return text
  } catch {
    return text
  }
}

/** Common languages with their codes */
export const languages = [
  { code: 'hi', label: 'Hindi' },
  { code: 'te', label: 'Telugu' },
  { code: 'ta', label: 'Tamil' },
  { code: 'kn', label: 'Kannada' },
  { code: 'ml', label: 'Malayalam' },
  { code: 'mr', label: 'Marathi' },
  { code: 'bn', label: 'Bengali' },
  { code: 'gu', label: 'Gujarati' },
  { code: 'pa', label: 'Punjabi' },
  { code: 'ur', label: 'Urdu' },
]
