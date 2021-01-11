export {
  filterMunicipalityOnEnergyProduction,
  filterMunicipalityOnSearchQuery,
  filterOnChosenMunicipalities,
  filterMunicipalityOnEnergyType,
}

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
  return municipality =>
    municipality.municipality.toLowerCase().includes(query.toLowerCase())
}

function filterOnChosenMunicipalities(chosen) {
  return municipality =>
    chosen.findIndex(d => d.municipality === municipality.municipality) === -1
}

function filterMunicipalityOnEnergyType(key, percentage) {
  return municipality =>
    municipality[key] > 0
      ? percentage === 1
        ? Math.random() > 1 / 3
        : Math.random() > percentage
      : Math.random() < percentage
}
