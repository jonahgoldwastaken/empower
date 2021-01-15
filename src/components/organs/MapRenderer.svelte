<script>
  import MapPart from '../molecules/MapPart.svelte'
  import { comparingMunicipalities } from '../../store/municipality'
  import {
    townships,
    scale,
    translate,
    width,
    height,
    interact,
  } from '../../store/map.js'
  import { getCenterOfMultipleBoxes } from '../../utils/zoom.js'

  $: if (
    $townships &&
    !$interact &&
    $comparingMunicipalities &&
    $translate.x === 0
  ) {
    const newTranslate = getCenterOfMultipleBoxes(
      $comparingMunicipalities.map(d =>
        document.querySelector(`#${d.municipality}`)
      )
    )
    translate.set({
      x: newTranslate[0],
      y: newTranslate[1],
    })
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
