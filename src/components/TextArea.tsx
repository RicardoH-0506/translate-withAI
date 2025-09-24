import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'

interface TextAreaProps {
  loading?: boolean
  type: SectionType
  value: string
  onChange: (value: string) => void
}

const commonStyles = { border: 0, height: '200px', resize: 'none' }

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.FROM) return 'Introducir texto'
  if (loading === true) return 'Cargando...'
  return 'Traduccion'
}

export function TextArea ({ type, loading, value, onChange }: TextAreaProps) {
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
      placeholder={getPlaceholder({ type, loading })}
      style={styles}
      value={value}
      onChange={handleChange}
    />
  )
}
