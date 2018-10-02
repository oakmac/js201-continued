/* global describe it */

// -----------------------------------------------------------------------------
// Requires
// -----------------------------------------------------------------------------

const fs = require('fs-plus')
const glob = require('glob')
const assert = require('assert')
const esprima = require('esprima')

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const exerciseFiles = glob.sync('exercises/*.js')
const modulesDir = 'exercises-modules/'
const utf8 = 'utf8'
const squigglyLine = '// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n'
const exportsComment = '\n\n\n\n\n' +
  squigglyLine +
  '// Module Exports (automatically generated)\n' +
  squigglyLine

// -----------------------------------------------------------------------------
// Stateful
// -----------------------------------------------------------------------------

let allSyntaxValid = true

// -----------------------------------------------------------------------------
// Module Magic
// -----------------------------------------------------------------------------

// returns an array of the top-level function names from a script
function getTopLevelFunctions (syntaxTree) {
  let fnNames = []
  for (let i = 0; i < syntaxTree.body.length; i++) {
    const itm = syntaxTree.body[i]
    if (itm.type === 'FunctionDeclaration') {
      fnNames.push(itm.id.name)
    }
  }
  return fnNames
}

// example filename --> module filename
function moduleName (f) {
  return f.replace('exercises/', modulesDir)
    .replace('.js', '.module.js')
}

function moduleExportStatement (fnName) {
  return 'module.exports.' + fnName + ' = ' + fnName
}

function createModuleFile (f) {
  const fileContents = fs.readFileSync(f, utf8)
  const syntaxTree = esprima.parseScript(fileContents)
  const topLevelFns = getTopLevelFunctions(syntaxTree)
  const moduleFileContents = fileContents +
    exportsComment +
    topLevelFns.map(moduleExportStatement).join('\n') +
    '\n\n\n'
  const moduleFileName = moduleName(f)
  fs.writeFileSync(moduleFileName, moduleFileContents)
}

function createModuleFiles () {
  if (!fs.existsSync(modulesDir)) {
    fs.mkdirSync(modulesDir)
  }
  exerciseFiles.forEach(createModuleFile)
}

function destroyModuleFiles () {
  fs.removeSync(modulesDir)
}

// -----------------------------------------------------------------------------
// Check JS Syntax
// -----------------------------------------------------------------------------

function checkFileSyntax (f) {
  const fileContents = fs.readFileSync(f, utf8)

  // check for empty files
  if (fileContents === '') {
    it(f + ' is an empty file', function () {
      assert.fail(f + ' should not be empty')
    })
    allSyntaxValid = false
    return
  }

  // try parsing the JS
  let parsed = null
  try {
    parsed = esprima.parseScript(fileContents)
  } catch (e) { }
  if (!parsed) {
    allSyntaxValid = false

    it(f + ' should be valid JavaScript syntax', function () {
      assert.ok(parsed, f + ' has invalid syntax')
    })
  }
}

function checkJSSyntax () {
  exerciseFiles.forEach(checkFileSyntax)
}

// -----------------------------------------------------------------------------
// Util
// -----------------------------------------------------------------------------

function isFn (f) {
  return typeof f === 'function'
}

function getModule (f) {
  let module
  try {
    module = require(f)
  } catch (e) {
    return null
  }

  if (!module) {
    it('Unable to read ' + f, function () {
      assert.fail('Unable to read ' + f)
    })
  }

  return module
}

// -----------------------------------------------------------------------------
// 01 Predicate Functions
// -----------------------------------------------------------------------------

