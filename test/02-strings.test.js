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
// 02 Strings
// -----------------------------------------------------------------------------
const exerciseFileName = getExerciseFileFromTestFile(__filename)
const moduleFileName = '../' + moduleName(exerciseFileName)

function checkStrings () {
  let module = getModule(moduleFileName)

  it('02-strings.js should have five functions: reverse, findLongestWord, nicer, capitalizeAll, and split', function () {
    assert(isFn(module.reverse), 'function "reverse" not found')
    assert(isFn(module.findLongestWord), 'function "findLongestWord" not found')
    assert(isFn(module.nicer), 'function "nicer" not found')
    assert(isFn(module.capitalizeAll), 'function "capitalizeAll" not found')
    assert(isFn(module.split), 'function "split" not found')
  })

  it('"reverse" function', function () {
    assert.deepStrictEqual(module.reverse('skoob'), 'books', "reverse('skoob') should return 'books'")
    assert.deepStrictEqual(module.reverse('1234'), '4321', "reverse('1234') should return '4321'")
    assert.deepStrictEqual(module.reverse('blah blah'), 'halb halb', "reverse('blah blah') should return 'halb halb'")
  })

  it('"findLongestWord" function', function () {
    assert.deepStrictEqual(module.findLongestWord('a book full of dogs'), 'book', "findLongestWord('a book full of dogs') should return 'book")
    assert.deepStrictEqual(module.findLongestWord('abrakadabra is the longest word here'),
      'abrakadabra', "findLongestWord('abrakadabra is the longest word here') should return 'abrakadabra'")
    assert.deepStrictEqual(module.findLongestWord('word'), 'word', "findLongestWord('word') should return 'word'")
  })

  it('"nicer" function', function () {
    assert.deepStrictEqual(module.nicer('mom get the heck in here and bring me a darn sandwich.'),
      'mom get the in here and bring me a sandwich.', "nicer('mom get the heck in here and bring me a darn sandwich.') should return 'mom get the in here and bring me a sandwich.'")
    assert.deepStrictEqual(module.nicer('only nice things'), 'only nice things', "module.nicer('only nice things') should return 'only nice things")
    assert.deepStrictEqual(module.nicer('a crappy thing'), 'a thing', "nicer('a crappy thing') should return 'a thing")
  })

  it('"capitalizeAll" function', function () {
    assert.deepStrictEqual(module.capitalizeAll('hello world'), 'Hello World', "capitalizeAll('hello world') should return 'Hello World'")
    assert.deepStrictEqual(module.capitalizeAll('a'), 'A', "capitalizeAll('a') should return 'A'")
  })

  it('"split" function', function () {
    assert.deepStrictEqual(module.split('a-b-c', '-'), ['a', 'b', 'c'], "split('a-b-c', '-') should return['a', 'b', 'c'] ")
    assert.deepStrictEqual(module.split('APPLExxBANANAxxCHERRY', 'xx'), ['APPLE', 'BANANA', 'CHERRY'], "split('APPLExxBANANAxxCHERRY', 'xx') should return ['APPLE', 'BANANA', 'CHERRY']")
    assert.deepStrictEqual(module.split('xyz', 'r'), ['xyz'], "split('xyz', 'r') should return ['xyz']")
  })
}

createModuleFile(exerciseFileName)
describe('String Functions', checkStrings)
destroyModuleFile(moduleFileName)