const csvToJson = require('convert-csv-to-json')
const { resolve } = require('path')
const { writeFileSync } = require('fs')
const {
  __,
  assoc,
  when,
  set,
  propSatisfies,
  pipe,
  find,
  propEq,
  mergeRight,
  lensProp,
  filter,
  compose,
  map,
  replace,
  keys,
  values,
  zipObj,
  project,
} = require('ramda')
const { renameKeys } = require('ramda-adjunct')

const keyMap = {
  a_inw: 'population',
  gwb_code_8: 'code',
  gwb_code_10: 'codeExtended',
  a_hh: 'households',
  recs: 'regionKind',
  gm_naam: 'municipality',
  TotaleOppervlakte_1: 'totalArea',
  Woonterrein_7: 'livingArea',
  TotaalAgrarischTerrein_25: 'agricultureArea',
  IJsselmeerMarkermeer_33: 'lakeArea',
  TotaalBuitenwater_42: 'seaArea',
  zon: 'solarEnergyGeneration',
  wind: 'windEnergyGeneration',
  biogas: 'biogasEnergyGeneration',
  totaal: 'totalEnergyGeneration',
  solarProjects: 'solarProjects',
  windProjects: 'windProjects',
}

createMunicipalityJSON()

function createMunicipalityJSON() {
  const coreCSV = csvToJson
    .fieldDelimiter(';')
    .formatValueByType()
    .getJsonFromCsv(resolve(__dirname, 'kerncijfers.csv'))

  const municipalityGeneration = csvToJson
    .fieldDelimiter(';')
    .formatValueByType()
    .getJsonFromCsv(resolve(__dirname, 'gemeenten.csv'))

  const totalEnergyGeneration = csvToJson
    .fieldDelimiter(';')
    .formatValueByType()
    .getJsonFromCsv(resolve(__dirname, 'totalrenewable.csv'))

  const landUseData = csvToJson
    .fieldDelimiter(';')
    .formatValueByType()
    .getJsonFromCsv(resolve(__dirname, 'bodemgebruik.csv'))

  const windProjects = csvToJson
    .fieldDelimiter(';')
    .formatValueByType()
    .getJsonFromCsv(resolve(__dirname, 'windprojecten.csv'))

  const solarProjects = csvToJson
    .fieldDelimiter(';')
    .formatValueByType()
    .getJsonFromCsv(resolve(__dirname, 'zonprojecten.csv'))

  const result = compose(
    map(addLocationToMunicipality),
    map(changeEmptyStringToZero('livingArea')),
    map(changeEmptyStringToZero('agricultureArea')),
    map(changeEmptyStringToZero('seaArea')),
    map(changeEmptyStringToZero('lakeArea')),
    map(changeEmptyStringToZero('windEnergyGeneration')),
    map(renameKeys(keyMap)),
    project(Object.keys(keyMap)),
    map(combineProjectsOnMunicipality('solarProjects', solarProjects)),
    map(combineProjectsOnMunicipality('windProjects', windProjects)),
    map(combineDataSetOnMunicipality(totalEnergyGeneration)),
    map(combineDataSetOnExtendedCode(landUseData)),
    map(combineDataSetOnCode(municipalityGeneration)),
    map(convertStringsToNumbers),
    map(removeQuotesFromStrings),
    filter(filterOnMunicipalities)
  )(coreCSV)

  writeFileSync(resolve(__dirname, 'municipality.json'), JSON.stringify(result))
}

function addLocationToMunicipality(municipality) {
  const { lakeArea, seaArea, population } = municipality

  let location

  if (lakeArea && seaArea) {
    if (lakeArea < seaArea) location = 'Lake'
    else location = 'Coast'
  } else if (lakeArea) location = 'Lake'
  else if (seaArea) location = 'Coast'
  else if (population > 25000) location = 'Urban'
  else location = 'Rural'

  return {
    ...municipality,
    location,
  }
}

function changeEmptyStringToZero(key) {
  return entry => {
    const lens = lensProp(key)
    return when(
      propSatisfies(a => a === '', key, __),
      set(lens, 0)
    )(entry)
  }
}

function combineProjectsOnMunicipality(key, data) {
  return entry => {
    const projects = filter(propEq('gemeente', entry.gm_naam), data)
    return assoc(key, projects, entry)
  }
}

function combineDataSetOnMunicipality(data) {
  return entry =>
    pipe(find(propEq('gemeente', entry.gm_naam)), mergeRight(entry))(data)
}

function combineDataSetOnExtendedCode(data) {
  return entry =>
    pipe(find(propEq('code', entry.gwb_code_10)), mergeRight(entry))(data)
}

function combineDataSetOnCode(data) {
  return entry =>
    pipe(find(propEq('code', entry.gwb_code_8)), mergeRight(entry))(data)
}

function filterOnMunicipalities(entry) {
  return entry['recs'] === 'Gemeente'
}

function removeQuotesFromStrings(entry) {
  return zipObj(
    keys(entry),
    map(
      val =>
        typeof val === 'string' && val.includes('"')
          ? replace('"', '', val)
          : val,
      values(entry)
    )
  )
}

function convertStringsToNumbers(entry) {
  return zipObj(
    keys(entry),
    map(val => (isNaN(Number(val)) ? val : Number(val)), values(entry))
  )
}