function checkPredicateFunctions () {
  const moduleFileName = '../' + moduleName('exercises/01-predicate-functions.js')
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

// -----------------------------------------------------------------------------
// 02 Strings
// -----------------------------------------------------------------------------

function checkStrings () {
  const moduleFileName = '../' + moduleName('exercises/02-strings.js')
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

// -----------------------------------------------------------------------------
// 03 Fizzbuzz
// -----------------------------------------------------------------------------

function checkFizzbuzz () {
  const moduleFileName = '../' + moduleName('exercises/03-fizzbuzz.js')
  let module = getModule(moduleFileName)

  it('03-fizzbuzz.js should have one function: fizzbuzz', function () {
    assert(isFn(module.fizzbuzz), 'function "fizzbuzz" not found')
  })

  it('"fizzbuzz" function', function () {
    assert.deepStrictEqual(module.fizzbuzz(3), '..fizz', "fizzbuzz(3) should return '..fizz'")
    assert.deepStrictEqual(module.fizzbuzz(15), '..fizz.buzzfizz..fizzbuzz.fizz..fizzbuzz', "fizzbuzz(15) should return '..fizz.buzzfizz..fizzbuzz.fizz..fizzbuzz'")
  })
}

// -----------------------------------------------------------------------------
// 04 Fizzbuzz
// -----------------------------------------------------------------------------

function checkGcd () {
  const moduleFileName = '../' + moduleName('exercises/04-greatest-common-factor.js')
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

// -----------------------------------------------------------------------------
// 05 Number Arrays
// -----------------------------------------------------------------------------

function checkNumberArrays () {
  const moduleFileName = '../' + moduleName('exercises/05-number-arrays.js')
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

// -----------------------------------------------------------------------------
// 06 Cities
// -----------------------------------------------------------------------------

function checkCities () {
  const moduleFileName = '../' + moduleName('exercises/06-cities.js')
  let module = getModule(moduleFileName)

  it('06-cities.js should have two functions: coolCities, cityNames', function () {
    assert(isFn(module.coolCities), 'function "coolCities" not found')
    assert(isFn(module.cityNames), 'function "cityNames" not found')
  })

  it('"coolCities" function', function () {
    assert.deepStrictEqual(module.coolCities([
      { name: 'Los Angeles', temperature: 60.0},
      { name: 'Atlanta', temperature: 52.0 },
      { name: 'Detroit', temperature: 48.0 },
      { name: 'New York', temperature: 80.0 }
    ]), [
      { name: 'Los Angeles', temperature: 60.0},
      { name: 'Atlanta', temperature: 52.0 },
      { name: 'Detroit', temperature: 48.0 }
    ], 'coolCities([\n' +
      "      { name: 'Los Angeles', temperature: 60.0},\n" +
      "      { name: 'Atlanta', temperature: 52.0 },\n" +
      "      { name: 'Detroit', temperature: 48.0 },\n" +
      "      { name: 'New York', temperature: 80.0 }\n" +
      '    ] should return [\n' +
      "      { name: 'Los Angeles', temperature: 60.0},\n" +
      "      { name: 'Atlanta', temperature: 52.0 },\n" +
      "      { name: 'Detroit', temperature: 48.0 }\n" +
      '    ]')
  })

  it('"cityNames" function', function () {
    assert.deepStrictEqual(module.cityNames([
      { name: 'Los Angeles', temperature: 60.0},
      { name: 'Atlanta', temperature: 52.0 },
      { name: 'Detroit', temperature: 48.0 },
      { name: 'New York', temperature: 80.0 }
    ]), [
      'Los Angeles',
      'Atlanta',
      'Detroit',
      'New York'
    ], 'coolCities([\n' +
      "      { name: 'Los Angeles', temperature: 60.0},\n" +
      "      { name: 'Atlanta', temperature: 52.0 },\n" +
      "      { name: 'Detroit', temperature: 48.0 },\n" +
      "      { name: 'New York', temperature: 80.0 }\n" +
      '    ]) should return [\n' +
      "      'Los Angeles',\n" +
      "      'Atlanta',\n" +
      "      'Detroit'\n" +
      "       'New York'\n" +
      '    ]')
  })
}

// -----------------------------------------------------------------------------
// 07 Recognize Employees
// -----------------------------------------------------------------------------

function checkRecognize () {
  const moduleFileName = '../' + moduleName('exercises/07-recognize-employees.js')
  let module = getModule(moduleFileName)

  it('07-recognize-employees.js should have one function: recognizeEmployees', function () {
    assert(isFn(module.recognizeEmployees), 'function "recognizeEmployees" not found')
  })

  it('"recognizeEmployees" function', function () {
    assert.deepStrictEqual(module.recognizeEmployees(['Susan', 'Anthony', 'Bill'], ['Bill']),
      ['Great job, Susan!', 'Great job, Anthony!', 'Outstanding job, Bill!'],
      "recognizeEmployees(['Susan', 'Anthony', 'Bill'], ['Bill'])" +
      " should return ['Great job, Susan!', 'Great job, Anthony!', 'Outstanding job, Bill!']")

    assert.deepStrictEqual(module.recognizeEmployees(['Susan', 'Anthony', 'Bill'], ['Bill', 'Susan']),
      ['Outstanding job, Susan!', 'Great job, Anthony!', 'Outstanding job, Bill!'],
      "recognizeEmployees(['Susan', 'Anthony', 'Bill'], ['Bill', 'Susan'])" +
      " should return ['Outstanding job, Susan!', 'Great job, Anthony!', 'Outstanding job, Bill!']")

    assert.deepStrictEqual(module.recognizeEmployees(['Susan', 'Anthony', 'Bill'], ['Jennifer', 'Dylan']),
      ['Great job, Susan!', 'Great job, Anthony!', 'Great job, Bill!'],
      "recognizeEmployees(['Susan', 'Anthony', 'Bill'], ['Jennifer', 'Dylan'])" +
      " should return ['Great job, Susan!', 'Great job, Anthony!', 'Great job, Bill!']")
  })
}

// -----------------------------------------------------------------------------
// 08 Sorting arrays
// -----------------------------------------------------------------------------

function checkSorting () {
  const moduleFileName = '../' + moduleName('exercises/08-sort-arrays.js')
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

// -----------------------------------------------------------------------------
// 09 call N times
// -----------------------------------------------------------------------------

function checkCallNTimes () {
  const moduleFileName = '../' + moduleName('exercises/09-call-n-times.js')
  let module = getModule(moduleFileName)

  it('09-call-n-times.js should have one function: callNTimes', function () {
    assert(isFn(module.callNTimes), 'function "callNTimes" not found')
  })

  let count1 = 0
  function counter1 () {
    count1 = count1 + 1
  }

  let count2 = 0
  function counter2 () {
    count2 = count2 + 1
  }

  it('"callNTimes" function', function () {
    if (isFn(module.callNTimes)) {
      module.callNTimes(21, counter1)
      module.callNTimes(112, counter2)
    }

    assert.deepStrictEqual(count1, 21, '"callNTimes(21, fn)" should execute "fn" 21 times')
    assert.deepStrictEqual(count2, 112, '"callNTimes(112, fn)" should execute "fn" 112 times')
  })
}

// -----------------------------------------------------------------------------
// Run the tests
// -----------------------------------------------------------------------------

describe('JavaScript Syntax', checkJSSyntax)

// only run the test suite if there were no syntax errors
if (allSyntaxValid) {
  createModuleFiles()
  describe('Predicate Functions', checkPredicateFunctions)
  describe('String Functions', checkStrings)
  describe('Fizzbuzz Function', checkFizzbuzz)
  describe('gcd function', checkGcd)
  describe('Number Array function', checkNumberArrays)
  describe('Cities Functions', checkCities)
  describe('Recognize Employees Functions', checkRecognize)
  describe('Sorting Arrays', checkSorting)
  describe('Call N Times', checkCallNTimes)
  destroyModuleFiles()
}
