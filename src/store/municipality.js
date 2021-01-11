import { readable, derived, writable } from 'svelte/store'
import {
  sortMunicipalitiesAlphabetically,
  sortMunicipalitiesOnProduction,
} from '../utils/sort'
import {
  filterMunicipalityOnEnergyProduction,
  filterMunicipalityOnSearchQuery,
} from '../utils/filter'

export const data = readable(new Promise(() => {}), set => {
  fetch(`${window.location.origin}/api/municipalities`)
    .then(res => res.json())
    .then(data => set(data))
})

export const sort = writable('alphabetical')

export const filter = writable('show all')

export const searchQuery = writable('')

export const filteredData = derived(
  [data, sort, filter, searchQuery],
  ([$data, $sort, $filter, $searchQuery]) => {
    if (!$data.length) return []
    let newData = $data
    switch ($sort) {
      case 'alphabetical':
        newData = [...newData].sort(sortMunicipalitiesAlphabetically)
        break
      case 'production-high':
        newData = [...newData].sort(sortMunicipalitiesOnProduction(true))
        break
      case 'production-low':
        newData = [...newData].sort(sortMunicipalitiesOnProduction(false))
        break
      default:
        break
    }
    switch ($filter) {
      case '0-200':
        newData = [...newData].filter(
          filterMunicipalityOnEnergyProduction(0, 200)
        )
        break
      case '200-400':
        newData = [...newData].filter(
          filterMunicipalityOnEnergyProduction(200, 400)
        )
        break
      case '400-600':
        newData = [...newData].filter(
          filterMunicipalityOnEnergyProduction(400, 600)
        )
        break
      case '600-800':
        newData = [...newData].filter(
          filterMunicipalityOnEnergyProduction(600, 800)
        )
        break
      case '800':
        newData = [...newData].filter(filterMunicipalityOnEnergyProduction(800))
        break
      default:
        break
    }
    if ($searchQuery) {
      newData = [...newData].filter(
        filterMunicipalityOnSearchQuery($searchQuery)
      )
    }
    return newData
  }
)

export const currentHighlighted = writable('')

export const comparingMunicipalities = writable([])

export const recommendedMunicipalities = derived(
  comparingMunicipalities,
  () => {
    return null
  }
)
