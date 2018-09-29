const {
  assert,
  runTestFor,
  isFn,
} = require('./utils')

// -----------------------------------------------------------------------------
// 02 Strings
// -----------------------------------------------------------------------------
function checkStrings (getExerciseModule) {
  it('02-strings.js should have five functions: reverse, findLongestWord, nicer, capitalizeAll, and split', function () {
    const exerciseModule = getExerciseModule()

    assert(isFn(exerciseModule.reverse), 'function "reverse" not found')
    assert(isFn(exerciseModule.findLongestWord), 'function "findLongestWord" not found')
    assert(isFn(exerciseModule.nicer), 'function "nicer" not found')
    assert(isFn(exerciseModule.capitalizeAll), 'function "capitalizeAll" not found')
    assert(isFn(exerciseModule.split), 'function "split" not found')
  })

  it('"reverse" function', function () {
    const exerciseModule = getExerciseModule()

    assert.deepStrictEqual(exerciseModule.reverse('skoob'), 'books', "reverse('skoob') should return 'books'")
    assert.deepStrictEqual(exerciseModule.reverse('1234'), '4321', "reverse('1234') should return '4321'")
    assert.deepStrictEqual(exerciseModule.reverse('blah blah'), 'halb halb', "reverse('blah blah') should return 'halb halb'")
  })

  it('"findLongestWord" function', function () {
    const exerciseModule = getExerciseModule()

    assert.deepStrictEqual(exerciseModule.findLongestWord('a book full of dogs'), 'book', "findLongestWord('a book full of dogs') should return 'book")
    assert.deepStrictEqual(exerciseModule.findLongestWord('abrakadabra is the longest word here'),
      'abrakadabra', "findLongestWord('abrakadabra is the longest word here') should return 'abrakadabra'")
    assert.deepStrictEqual(exerciseModule.findLongestWord('word'), 'word', "findLongestWord('word') should return 'word'")
  })

  it('"nicer" function', function () {
    const exerciseModule = getExerciseModule()

    assert.deepStrictEqual(exerciseModule.nicer('mom get the heck in here and bring me a darn sandwich.'),
      'mom get the in here and bring me a sandwich.', "nicer('mom get the heck in here and bring me a darn sandwich.') should return 'mom get the in here and bring me a sandwich.'")
    assert.deepStrictEqual(exerciseModule.nicer('only nice things'), 'only nice things', "nicer('only nice things') should return 'only nice things")
    assert.deepStrictEqual(exerciseModule.nicer('a crappy thing'), 'a thing', "nicer('a crappy thing') should return 'a thing")
  })

  it('"capitalizeAll" function', function () {
    const exerciseModule = getExerciseModule()

    assert.deepStrictEqual(exerciseModule.capitalizeAll('hello world'), 'Hello World', "capitalizeAll('hello world') should return 'Hello World'")
    assert.deepStrictEqual(exerciseModule.capitalizeAll('a'), 'A', "capitalizeAll('a') should return 'A'")
  })

  it('"split" function', function () {
    const exerciseModule = getExerciseModule()

    assert.deepStrictEqual(exerciseModule.split('a-b-c', '-'), ['a', 'b', 'c'], "split('a-b-c', '-') should return['a', 'b', 'c'] ")
    assert.deepStrictEqual(exerciseModule.split('APPLExxBANANAxxCHERRY', 'xx'), ['APPLE', 'BANANA', 'CHERRY'], "split('APPLExxBANANAxxCHERRY', 'xx') should return ['APPLE', 'BANANA', 'CHERRY']")
    assert.deepStrictEqual(exerciseModule.split('xyz', 'r'), ['xyz'], "split('xyz', 'r') should return ['xyz']")
  })
}

runTestFor({
  testFilePath: __filename,
  description: 'String Functions',
  checks: checkStrings,
})