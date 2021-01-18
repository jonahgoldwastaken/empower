export { getBBoxes }

function getBBoxes(els) {
  return els.map(d => d.getBBox())
}
