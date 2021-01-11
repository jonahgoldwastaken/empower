export { sortMunicipalitiesAlphabetically }

function sortMunicipalitiesAlphabetically(a, b) {
  return a.municipality > b.municipality
    ? 1
    : b.municipality < a.municipality
    ? -1
    : 0
}
