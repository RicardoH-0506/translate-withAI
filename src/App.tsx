import { useStore } from './hooks/useStore'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { AUTO_LANGUAGE } from './constants'
import { Suspense, lazy, useEffect } from 'react'
import { useTranslation } from './hooks/useTranslation'
import { SectionType } from './types.d'

// Lazy load non-critical components
const LanguageSelector = lazy(() => import('./components/LanguageSelector').then(mod => ({ default: mod.LanguageSelector })))
const TextArea = lazy(() => import('./components/TextArea').then(mod => ({ default: mod.TextArea })))
const ArrowsIcons = lazy(() => import('./components/Icons').then(mod => ({ default: mod.ArrowsIcons })))

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
      <h2 className='text-center my-4'>Translate with AI</h2>

      <Row className='mb-3 align-items-center justify-content-between'>

        <Col xs={5} md={5}>
          <Suspense fallback={<div>Loading...</div>}>
            <LanguageSelector
              type={SectionType.FROM}
              value={fromLang}
              onChange={setFromLang}
            />
          </Suspense>
        </Col>

        <Col xs={2} md={2} className='d-flex justify-content-center align-items-center'>
          <Button
            variant='link'
            disabled={fromLang === AUTO_LANGUAGE || fromLang === toLang || error != null}
            onClick={interchangeLanguages}
          >
            <Suspense fallback={<div>↔</div>}>
              <ArrowsIcons />
            </Suspense>
          </Button>
        </Col>

        <Col xs={5} md={5}>
          <Suspense fallback={<div>Loading...</div>}>
            <LanguageSelector
              type={SectionType.TO}
              value={toLang}
              onChange={setToLang}
            />
          </Suspense>
        </Col>
      </Row>

      <Row className='justify-content-between'>

        <Col xs={12} md={5} className='mb-3 mb-md-0'>
          <Suspense fallback={<div>Loading...</div>}>
            <TextArea
              type={SectionType.FROM}
              value={fromText}
              onChange={setFromText}
            />
          </Suspense>
        </Col>

        <Col xs={12} md={5}>
          <Suspense fallback={<div>Loading...</div>}>
            <TextArea
              loading={loading}
              type={SectionType.TO}
              value={result}
              onChange={setResult}
              valueFromLang={fromLang}
              valueToLang={toLang}
            />
          </Suspense>
        </Col>
      </Row>
    </Container>
  )
}

export default App
