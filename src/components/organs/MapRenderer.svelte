<script>
  import MapPart from '../molecules/MapPart.svelte'
  import { comparingMunicipalities } from '../../store/municipality'
  import {
    townships,
    scale,
    translate,
    width,
    height,
    path,
    currentFocus,
    interact,
  } from '../../store/map.js'

  export let page

  currentFocus.subscribe(val => {
    if ($interact && val) {
      const geoTownship = $townships.features.find(
        d => val.municipality === d.properties.Gemeentenaam
      )
      const bounds = $path.bounds(geoTownship)
      const dx = bounds[1][0] - bounds[0][0]
      const dy = bounds[1][1] - bounds[0][1]
      const x = (bounds[0][0] + bounds[1][0]) / 2
      const y = (bounds[0][1] + bounds[1][1]) / 2
      const newScale = Math.max(
        1,
        Math.min(3, 0.9 / Math.max(dx / $width, dy / $height))
      )
      const newTranslate = [
        $width / 2 - newScale * x,
        $height / 2 - newScale * y,
      ]

      scale.set(newScale)

      translate.set({
        x: newTranslate[0],
        y: newTranslate[1],
      })
    }
  })

  $: if (page.includes('compare')) {
    const bounds = $comparingMunicipalities
      .map(d =>
        $path.bounds(
          $townships.features?.find(
            e => e.properties.Gemeentenaam === d.municipality
          )
        )
      )
      .reduce(
        (acc, curr) => [
          [
            acc[0][0] < curr[0][0] ? acc[0][0] : curr[0][0],
            acc[0][1] < curr[0][1] ? acc[0][1] : curr[0][1],
          ],
          [
            acc[1][0] > curr[1][0] ? acc[1][0] : curr[1][0],
            acc[1][1] > curr[1][1] ? acc[1][1] : curr[1][1],
          ],
        ],
        [
          [Infinity, Infinity],
          [-Infinity, -Infinity],
        ]
      )
    const dx = bounds[1][0] - bounds[0][0]
    const dy = bounds[1][1] - bounds[0][1]
    const x = (bounds[0][0] + bounds[1][0]) / 2
    const y = (bounds[0][1] + bounds[1][1]) / 2

    const newScale = Math.max(
      1,
      Math.min(5, 0.9 / Math.max(dx / $width, dy / $height))
    )
    const newTranslate = [$width / 2 - newScale * x, $height / 2 - newScale * y]

    scale.set(newScale)

    translate.set({
      x: newTranslate[0],
      y: newTranslate[1],
    })
  } else if (page === '/' && !$currentFocus) {
    scale.set(1)
    translate.set({ x: 0, y: 0 })
  }
</script>

<svg width={$width} height={$height} preserveAspectRatio="xMinYMin meet">
  <g
    transform="translate({$translate.x}, {$translate.y}) scale({$scale})"
    id="map">
    {#await $townships then townships}
      {#each townships.features as d (d.properties.Gemeentenaam)}
        <MapPart geoTownship={d} />
      {/each}
    {/await}
  </g>
</svg>
