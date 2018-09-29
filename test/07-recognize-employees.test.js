const {
  assert,
  runTestFor,
  isFn,
} = require('./utils')

// -----------------------------------------------------------------------------
// 07 Recognize Employees
// -----------------------------------------------------------------------------
function checkRecognize (getExerciseModule) {
  it('07-recognize-employees.js should have one function: recognizeEmployees', function () {
    const exerciseModule = getExerciseModule()

    assert(isFn(exerciseModule.recognizeEmployees), 'function "recognizeEmployees" not found')
  })

  it('"recognizeEmployees" function', function () {
    const exerciseModule = getExerciseModule()

    assert.deepStrictEqual(exerciseModule.recognizeEmployees(['Susan', 'Anthony', 'Bill'], ['Bill']),
      ['Great job, Susan!', 'Great job, Anthony!', 'Outstanding job, Bill!'],
      "recognizeEmployees(['Susan', 'Anthony', 'Bill'], ['Bill'])" +
      " should return ['Great job, Susan!', 'Great job, Anthony!', 'Outstanding job, Bill!']")

    assert.deepStrictEqual(exerciseModule.recognizeEmployees(['Susan', 'Anthony', 'Bill'], ['Bill', 'Susan']),
      ['Outstanding job, Susan!', 'Great job, Anthony!', 'Outstanding job, Bill!'],
      "recognizeEmployees(['Susan', 'Anthony', 'Bill'], ['Bill', 'Susan'])" +
      " should return ['Outstanding job, Susan!', 'Great job, Anthony!', 'Outstanding job, Bill!']")

    assert.deepStrictEqual(exerciseModule.recognizeEmployees(['Susan', 'Anthony', 'Bill'], ['Jennifer', 'Dylan']),
      ['Great job, Susan!', 'Great job, Anthony!', 'Great job, Bill!'],
      "recognizeEmployees(['Susan', 'Anthony', 'Bill'], ['Jennifer', 'Dylan'])" +
      " should return ['Great job, Susan!', 'Great job, Anthony!', 'Great job, Bill!']")
  })
}

runTestFor({
  testFilePath: __filename,
  description: 'Recognize Employees Function',
  checks: checkRecognize,
})