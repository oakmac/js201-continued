const {
  assert,
  runTestFor,
  isFn,
} = require('./utils')

// -----------------------------------------------------------------------------
// 06 Cities
// -----------------------------------------------------------------------------
function checkCities (getExerciseModule) {
  it('06-cities.js should have two functions: coolCities, cityNames', function () {
    const exerciseModule = getExerciseModule()

    assert(isFn(exerciseModule.coolCities), 'function "coolCities" not found')
    assert(isFn(exerciseModule.cityNames), 'function "cityNames" not found')
  })

  it('"coolCities" function', function () {
    const exerciseModule = getExerciseModule()

    assert.deepStrictEqual(exerciseModule.coolCities([
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
    const exerciseModule = getExerciseModule()

    assert.deepStrictEqual(exerciseModule.cityNames([
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

runTestFor({
  testFilePath: __filename,
  description: 'Cities Functions',
  checks: checkCities,
})