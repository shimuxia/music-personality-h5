import fs from 'node:fs/promises'
import path from 'node:path'
import ts from 'typescript'

const rootDir = process.cwd()
const sourcePath = path.join(rootDir, 'src', 'data', 'precisionReports.ts')
const allowedNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
const requiredFields = [
  'note',
  'title',
  'coreLine',
  'visibleSelf',
  'hiddenSelf',
  'relationshipPattern',
  'stressPattern',
  'blindSpot',
  'practice',
  'growthReminder',
  'publicShareLine',
  'privateHitLine',
  'summary',
]
const highRiskFExpressions = ['反应慢', '反应确实比别人慢', '迟钝']

const source = await fs.readFile(sourcePath, 'utf8')
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
  },
  fileName: sourcePath,
})

const moduleUrl = `data:text/javascript;base64,${Buffer.from(transpiled.outputText).toString('base64')}`
const { precisionReports } = await import(moduleUrl)

const errors = []

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

if (!isPlainObject(precisionReports)) {
  fail('precisionReports must be an object')
} else {
  const reportNotes = Object.keys(precisionReports)
  const invalidNotes = reportNotes.filter((note) => !allowedNotes.includes(note))
  const missingNotes = allowedNotes.filter((note) => !reportNotes.includes(note))

  if (reportNotes.length !== allowedNotes.length) {
    fail(`Expected ${allowedNotes.length} reports, got ${reportNotes.length}`)
  }

  invalidNotes.forEach((note) => fail(`precisionReports contains invalid note "${note}"`))
  missingNotes.forEach((note) => fail(`precisionReports is missing note "${note}"`))

  console.log('Precision report validation summary')
  console.log(`- Reports: ${reportNotes.length}`)
  console.log('- Field length overview:')

  for (const note of allowedNotes) {
    const report = precisionReports[note]
    const label = `precisionReports.${note}`

    if (!isPlainObject(report)) {
      fail(`${label} must be an object`)
      continue
    }

    const reportFields = Object.keys(report)
    const unexpectedFields = reportFields.filter((field) => !requiredFields.includes(field))
    const missingFields = requiredFields.filter((field) => !reportFields.includes(field))

    unexpectedFields.forEach((field) => fail(`${label}.${field} is not an allowed field`))
    missingFields.forEach((field) => fail(`${label}.${field} is missing`))

    if (report.note !== note) {
      fail(`${label}.note must be "${note}"`)
    }

    requiredFields.forEach((field) => checkString(report[field], `${label}.${field}`))

    if (!report.publicShareLine?.trim()) {
      fail(`${label}.publicShareLine must not be empty`)
    }

    if (!report.privateHitLine?.trim()) {
      fail(`${label}.privateHitLine must not be empty`)
    }

    if (!report.summary?.trim()) {
      fail(`${label}.summary must not be empty`)
    }

    const lengthParts = requiredFields
      .filter((field) => field !== 'note')
      .map((field) => `${field}:${Array.from(report[field] ?? '').length}`)
      .join(', ')

    console.log(`  ${note}: ${lengthParts}`)
  }

  const fReportText = requiredFields
    .map((field) => precisionReports.F?.[field])
    .filter((value) => typeof value === 'string')
    .join('\n')

  highRiskFExpressions.forEach((expression) => {
    if (fReportText.includes(expression)) {
      fail(`F report contains high-risk expression "${expression}"`)
    }
  })

  walkForEmptyStrings(precisionReports, 'precisionReports')
}

if (errors.length > 0) {
  console.error('\nValidation failed:')
  errors.forEach((error) => console.error(`- ${error}`))
  process.exitCode = 1
} else {
  console.log('\nValidation passed.')
}
