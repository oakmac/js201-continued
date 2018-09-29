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
// 03 Fizzbuzz
// -----------------------------------------------------------------------------
const exerciseFileName = getExerciseFileFromTestFile(__filename)
const moduleFileName = '../' + moduleName(exerciseFileName)

function checkFizzbuzz () {
  let module = getModule(moduleFileName)

  it('03-fizzbuzz.js should have one function: fizzbuzz', function () {
    assert(isFn(module.fizzbuzz), 'function "fizzbuzz" not found')
  })

  it('"fizzbuzz" function', function () {
    assert.deepStrictEqual(module.fizzbuzz(3), '..fizz', "fizzbuzz(3) should return '..fizz'")
    assert.deepStrictEqual(module.fizzbuzz(15), '..fizz.buzzfizz..fizzbuzz.fizz..fizzbuzz', "fizzbuzz(15) should return '..fizz.buzzfizz..fizzbuzz.fizz..fizzbuzz'")
  })
}

createModuleFile(exerciseFileName)
describe('Fizzbuzz Function', checkFizzbuzz)
destroyModuleFile(moduleFileName)