import { Form } from 'react-bootstrap'
import { SectionType, type fromLanguage, type Language } from '../types.d'

interface TextAreaProps {
  loading?: boolean
  type: SectionType
  value: string
  valueFromLang?: fromLanguage,
  valueToLang?: Language
  onChange: (value: string) => void
}

const commonStyles = { border: 0, height: '200px', resize: 'none' }

type PlaceholderProps = {
  type: SectionType,
  loading?: boolean,
  valueFromLang?: fromLanguage,
  valueToLang?: Language
}

const getPlaceholder = ({ type, loading, valueFromLang, valueToLang }: PlaceholderProps) => {
  if (type === SectionType.FROM) return 'Introduce a text to translate'
  if (valueFromLang === valueToLang) return 'choose different languages'
  if (loading === true) return 'Loading...'

  return 'Translation'
}

export function TextArea ({ type, loading, value, valueFromLang, valueToLang, onChange }: TextAreaProps) {
  const styles = type === SectionType.FROM
    ? commonStyles
    : { ...commonStyles, backgroundColor: '#f5f5f5' }
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event?.target.value)
  }

  return (
    <Form.Control
      autoFocus={type === SectionType.FROM}
      disabled={type === SectionType.TO}
      as='textarea'
      placeholder={getPlaceholder({ type, loading, valueFromLang, valueToLang })}
      // @ts-expect-error resize none are not valid props according to types
      style={styles}
      value={value}
      onChange={handleChange}
    />
  )
}
