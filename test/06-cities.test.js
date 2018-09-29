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
// 06 Cities
// -----------------------------------------------------------------------------
const exerciseFileName = getExerciseFileFromTestFile(__filename)
const moduleFileName = '../' + moduleName(exerciseFileName)

function checkCities () {
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

createModuleFile(exerciseFileName)
describe('Cities Functions', checkCities)
destroyModuleFile(moduleFileName)