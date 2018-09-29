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
// Stateful
// -----------------------------------------------------------------------------

let allSyntaxValid = true

// -----------------------------------------------------------------------------
// Export functions
// -----------------------------------------------------------------------------
module.exports = {
    assert,
    getTopLevelFunctions,
    getExerciseFileFromTestFile,
    moduleName,
    moduleExportStatement,
    createModuleFile,
    createModuleFiles,
    destroyModuleFiles,
    checkFileSyntax,
    checkJSSyntax,
    exerciseFiles,
    isFn,
    getModule,
    destroyModuleFiles,
    destroyModuleFile,
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

function destroyModuleFile (f) {
  fs.removeSync(f)
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
