import { useStore } from './hooks/useStore'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { AUTO_LANGUAGE } from './constants'
import { ArrowsIcons } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { TextArea } from './components/TextArea'
import { SectionType } from './types.d'
import { useEffect } from 'react'
import { useDebounce } from './hooks/useDebounce'

function App () {
  const {
    loading,
    fromLang,
    toLang,
    fromText,
    result,
    interchangeLanguages,
    setFromLang,
    setToLang,
    setFromText,
    setResult
  } = useStore()

  // Aplica debounce al texto de entrada
  const debouncedText = useDebounce(fromText, 500)

  useEffect(() => {
    // No llamar si no hay texto
    if (!debouncedText) {
      return
    }

    // Llama a la API de traducción
    const fetchTranslation = async () => {
      try {
        const response = await fetch('http://localhost:1234/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fromLang,
            toLang,
            text: debouncedText
          })
        })
        const data = await response.json()
        const textoTraducido = data.translatedText?.[0]?.text ?? ''
        setResult(textoTraducido)
      } catch (error) {
        setResult('Error al traducir')
      }
    }

    fetchTranslation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedText, fromLang, toLang])

  return (
    <Container fluid>
      <h2>Google Translate Clon</h2>
      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.FROM}
              value={fromLang}
              onChange={setFromLang}
            />
            <TextArea
              type={SectionType.FROM}
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>

        <Col xs='auto'>
          <Button variant='link' disabled={fromLang === AUTO_LANGUAGE} onClick={interchangeLanguages}>
            <ArrowsIcons />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>

            <LanguageSelector
              type={SectionType.TO}
              value={toLang}
              onChange={setToLang}
            />
            <TextArea
              loading={loading}
              type={SectionType.TO}
              value={result}
              onChange={setResult}
            />
          </Stack>
        </Col>

      </Row>
    </Container>
  )
}

export default App
