import { content } from '../data/content'
import { useLanguage } from './useLanguage'

export function useContent() {
  const { language } = useLanguage()
  return content[language]
}
