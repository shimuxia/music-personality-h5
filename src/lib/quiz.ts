import type {
  NoteType,
  QuestionOption,
  ResultProfile,
  ResultProfileMap,
} from '../types/quiz'

const noteOrder: NoteType[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

const createScoreBoard = () =>
  noteOrder.reduce<Record<NoteType, number>>((scores, note) => {
    scores[note] = 0
    return scores
  }, {} as Record<NoteType, number>)

export function resolveQuizResult(
  selectedOptions: QuestionOption[],
  profiles: ResultProfileMap,
): ResultProfile {
  const scores = createScoreBoard()

  selectedOptions.forEach((option) => {
    Object.entries(option.weights).forEach(([note, value]) => {
      if (typeof value === 'number') {
        scores[note as NoteType] += value
      }
    })
  })

  const [winner] = noteOrder.slice().sort((left, right) => {
    const difference = scores[right] - scores[left]
    if (difference !== 0) {
      return difference
    }

    return noteOrder.indexOf(left) - noteOrder.indexOf(right)
  })

  return profiles[winner]
}
