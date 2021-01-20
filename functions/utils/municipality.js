module.exports = { addLocationToMunicipality }

function addLocationToMunicipality(municipality) {
  const {
    lakeArea,
    seaArea,
    agricultureArea,
    livingArea,
    totalArea,
  } = municipality

  let location

  if (lakeArea && seaArea) {
    if (lakeArea < seaArea) location = 'Meer'
    else location = 'Kust'
  } else if (lakeArea) location = 'Meer'
  else if (seaArea) location = 'Kust'
  else if (agricultureArea && livingArea) {
    if (agricultureArea / livingArea > 0.5) location = 'Platteland'
    else location = 'Stad'
  } else if (agricultureArea) {
    if (agricultureArea / totalArea > 0.5) location = 'Platteland'
  } else if (livingArea) {
    if (livingArea / totalArea > 0.5) location = 'Stad'
  } else location = 'Land'

  return {
    ...municipality,
    location,
  }
}
