export { getCenterOfMultipleBoxes }

function getCenterOfMultipleBoxes(els) {
  return els
    .map(d => d.getBBox())
    .reduce(
      (acc, curr) => {
        console.log(acc, curr)
        return [
          acc[0] + (curr.x + curr.width / 2),
          acc[1] + (curr.y + curr.height / 2),
        ]
      },
      [0, 0]
    )
    .map(n => n / els.length)
}
