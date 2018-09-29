/* global describe it */

// -----------------------------------------------------------------------------
// Requires
// -----------------------------------------------------------------------------

const path = require('path')
const fs = require('fs-plus')
const glob = require('glob')
const assert = require('assert')
const esprima = require('esprima')

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const modulesDir = 'exercises-modules/'
const exercisesDir = 'exercises/'
const exerciseFiles = glob.sync(exercisesDir + '*.js')
const utf8 = 'utf8'
const squigglyLine = '// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n'
const exportsComment = '\n\n\n\n\n' +
  squigglyLine +
  '// Module Exports (automatically generated)\n' +
  squigglyLine

// -----------------------------------------------------------------------------
// Export functions
// -----------------------------------------------------------------------------
module.exports = {
  assert,
  runTestFor,
  isFn,
}


// -----------------------------------------------------------------------------
// Main test running function for an exercise.
// -----------------------------------------------------------------------------

function runTestFor ({ testFilePath, description, checks }){
  const exerciseFileName = getExerciseFileFromTestFile(testFilePath)
  const moduleFileName = moduleName(exerciseFileName)

  describe(description, function testForExercise() {
    let isParseable
    before(`Before testing ${description}`, function beforeTestForExercise(){
      isParseable = checkFileSyntax(exerciseFileName)
      if (isParseable !== true) {
        this.skip()
      }
      createModuleFile(exerciseFileName)
    })

    after(`After testing ${description}`, function afterTestForExercise(){
      if (isParseable !== true) {
        this.skip()
      }
      destroyModuleFiles()
    })

    describe(`Testing ${description}`, function testExercise(){
      // Need to pass the function for getting the module so that
      // loading the module will be run at test time, as opposed to
      // during test definition.  Especially important since the
      // exercise module file only exists during the suite.
      checks(getModule.bind(this, '../' + moduleFileName))
    })
  })
}


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

// example test file path --> exercises filename
function getExerciseFileFromTestFile(testFilePath) {
    return exercisesDir + path.basename(testFilePath)
        .replace('.test', '')
}

// example filename --> module filename
function moduleName (f) {
  return f.replace(exercisesDir, modulesDir)
    .replace('.js', '.module.js')
}

function moduleExportStatement (fnName) {
  return 'module.exports.' + fnName + ' = ' + fnName
}

function createModuleFile (f) {
  if (!fs.existsSync(modulesDir)) {
    fs.mkdirSync(modulesDir)
  }
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
    assert.fail(f + ' should not be empty')
    return
  }

  // try parsing the JS
  let parsed = null
  let parseError = null
  try {
    parsed = esprima.parseScript(fileContents)
  } catch (e) { 
    parseError = e
  }

  if (!parsed) {
    assert.ok(parsed, f + ' has invalid syntax ' + parseError)
    return
  }

  return true
}

// -----------------------------------------------------------------------------
// Util
// -----------------------------------------------------------------------------

function isFn (f) {
  return typeof f === 'function'
}

function getModule (f) {
  let targetModule
  try {
    targetModule = require(f)
  } catch (e) {
    return null
  }

  if (!targetModule) {
    it('Unable to read ' + f, function () {
      assert.fail('Unable to read ' + f)
    })
  }

  return targetModule
}
