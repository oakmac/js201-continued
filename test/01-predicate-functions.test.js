const {
  assert,
  isFn,
  runTestFor,
} = require('./utils')

// -----------------------------------------------------------------------------
// 01 Predicate Functions
// -----------------------------------------------------------------------------

function checkPredicateFunctions (getExerciseModule) {
  it('01-predicate-functions.js should have four functions: isVowel, isEven, isOdd, isCapitalCity', function () {
    const exerciseModule = getExerciseModule()
    
    assert(isFn(exerciseModule.isVowel), 'function "isVowel" not found')
    assert(isFn(exerciseModule.isEven), 'function "isEven" not found')
    assert(isFn(exerciseModule.isOdd), 'function "isOdd" not found')
    assert(isFn(exerciseModule.isCapitalCity), 'function "isCapitalCity" not found')
  })
  
  it('"isVowel" function', function () {
    const exerciseModule = getExerciseModule()

    assert.deepStrictEqual(exerciseModule.isVowel('c'), false, "isVowel('c') should return false")
    assert.deepStrictEqual(exerciseModule.isVowel('a'), true, "isVowel('a') should return true ")
    assert.deepStrictEqual(exerciseModule.isVowel(99), false, 'isVowel(99) should return false')
    assert.deepStrictEqual(exerciseModule.isVowel('A'), true, "isVowel('A') should return true ")
  })
  
  it('"isEven" function', function () {
    const exerciseModule = getExerciseModule()

    assert.deepStrictEqual(exerciseModule.isEven(2), true, 'isEven(2) should return true')
    assert.deepStrictEqual(exerciseModule.isEven(-2), true, 'isEven(-2) should return true')
    assert.deepStrictEqual(exerciseModule.isEven(99), false, 'isEven(99) should return false')
    assert.deepStrictEqual(exerciseModule.isEven(1000), true, 'isEven(1000) should return true')
    assert.deepStrictEqual(exerciseModule.isEven('banana'), false, "isEven('banana) should return false")
  })
  
  it('"isOdd" function', function () {
    const exerciseModule = getExerciseModule()

    assert.deepStrictEqual(exerciseModule.isOdd(3), true, 'isOdd(3) should return true')
    assert.deepStrictEqual(exerciseModule.isOdd(-3), true, 'isOdd(-3) should return true')
    assert.deepStrictEqual(exerciseModule.isOdd(100), false, 'isOdd(100) should return false')
    assert.deepStrictEqual(exerciseModule.isOdd(3.14), false, 'isOdd(3.14) should return false')
  })
  
  it('"isCapitalCity" function', function () {
    const exerciseModule = getExerciseModule()

    assert.deepStrictEqual(exerciseModule.isCapitalCity('Texas', 'Austin'), true, "isCapitalCity('Texas', 'Austin') should return true")
    assert.deepStrictEqual(exerciseModule.isCapitalCity('Texas', 'Houston'), false, "isCapitalCity('Texas', 'Houston') should return false")
    assert.deepStrictEqual(exerciseModule.isCapitalCity('Alaska', 'Juneau'), true, "isCapitalCity('Alaska', 'Juneau') should return false")
    assert.deepStrictEqual(exerciseModule.isCapitalCity('Strawberry', 'Mango'), false, "isCapitalCity('Strawberry', 'Mango') should return false")
  })
}

runTestFor({
  testFilePath: __filename,
  description: 'Predicate Functions',
  checks: checkPredicateFunctions,
})