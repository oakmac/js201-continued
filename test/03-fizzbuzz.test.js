const {
  assert,
  runTestFor,
  isFn,
} = require('./utils')

// -----------------------------------------------------------------------------
// 03 Fizzbuzz
// -----------------------------------------------------------------------------
function checkFizzbuzz (getExerciseModule) {
  it('03-fizzbuzz.js should have one function: fizzbuzz', function () {
    const exerciseModule = getExerciseModule()

    assert(isFn(exerciseModule.fizzbuzz), 'function "fizzbuzz" not found')
  })

  it('"fizzbuzz" function', function () {
    const exerciseModule = getExerciseModule()

    assert.deepStrictEqual(exerciseModule.fizzbuzz(3), '..fizz', "fizzbuzz(3) should return '..fizz'")
    assert.deepStrictEqual(exerciseModule.fizzbuzz(15), '..fizz.buzzfizz..fizzbuzz.fizz..fizzbuzz', "fizzbuzz(15) should return '..fizz.buzzfizz..fizzbuzz.fizz..fizzbuzz'")
  })
}

runTestFor({
  testFilePath: __filename,
  description: 'Fizzbuzz Function',
  checks: checkFizzbuzz,
})