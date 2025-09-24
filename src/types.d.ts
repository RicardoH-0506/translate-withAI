import type { SUPPORTED_LANGUAGES, AUTO_LANGUAGE } from './constants'

export type Language = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGE
export type fromLanguage = Language | AutoLanguage

export interface State {
  fromLang: fromLanguage,
  toLang: Language,
  fromText: string,
  result: string,
  loading: boolean
}

export type Action =
    { type: 'INTERCHANGE_LANGUAGES' } |
    { type: 'SET_FROM_LANG', payload: fromLanguage } |
    { type: 'SET_TO_LANG', payload: Language } |
    { type: 'SET_FROM_TEXT', payload: string } |
    { type: 'SET_RESULT', payload: string }

export enum SectionType {
  FROM = 'from',
  TO = 'to'
}
