import fs from 'node:fs/promises'
import path from 'node:path'
import ts from 'typescript'

const rootDir = process.cwd()
const sourcePath = path.join(rootDir, 'src', 'data', 'precisionQuestions.ts')
const allowedTones = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
const expectedDimensionCount = 6
const expectedQuestionCount = 36
const expectedQuestionsPerDimension = 6
const expectedOptionsPerQuestion = 4

const source = await fs.readFile(sourcePath, 'utf8')
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
  },
  fileName: sourcePath,
})

const moduleUrl = `data:text/javascript;base64,${Buffer.from(transpiled.outputText).toString('base64')}`
const { precisionQuestions } = await import(moduleUrl)

const errors = []
const coverage = Object.fromEntries(allowedTones.map((tone) => [tone, 0]))

const fail = (message) => {
  errors.push(message)
}

const isPlainObject = (value) =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const checkString = (value, pathLabel) => {
  if (typeof value !== 'string') {
    fail(`${pathLabel} must be a string`)
    return
  }

  if (value.trim() === '') {
    fail(`${pathLabel} must not be empty`)
  }
}

const walkForEmptyStrings = (value, pathLabel) => {
  if (typeof value === 'string') {
    if (value.trim() === '') {
      fail(`${pathLabel} contains an empty string`)
    }
    return
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => walkForEmptyStrings(item, `${pathLabel}[${index}]`))
    return
  }

  if (isPlainObject(value)) {
    Object.entries(value).forEach(([key, item]) => walkForEmptyStrings(item, `${pathLabel}.${key}`))
  }
}

if (!Array.isArray(precisionQuestions)) {
  fail('precisionQuestions must be an array')
} else {
  if (precisionQuestions.length !== expectedQuestionCount) {
    fail(`Expected ${expectedQuestionCount} questions, got ${precisionQuestions.length}`)
  }

  const dimensionIds = new Set()
  const dimensionCounts = new Map()
  const ids = new Set()
  const needsReviewIds = []

  precisionQuestions.forEach((question, questionIndex) => {
    const label = question?.id ?? `question[${questionIndex}]`

    if (!isPlainObject(question)) {
      fail(`${label} must be an object`)
      return
    }

    checkString(question.id, `${label}.id`)
    checkString(question.dimensionName, `${label}.dimensionName`)
    checkString(question.question, `${label}.question`)
    checkString(question.scene, `${label}.scene`)
    checkString(question.mainDistinction, `${label}.mainDistinction`)
    checkString(question.riskNote, `${label}.riskNote`)

    if (ids.has(question.id)) {
      fail(`${label}.id is duplicated`)
    }
    ids.add(question.id)

    if (typeof question.dimensionId !== 'number') {
      fail(`${label}.dimensionId must be a number`)
    } else {
      dimensionIds.add(question.dimensionId)
      dimensionCounts.set(question.dimensionId, (dimensionCounts.get(question.dimensionId) ?? 0) + 1)
    }

    if (!['normal', 'deep'].includes(question.type)) {
      fail(`${label}.type must be "normal" or "deep"`)
    }

    if (typeof question.needsReview !== 'boolean') {
      fail(`${label}.needsReview must be a boolean`)
    } else if (question.needsReview) {
      needsReviewIds.push(question.id)
    }

    if (!Array.isArray(question.options)) {
      fail(`${label}.options must be an array`)
    } else if (question.options.length !== expectedOptionsPerQuestion) {
      fail(`${label} must have ${expectedOptionsPerQuestion} options, got ${question.options.length}`)
    }

    question.options?.forEach((option, optionIndex) => {
      const optionLabel = `${label}.options[${optionIndex}]`

      if (!isPlainObject(option)) {
        fail(`${optionLabel} must be an object`)
        return
      }

      if (!['A', 'B', 'C', 'D'].includes(option.id)) {
        fail(`${optionLabel}.id must be A, B, C, or D`)
      }

      checkString(option.text, `${optionLabel}.text`)

      if (!isPlainObject(option.scoreMap)) {
        fail(`${optionLabel}.scoreMap must be an object`)
        return
      }

      const scoreEntries = Object.entries(option.scoreMap)
      if (scoreEntries.length === 0) {
        fail(`${optionLabel}.scoreMap must not be empty`)
      }

      scoreEntries.forEach(([tone, score]) => {
        if (!allowedTones.includes(tone)) {
          fail(`${optionLabel}.scoreMap uses invalid tone "${tone}"`)
        }

        if (typeof score !== 'number' || !Number.isFinite(score) || score <= 0) {
          fail(`${optionLabel}.scoreMap.${tone} must be a positive number`)
        }

        if (allowedTones.includes(tone) && typeof score === 'number') {
          coverage[tone] += score
        }
      })
    })
  })

  if (dimensionIds.size !== expectedDimensionCount) {
    fail(`Expected ${expectedDimensionCount} dimensions, got ${dimensionIds.size}`)
  }

  for (const dimensionId of dimensionIds) {
    const count = dimensionCounts.get(dimensionId) ?? 0
    if (count !== expectedQuestionsPerDimension) {
      fail(`Dimension ${dimensionId} must have ${expectedQuestionsPerDimension} questions, got ${count}`)
    }
  }

  if (needsReviewIds.length < 4) {
    fail(`Expected at least 4 needsReview questions, got ${needsReviewIds.length}`)
  }

  walkForEmptyStrings(precisionQuestions, 'precisionQuestions')

  console.log('Precision question validation summary')
  console.log(`- Questions: ${precisionQuestions.length}`)
  console.log(`- Dimensions: ${dimensionIds.size}`)
  console.log(`- needsReview: ${needsReviewIds.join(', ')}`)
  console.log('- Tone coverage:')
  for (const tone of allowedTones) {
    console.log(`  ${tone}: ${coverage[tone]}`)
  }
}

if (errors.length > 0) {
  console.error('\nValidation failed:')
  errors.forEach((error) => console.error(`- ${error}`))
  process.exitCode = 1
} else {
  console.log('\nValidation passed.')
}
