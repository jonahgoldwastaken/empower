export { filterMunicipalityOnEnergyProduction, filterMunicipalityOnSearchQuery }

function filterMunicipalityOnEnergyProduction(min, max) {
  return municipality => {
    if (!max) return municipality.totalEnergyGeneration >= min
    return (
      municipality.totalEnergyGeneration >= min &&
      municipality.totalEnergyGeneration < max
    )
  }
}

function filterMunicipalityOnSearchQuery(query) {
  return municipality => municipality.municipality.includes(query)
}
