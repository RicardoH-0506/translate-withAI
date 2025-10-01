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
import { useTranslation } from './hooks/useTranslation'

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

  const { translatedText, error } = useTranslation({ fromLang, toLang, fromText })

  useEffect(() => {
    if (error != null) {
      setResult(error)
    } else {
      setResult(translatedText)
    }
  }, [translatedText, error])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className='d-md-flex flex-md-column'>
      <Container fluid>
        <h2 className='text-center my-4'>Translate with IA</h2>
        <Row>
          <Col xs={12} md={5}>
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

          <Col xs={12} md={2} className='d-flex align-items-center justify-content-center my-3'>
            <Button variant='link' disabled={fromLang === AUTO_LANGUAGE || fromLang === toLang || error != null} onClick={interchangeLanguages}>
              <ArrowsIcons />
            </Button>
          </Col>

          <Col xs={12} md={5}>
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
                valueFromLang={fromLang}
                valueToLang={toLang}
              />
            </Stack>
          </Col>

        </Row>
      </Container>
    </main>
  )
}

export default App
