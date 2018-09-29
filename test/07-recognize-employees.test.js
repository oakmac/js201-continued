const {
  assert,
  createModuleFile,
  getExerciseFileFromTestFile,
  moduleName,
  getModule,
  destroyModuleFile,
  isFn,
} = require('./utils')

// -----------------------------------------------------------------------------
// 07 Recognize Employees
// -----------------------------------------------------------------------------
const exerciseFileName = getExerciseFileFromTestFile(__filename)
const moduleFileName = '../' + moduleName(exerciseFileName)

function checkRecognize () {
  let module = getModule(moduleFileName)

  it('07-recognize-employees.js should have one function: recognizeEmployees', function () {
    assert(isFn(module.recognizeEmployees), 'function "recognizeEmployees" not found')
  })

  it('"recognizeEmployees" function', function () {
    assert.deepStrictEqual(module.recognizeEmployees(['Susan', 'Anthony', 'Bill'], ['Bill']),
      ['Great job, Susan!', 'Great job, Anthony!', 'Outstanding job, Bill!'],
      "recognizeEmployees(['Susan', 'Anthony', 'Bill'], ['Bill'])" +
      " should return ['Great job, Susan!', 'Great job, Anthony!', 'Outstanding job, Bill!']")

    assert.deepStrictEqual(module.recognizeEmployees(['Susan', 'Anthony', 'Bill'], ['Bill', 'Susan']),
      ['Outstanding job, Susan!', 'Great job, Anthony!', 'Outstanding job, Bill!'],
      "recognizeEmployees(['Susan', 'Anthony', 'Bill'], ['Bill', 'Susan'])" +
      " should return ['Outstanding job, Susan!', 'Great job, Anthony!', 'Outstanding job, Bill!']")

    assert.deepStrictEqual(module.recognizeEmployees(['Susan', 'Anthony', 'Bill'], ['Jennifer', 'Dylan']),
      ['Great job, Susan!', 'Great job, Anthony!', 'Great job, Bill!'],
      "recognizeEmployees(['Susan', 'Anthony', 'Bill'], ['Jennifer', 'Dylan'])" +
      " should return ['Great job, Susan!', 'Great job, Anthony!', 'Great job, Bill!']")
  })
}

createModuleFile(exerciseFileName)
describe('Recognize Employees Functions', checkRecognize)
destroyModuleFile(moduleFileName)