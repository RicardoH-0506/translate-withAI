import { useStore } from './hooks/useStore'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { AUTO_LANGUAGE } from './constants'
import { ArrowsIcons } from './components/icons'
import { LanguageSelector } from './components/LanguageSelector'

function App () {
  const { fromLang, toLang, interchangeLanguages, setFromLang, setToLang } = useStore()
  return (
    <Container fluid>
      <h1>Google Translate Clon</h1>
      <Row>
        <Col>
          <LanguageSelector
            type='from'
            value={fromLang}
            onChange={setFromLang}
          />
          {fromLang}
        </Col>

        <Col>
          <Button variant='link' disabled={fromLang === AUTO_LANGUAGE} onClick={interchangeLanguages}>
            <ArrowsIcons />
          </Button>
        </Col>

        <Col>
          <LanguageSelector
            type='to'
            value={toLang}
            onChange={setToLang}
          />
          {toLang}
        </Col>

      </Row>
    </Container>
  )
}

export default App
