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
// 01 Predicate Functions
// -----------------------------------------------------------------------------
const exerciseFileName = getExerciseFileFromTestFile(__filename)
const moduleFileName = '../' + moduleName(exerciseFileName)

function checkPredicateFunctions () {
  let module = getModule(moduleFileName)
  
  it('01-predicate-functions.js should have four functions: isVowel, isEven, isOdd, isCapitalCity', function () {
    assert(isFn(module.isVowel), 'function "isVowel" not found')
    assert(isFn(module.isEven), 'function "isEven" not found')
    assert(isFn(module.isOdd), 'function "isOdd" not found')
    assert(isFn(module.isCapitalCity), 'function "isCapitalCity" not found')
  })
  
  it('"isVowel" function', function () {
    assert.deepStrictEqual(module.isVowel('c'), false, "isVowel('c') should return false")
    assert.deepStrictEqual(module.isVowel('a'), true, "isVowel('a') should return true ")
    assert.deepStrictEqual(module.isVowel(99), false, 'isVowel(99) should return false')
    assert.deepStrictEqual(module.isVowel('A'), true, "isVowel('A') should return true ")
  })
  
  it('"isEven" function', function () {
    assert.deepStrictEqual(module.isEven(2), true, 'isEven(2) should return true')
    assert.deepStrictEqual(module.isEven(-2), true, 'isEven(-2) should return true')
    assert.deepStrictEqual(module.isEven(99), false, 'isEven(99) should return false')
    assert.deepStrictEqual(module.isEven(1000), true, 'isEven(1000) should return true')
    assert.deepStrictEqual(module.isEven('banana'), false, "isEven('banana) should return false")
  })
  
  it('"isOdd" function', function () {
    assert.deepStrictEqual(module.isOdd(3), true, 'isOdd(3) should return true')
    assert.deepStrictEqual(module.isOdd(-3), true, 'isOdd(-3) should return true')
    assert.deepStrictEqual(module.isOdd(100), false, 'isOdd(100) should return false')
    assert.deepStrictEqual(module.isOdd(3.14), false, 'isOdd(3.14) should return false')
  })
  
  it('"isCapitalCity" function', function () {
    assert.deepStrictEqual(module.isCapitalCity('Texas', 'Austin'), true, "isCapitalCity('Texas', 'Austin') should return true")
    assert.deepStrictEqual(module.isCapitalCity('Texas', 'Houston'), false, "isCapitalCity('Texas', 'Houston') should return false")
    assert.deepStrictEqual(module.isCapitalCity('Alaska', 'Juneau'), true, "isCapitalCity('Alaska', 'Juneau') should return false")
    assert.deepStrictEqual(module.isCapitalCity('Strawberry', 'Mango'), false, "isCapitalCity('Strawberry', 'Mango') should return false")
  })
}

createModuleFile(exerciseFileName)
describe('Predicate Functions', checkPredicateFunctions)
destroyModuleFile(moduleFileName)