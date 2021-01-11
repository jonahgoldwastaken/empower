export { sortMunicipalitiesAlphabetically, sortMunicipalitiesOnProduction }

function sortMunicipalitiesAlphabetically(a, b) {
  return a.municipality > b.municipality
    ? 1
    : b.municipality < a.municipality
    ? -1
    : 0
}

function sortMunicipalitiesOnProduction(highToLow) {
  return (a, b) =>
    highToLow
      ? a.totalEnergyGeneration < b.totalEnergyGeneration
        ? 1
        : a.totalEnergyGeneration > b.totalEnergyGeneration
        ? -1
        : 0
      : a.totalEnergyGeneration > b.totalEnergyGeneration
      ? 1
      : a.totalEnergyGeneration < b.totalEnergyGeneration
      ? -1
      : 0
}
