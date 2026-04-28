export type NoteType = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B'

export type NoteWeights = Partial<Record<NoteType, number>>

export interface QuestionOption {
  id: string
  label: string
  text: string
  weights: NoteWeights
}

export interface Question {
  id: string
  prompt: string
  scene: string
  options: QuestionOption[]
}

export interface ResultProfile {
  note: NoteType
  title: string
  subtitle: string
  keywords: string[]
  description: string
  caution: string
  shareLine: string
  paletteHint: string
}

export type ResultProfileMap = Record<NoteType, ResultProfile>

export type ViewState = 'home' | 'quiz' | 'result'
