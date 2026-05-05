import {
  precisionQuestions,
  type PrecisionOptionId,
  type PrecisionTone,
} from '../data/precisionQuestions'
import { precisionReports, type PrecisionReport } from '../data/precisionReports'

export type PrecisionAnswerId = PrecisionOptionId

export type PrecisionAnswers = Partial<Record<string, PrecisionAnswerId | string>>

export type PrecisionScores = Record<PrecisionTone, number>

export interface PrecisionRankedNote {
  note: PrecisionTone
  score: number
}

export interface InvalidPrecisionAnswer {
  questionId: string
  answerId: string
}

export interface PrecisionResultResolution {
  scores: PrecisionScores
  deepScores: PrecisionScores
  rankedNotes: PrecisionRankedNote[]
  deepRankedNotes: PrecisionRankedNote[]
  primaryNote: PrecisionTone
  secondaryNote: PrecisionTone
  hiddenNote: PrecisionTone
  primaryReport: PrecisionReport
  secondaryReport: PrecisionReport
  hiddenReport: PrecisionReport
  answeredCount: number
  missingQuestionIds: string[]
  invalidAnswerIds: InvalidPrecisionAnswer[]
}

export const precisionToneOrder = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const satisfies readonly PrecisionTone[]

const precisionAnswerIds = ['A', 'B', 'C', 'D'] as const satisfies readonly PrecisionAnswerId[]

const precisionToneOrderIndex = new Map<PrecisionTone, number>(
  precisionToneOrder.map((note, index) => [note, index]),
)

const createEmptyScores = (): PrecisionScores =>
  Object.fromEntries(precisionToneOrder.map((note) => [note, 0])) as PrecisionScores

const isPrecisionTone = (value: string): value is PrecisionTone =>
  precisionToneOrder.includes(value as PrecisionTone)

const isPrecisionAnswerId = (value: string): value is PrecisionAnswerId =>
  precisionAnswerIds.includes(value as PrecisionAnswerId)

const rankScores = (scores: PrecisionScores): PrecisionRankedNote[] =>
  precisionToneOrder
    .map((note) => ({ note, score: scores[note] }))
    .sort(
      (left, right) =>
        right.score - left.score ||
        (precisionToneOrderIndex.get(left.note) ?? 0) - (precisionToneOrderIndex.get(right.note) ?? 0),
    )

const addScores = (scoreMap: Partial<Record<PrecisionTone, number>>, scores: PrecisionScores) => {
  Object.entries(scoreMap).forEach(([note, score]) => {
    if (!isPrecisionTone(note) || typeof score !== 'number' || !Number.isFinite(score)) {
      return
    }

    scores[note] += score
  })
}

const resolveHiddenNote = (
  rankedNotes: PrecisionRankedNote[],
  deepRankedNotes: PrecisionRankedNote[],
  primaryNote: PrecisionTone,
  secondaryNote: PrecisionTone,
): PrecisionTone => {
  const hiddenFromDeepScores = deepRankedNotes.find(
    ({ note, score }) => score > 0 && note !== primaryNote && note !== secondaryNote,
  )

  if (hiddenFromDeepScores) {
    return hiddenFromDeepScores.note
  }

  return (
    rankedNotes.find(({ note }) => note !== primaryNote && note !== secondaryNote)?.note ??
    rankedNotes[2]?.note ??
    primaryNote
  )
}

export const resolvePrecisionResult = (answers: PrecisionAnswers = {}): PrecisionResultResolution => {
  const scores = createEmptyScores()
  const deepScores = createEmptyScores()
  const missingQuestionIds: string[] = []
  const invalidAnswerIds: InvalidPrecisionAnswer[] = []
  let answeredCount = 0

  precisionQuestions.forEach((question) => {
    const answerId = answers[question.id]

    if (answerId === undefined || answerId.trim() === '') {
      missingQuestionIds.push(question.id)
      return
    }

    if (!isPrecisionAnswerId(answerId)) {
      invalidAnswerIds.push({ questionId: question.id, answerId })
      return
    }

    const selectedOption = question.options.find((option) => option.id === answerId)

    if (!selectedOption) {
      invalidAnswerIds.push({ questionId: question.id, answerId })
      return
    }

    answeredCount += 1
    addScores(selectedOption.scoreMap, scores)

    if (question.type === 'deep') {
      addScores(selectedOption.scoreMap, deepScores)
    }
  })

  const rankedNotes = rankScores(scores)
  const deepRankedNotes = rankScores(deepScores)
  const primaryNote = rankedNotes[0]?.note ?? 'C'
  const secondaryNote = rankedNotes[1]?.note ?? 'D'
  const hiddenNote = resolveHiddenNote(rankedNotes, deepRankedNotes, primaryNote, secondaryNote)

  return {
    scores,
    deepScores,
    rankedNotes,
    deepRankedNotes,
    primaryNote,
    secondaryNote,
    hiddenNote,
    primaryReport: precisionReports[primaryNote],
    secondaryReport: precisionReports[secondaryNote],
    hiddenReport: precisionReports[hiddenNote],
    answeredCount,
    missingQuestionIds,
    invalidAnswerIds,
  }
}
