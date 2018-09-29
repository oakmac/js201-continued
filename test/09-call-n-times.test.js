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
// 09 call N times
// -----------------------------------------------------------------------------
const exerciseFileName = getExerciseFileFromTestFile(__filename)
const moduleFileName = '../' + moduleName(exerciseFileName)

function checkCallNTimes () {
  let module = getModule(moduleFileName)

  it('09-call-n-times.js should have one function: callNTimes', function () {
    assert(isFn(module.callNTimes), 'function "callNTimes" not found')
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
    if (isFn(module.callNTimes)) {
      module.callNTimes(21, counter1)
      module.callNTimes(112, counter2)
    }

    assert.deepStrictEqual(count1, 21, '"callNTimes(21, fn)" should execute "fn" 21 times')
    assert.deepStrictEqual(count2, 112, '"callNTimes(112, fn)" should execute "fn" 112 times')
  })
}

createModuleFile(exerciseFileName)
describe('Call N Times', checkCallNTimes)
destroyModuleFile(moduleFileName)