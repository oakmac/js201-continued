const {
  assert,
  runTestFor,
  isFn,
} = require('./utils')

// -----------------------------------------------------------------------------
// 09 call N times
// -----------------------------------------------------------------------------
function checkCallNTimes (getExerciseModule) {
  it('09-call-n-times.js should have one function: callNTimes', function () {
    const exerciseModule = getExerciseModule()

    assert(isFn(exerciseModule.callNTimes), 'function "callNTimes" not found')
  })

  let count1 = 0
  function counter1 () {
    count1 = count1 + 1
  }

  let count2 = 0
  function counter2 () {
    count2 = count2 + 1
  }

  it('"callNTimes" function', function () {
    const exerciseModule = getExerciseModule()

    if (isFn(exerciseModule.callNTimes)) {
      exerciseModule.callNTimes(21, counter1)
      exerciseModule.callNTimes(112, counter2)
    }

    assert.deepStrictEqual(count1, 21, '"callNTimes(21, fn)" should execute "fn" 21 times')
    assert.deepStrictEqual(count2, 112, '"callNTimes(112, fn)" should execute "fn" 112 times')
  })
}

runTestFor({
  testFilePath: __filename,
  description: 'Call N Times',
  checks: checkCallNTimes,
})