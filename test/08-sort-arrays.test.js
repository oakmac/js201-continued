const {
  assert,
  runTestFor,
  isFn,
} = require('./utils')

// -----------------------------------------------------------------------------
// 08 Sorting arrays
// -----------------------------------------------------------------------------
function checkSorting (getExerciseModule) {
  it('08-sort-arrays.js should have three functions: alphaSort, strLengthSort, and sumSort', function () {
    const exerciseModule = getExerciseModule()

    assert(isFn(exerciseModule.alphaSort), 'function "alphaSort" not found')
    assert(isFn(exerciseModule.strLengthSort), 'function "strLengthSort" not found')
    assert(isFn(exerciseModule.sumSort), 'function "sumSort" not found')
  })

  it('"alphaSort" function', function () {
    const exerciseModule = getExerciseModule()

    assert.deepStrictEqual(exerciseModule.alphaSort(['b', 'a', 'c']),
      ['a', 'b', 'c'],
      "sortingOne(['b', 'a', 'c']) should equal ['a', 'b', 'c']")

    assert.deepStrictEqual(exerciseModule.alphaSort(['wxy', 'wxyz', 'bac', 'cab', 'abc']),
      ['abc', 'bac', 'cab', 'wxy', 'wxyz'],
      "sortingOne(['wxy', 'wxyz', 'bac', 'cab', 'abc']) should equal \"abc\", \"bac\", \"cab\", \"wxy\", \"wxyz\"")
  })

  it('"strLengthSort" function', function () {
    const exerciseModule = getExerciseModule()

    assert.deepStrictEqual(exerciseModule.strLengthSort(['one', 'two', 'three', 'four', 'no', 'more']),
      ['no', 'one', 'two', 'four', 'more', 'three'],
      "sortingOne(['one', 'two', 'three', 'four', 'no', 'more']) should equal ['no', 'one', 'two', 'four', 'more', 'three']")
  })

  it('"sumSort" function', function () {
    const exerciseModule = getExerciseModule()

    var arr = [
      [1, 3, 4],
      [2, 4, 6, 8],
      [3, 6]
    ]

    assert.deepStrictEqual(exerciseModule.sumSort(arr), [
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

runTestFor({
  testFilePath: __filename,
  description: 'Sorting Arrays',
  checks: checkSorting,
})