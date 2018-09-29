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
// 05 Number Arrays
// -----------------------------------------------------------------------------
const exerciseFileName = getExerciseFileFromTestFile(__filename)
const moduleFileName = '../' + moduleName(exerciseFileName)

function checkNumberArrays () {
  let module = getModule(moduleFileName)

  it('05-number-arrays.js should have six functions: max, positives, evens, odds, integers, squareDance', function () {
    assert(isFn(module.max), 'function "max" not found')
    assert(isFn(module.positives), 'function "positives" not found')
    assert(isFn(module.evens), 'function "evens" not found')
    assert(isFn(module.odds), 'function "odds" not found')
    assert(isFn(module.integers), 'function "integers" not found')
    assert(isFn(module.squareDance), 'function "squareDance" not found')
  })

  it('"max" function', function () {
    assert.deepStrictEqual(module.max([1, 2, 3, 4, 5]), 5, 'max([1,2,3,4,5]) should return 5')
    assert.deepStrictEqual(module.max([-1000, 20, 32, 0]), 32, 'max([-1000,20,32,0]) should return 32')
    assert.deepStrictEqual(module.max([]), 0, 'max([]) should return 0')
  })

  it('"positives" function', function () {
    assert.deepStrictEqual(module.positives([-1, -2, -3, 4, 5]), [4, 5], 'positives([-1,-2,-3,4,5]) should return [4,5]')
    assert.deepStrictEqual(module.positives([-1, -2, -3, -4, -5]), [], 'positives([-1,-2,-3,-4,-5]) should return []')
    assert.deepStrictEqual(module.positives([-1, -2, -3, 0, 1000]), [1000], 'positives([-1,-2,-3,0,1000]) should return [1000]')
  })

  it('"evens" function', function () {
    assert.deepStrictEqual(module.evens([1, 2, 3, 4, 5]), [2, 4], 'evens([1,2,3,4,5]) should return [2,4]')
    assert.deepStrictEqual(module.evens([2, 4, 6, 7, 8]), [2, 4, 6, 8], 'evens([2,4,6,7,8]) should return [2,4,6,8]')
    assert.deepStrictEqual(module.evens([-2, -4, -6, -7, -8]), [-2, -4, -6, -8], 'evens([-2,-4,-6,-7,-8]) should return [-2,-4,-6,-8]')
  })

  it('"odds" function', function () {
    assert.deepStrictEqual(module.odds([1, 2, 3, 4, 5]), [1, 3, 5], 'odds([1,2,3,4,5]) should return [1,3,5]')
    assert.deepStrictEqual(module.odds([2, 4, 6, 7, 8]), [7], 'odds([2,4,6,7,8]) should return [7]')
    assert.deepStrictEqual(module.odds([-2, -4, -6, -7, -8]), [-7], 'odds([-2,-4,-6,-7,-8]) should return [-7]')
  })

  it('"integers" function', function () {
    assert.deepStrictEqual(module.integers([3.14, 2.4, 7, 8.1, 2]), [7, 2], 'integers([3.14, 2.4, 7, 8.1, 2]) should return [7, 2]')
    assert.deepStrictEqual(module.integers([3.14, 2.4, -7, 8.1, -2]), [-7, -2], 'integers([3.14, 2.4, -7, 8.1, -2]) should return [-7, -2]')
    assert.deepStrictEqual(module.integers([3.14, 2.4, 8.1, 0]), [0], 'integers([3.14, 2.4, 8.1, 0]) should return [0]')
  })

  it('"squareDance" function', function () {
    assert.deepStrictEqual(module.squareDance([1, 2, 3]), [1, 4, 9], 'squareDance([1,2,3]) should return [1,4,9]')
  })
}

createModuleFile(exerciseFileName)
describe('Number Array function', checkNumberArrays)
destroyModuleFile(moduleFileName)