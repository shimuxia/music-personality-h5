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

export type SecondaryBlackKeyId =
  | 'C_SHARP_D_FLAT'
  | 'D_SHARP_E_FLAT'
  | 'F_SHARP_G_FLAT'
  | 'G_SHARP_A_FLAT'
  | 'A_SHARP_B_FLAT'

export interface SecondaryBlackKey {
  key: SecondaryBlackKeyId
  label: string
  between: [PrecisionTone, PrecisionTone]
  sourceNote: PrecisionTone
  description: string
}

export interface PrecisionResultResolution {
  scores: PrecisionScores
  deepScores: PrecisionScores
  rankedNotes: PrecisionRankedNote[]
  deepRankedNotes: PrecisionRankedNote[]
  primaryNote: PrecisionTone
  secondaryNote: PrecisionTone
  secondaryBlackKey: SecondaryBlackKey
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

const secondaryBlackKeyDefinitions: Record<SecondaryBlackKeyId, Omit<SecondaryBlackKey, 'sourceNote'>> = {
  C_SHARP_D_FLAT: {
    key: 'C_SHARP_D_FLAT',
    label: 'C♯ / D♭',
    between: ['C', 'D'],
    description: '稳定与流动之间，说明你在秩序里保留改写路线的能力。',
  },
  D_SHARP_E_FLAT: {
    key: 'D_SHARP_E_FLAT',
    label: 'D♯ / E♭',
    between: ['D', 'E'],
    description: '探索与表达之间，说明你被新可能吸引，也希望把真实表达出来。',
  },
  F_SHARP_G_FLAT: {
    key: 'F_SHARP_G_FLAT',
    label: 'F♯ / G♭',
    between: ['F', 'G'],
    description: '沉淀与结构之间，说明你的安静不是停滞，而是在内部搭建秩序。',
  },
  G_SHARP_A_FLAT: {
    key: 'G_SHARP_A_FLAT',
    label: 'G♯ / A♭',
    between: ['G', 'A'],
    description: '结构与感知之间，说明你会用理性保护敏感，也会用结构安放情绪。',
  },
  A_SHARP_B_FLAT: {
    key: 'A_SHARP_B_FLAT',
    label: 'A♯ / B♭',
    between: ['A', 'B'],
    description: '温柔与边界之间，说明你能照顾别人，也会在关键处保留自己的异质感。',
  },
}

const secondaryBlackKeyCandidates: Record<
  PrecisionTone,
  Array<{ note: PrecisionTone; blackKeyId: SecondaryBlackKeyId }>
> = {
  C: [{ note: 'D', blackKeyId: 'C_SHARP_D_FLAT' }],
  D: [
    { note: 'C', blackKeyId: 'C_SHARP_D_FLAT' },
    { note: 'E', blackKeyId: 'D_SHARP_E_FLAT' },
  ],
  E: [{ note: 'D', blackKeyId: 'D_SHARP_E_FLAT' }],
  F: [{ note: 'G', blackKeyId: 'F_SHARP_G_FLAT' }],
  G: [
    { note: 'F', blackKeyId: 'F_SHARP_G_FLAT' },
    { note: 'A', blackKeyId: 'G_SHARP_A_FLAT' },
  ],
  A: [
    { note: 'G', blackKeyId: 'G_SHARP_A_FLAT' },
    { note: 'B', blackKeyId: 'A_SHARP_B_FLAT' },
  ],
  B: [{ note: 'A', blackKeyId: 'A_SHARP_B_FLAT' }],
}

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

const resolveSecondaryBlackKey = (primaryNote: PrecisionTone, scores: PrecisionScores): SecondaryBlackKey => {
  const [selectedCandidate] = secondaryBlackKeyCandidates[primaryNote].slice().sort(
    (left, right) =>
      scores[right.note] - scores[left.note] ||
      (precisionToneOrderIndex.get(left.note) ?? 0) - (precisionToneOrderIndex.get(right.note) ?? 0),
  )
  const definition = secondaryBlackKeyDefinitions[selectedCandidate.blackKeyId]

  return {
    ...definition,
    sourceNote: selectedCandidate.note,
  }
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
  const secondaryBlackKey = resolveSecondaryBlackKey(primaryNote, scores)
  const secondaryNote = secondaryBlackKey.sourceNote
  const hiddenNote = resolveHiddenNote(rankedNotes, deepRankedNotes, primaryNote, secondaryNote)

  return {
    scores,
    deepScores,
    rankedNotes,
    deepRankedNotes,
    primaryNote,
    secondaryNote,
    secondaryBlackKey,
    hiddenNote,
    primaryReport: precisionReports[primaryNote],
    secondaryReport: precisionReports[secondaryNote],
    hiddenReport: precisionReports[hiddenNote],
    answeredCount,
    missingQuestionIds,
    invalidAnswerIds,
  }
}
