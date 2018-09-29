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
// 08 Sorting arrays
// -----------------------------------------------------------------------------
const exerciseFileName = getExerciseFileFromTestFile(__filename)
const moduleFileName = '../' + moduleName(exerciseFileName)

function checkSorting () {
  let module = getModule(moduleFileName)

  it('08-sort-arrays.js should have three functions: alphaSort, strLengthSort, and sumSort', function () {
    assert(isFn(module.alphaSort), 'function "alphaSort" not found')
    assert(isFn(module.strLengthSort), 'function "strLengthSort" not found')
    assert(isFn(module.sumSort), 'function "sumSort" not found')
  })

  it('"alphaSort" function', function () {
    assert.deepStrictEqual(module.alphaSort(['b', 'a', 'c']),
      ['a', 'b', 'c'],
      "sortingOne(['b', 'a', 'c']) should equal ['a', 'b', 'c']")

    assert.deepStrictEqual(module.alphaSort(['wxy', 'wxyz', 'bac', 'cab', 'abc']),
      ['abc', 'bac', 'cab', 'wxy', 'wxyz'],
      "sortingOne(['wxy', 'wxyz', 'bac', 'cab', 'abc']) should equal \"abc\", \"bac\", \"cab\", \"wxy\", \"wxyz\"")
  })

  it('"strLengthSort" function', function () {
    assert.deepStrictEqual(module.strLengthSort(['one', 'two', 'three', 'four', 'no', 'more']),
      ['no', 'one', 'two', 'four', 'more', 'three'],
      "sortingOne(['one', 'two', 'three', 'four', 'no', 'more']) should equal ['no', 'one', 'two', 'four', 'more', 'three']")
  })

  it('"sumSort" function', function () {
    var arr = [
      [1, 3, 4],
      [2, 4, 6, 8],
      [3, 6]
    ]

    assert.deepStrictEqual(module.sumSort(arr), [
      [1, 3, 4],
      [3, 6],
      [2, 4, 6, 8]
    ], 'sortingTwo([\n' +
      '      [1, 3, 4],\n' +
      '      [2, 4, 6, 8],\n' +
      '      [3, 6]\n' +
      '    ]), should equal [\n' +
      '                       [1, 3, 4],\n' +
      '                       [3, 6],\n' +
      '                       [2, 4, 6, 8]\n' +
      '                     ]')
  })
}

createModuleFile(exerciseFileName)
describe('Sorting Arrays', checkSorting)
destroyModuleFile(moduleFileName)