import type { Language } from '../context/language-context'
import * as es from './es'
import * as en from './en'

export const content: Record<Language, typeof es> = { es, en }
