module.exports = { addLocationToMunicipality }

function addLocationToMunicipality(municipality) {
  const location = municipality.lakeArea
    ? 'Meer'
    : municipality.seaArea
    ? 'Kust'
    : municipality.agricultureArea / municipality.totalArea > 0.5
    ? 'Platteland'
    : 'Land'
  return {
    ...municipality,
    location,
  }
}
