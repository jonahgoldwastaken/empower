import { get } from 'svelte/store'
import { arcMinRadius, arcPadding } from '../store/radialChart'

export { getInnerRadius, getOuterRadius, radiusToDegrees, calculateStart }

function getOuterRadius(i, { numArcs, arcWidth }) {
  return getInnerRadius(i, { numArcs, arcWidth }) + arcWidth
}

function getInnerRadius(i, { numArcs, arcWidth }) {
  return get(arcMinRadius) + (numArcs - (i + 1)) * (arcWidth + get(arcPadding))
}

function radiusToDegrees(angle) {
  return (angle * 180) / Math.PI
}

function calculateStart(data, keys, key) {
  let i = keys.indexOf(key) - 1
  let currentKey = keys[i]
  let result = 0

  while (i >= 0) {
    result += data[currentKey]
    i--
    currentKey = keys[i]
  }

  return result
}
