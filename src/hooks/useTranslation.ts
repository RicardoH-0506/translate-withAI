import { useEffect, useState } from 'react'
import { useDebounce } from './useDebounce'
import type { fromLanguage, Language } from '../types.d'

type UseTranslationParams = {
  fromLang: fromLanguage
  toLang: Language
  fromText: string
}

export function useTranslation ({ fromLang, toLang, fromText }: UseTranslationParams) {
  const [translatedText, setTranslateText] = useState('')
  // Aplica debounce al texto de entrada
  const debouncedText = useDebounce(fromText, 300)

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
        const response = await fetch('http://localhost:1234/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fromLang,
            toLang,
            text: debouncedText
          }),
          signal
        })
        const data = await response.json()
        const translatedText = data.translatedText?.[0]?.text ?? ''
        setTranslateText(translatedText)
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          // fetch was aborted
          return
        }
        setTranslateText('Translation error')
      }
    }

    fetchTranslation()
    // cleanup function to abort fetch on unmount or before next call
    return () => controller.abort()
  }, [debouncedText, fromLang, toLang])

  return translatedText
}
