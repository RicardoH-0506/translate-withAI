import { useStore } from './hooks/useStore'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
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
    <Container fluid>
      <h2 className='text-center my-4'>Translate with IA</h2>

      <Row className='mb-3 align-items-center justify-content-between'>

        <Col xs={5} md={5}>
          <LanguageSelector
            type={SectionType.FROM}
            value={fromLang}
            onChange={setFromLang}
          />
        </Col>

        <Col xs={2} md={2} className='d-flex justify-content-center align-items-center'>
          <Button
            variant='link'
            disabled={fromLang === AUTO_LANGUAGE || fromLang === toLang || error != null}
            onClick={interchangeLanguages}
          >
            <ArrowsIcons />
          </Button>
        </Col>

        <Col xs={5} md={5}>
          <LanguageSelector
            type={SectionType.TO}
            value={toLang}
            onChange={setToLang}
          />
        </Col>
      </Row>

      <Row className='justify-content-between'>

        <Col xs={12} md={5} className='mb-3 mb-md-0'>
          <TextArea
            type={SectionType.FROM}
            value={fromText}
            onChange={setFromText}
          />
        </Col>

        <Col xs={12} md={5}>
          <TextArea
            loading={loading}
            type={SectionType.TO}
            value={result}
            onChange={setResult}
            valueFromLang={fromLang}
            valueToLang={toLang}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default App
