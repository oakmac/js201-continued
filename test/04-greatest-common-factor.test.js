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
// 04 GCD
// -----------------------------------------------------------------------------
const exerciseFileName = getExerciseFileFromTestFile(__filename)
const moduleFileName = '../' + moduleName(exerciseFileName)

function checkGcd () {
  let module = getModule(moduleFileName)

  it('04-greatest-common-factor.js should have one function: gcd', function () {
    assert(isFn(module.gcd), 'function "gcd" not found')
  })

  it('"gcd" function', function () {
    assert.deepStrictEqual(module.gcd(5, 1), 1, 'gcd(5, 1) should return 1')
    assert.deepStrictEqual(module.gcd(3, 15), 3, 'gcd(3, 15) should return 3')
    assert.deepStrictEqual(module.gcd(50, 20), 10, 'gcd(50, 20) should return 10')
  })
}

createModuleFile(exerciseFileName)
describe('gcd function', checkGcd)
destroyModuleFile(moduleFileName)