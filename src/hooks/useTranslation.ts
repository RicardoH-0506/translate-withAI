import { useEffect, useState } from 'react'
import { useDebounce } from './useDebounce'
import type { fromLanguage, Language } from '../types.d'

const TRANSLATE_API_URL = 'https://voiceless-regine-lorem-ipsum-c3e2b4d6.koyeb.app/translate'

type UseTranslationParams = {
  fromLang: fromLanguage
  toLang: Language
  fromText: string
}

export function useTranslation ({ fromLang, toLang, fromText }: UseTranslationParams) {
  const [translatedText, setTranslateText] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  // Aplica debounce al texto de entrada
  const debouncedText = useDebounce(fromText, 500)

  useEffect(() => {
    // controller to abort fetch
    const controller = new AbortController()
    const signal = controller.signal

    // no call api if text is empty
    if (!debouncedText) {
      setTranslateText('')
      return
    }
    // no call api if languages are the same
    if (fromLang === toLang) {
      setTranslateText('')
      return
    }

    // call api to translate
    const fetchTranslation = async () => {
      try {
        const response = await fetch(TRANSLATE_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fromLang,
            toLang,
            text: debouncedText
          }),
          signal
        })
        if (!response.ok) {
          throw new Error('Error in translation request')
        }
        const data = await response.json()
        const translatedText = data.translatedText?.[0]?.text ?? ''
        setTranslateText(translatedText)
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          // fetch was aborted
          return
        }
        setError(error instanceof Error ? error.message : String(error))
      }
    }

    fetchTranslation()
    // cleanup function to abort fetch on unmount or before next call
    return () => controller.abort()
  }, [debouncedText, fromLang, toLang])

  return { translatedText, error }
}
