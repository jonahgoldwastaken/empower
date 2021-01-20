module.exports = { addLocationToMunicipality }

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
