const {
  assert,
  runTestFor,
  isFn,
} = require('./utils')

// -----------------------------------------------------------------------------
// 04 GCD
// -----------------------------------------------------------------------------
function checkGcd (getExerciseModule) {
  it('04-greatest-common-factor.js should have one function: gcd', function () {
    const exerciseModule = getExerciseModule()

    assert(isFn(exerciseModule.gcd), 'function "gcd" not found')
  })

  it('"gcd" function', function () {
    const exerciseModule = getExerciseModule()

    assert.deepStrictEqual(exerciseModule.gcd(5, 1), 1, 'gcd(5, 1) should return 1')
    assert.deepStrictEqual(exerciseModule.gcd(3, 15), 3, 'gcd(3, 15) should return 3')
    assert.deepStrictEqual(exerciseModule.gcd(50, 20), 10, 'gcd(50, 20) should return 10')
  })
}

runTestFor({
  testFilePath: __filename,
  description: 'GCD Function',
  checks: checkGcd,
})