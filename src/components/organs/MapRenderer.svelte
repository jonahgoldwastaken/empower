<script>
  import MapPart from '../molecules/MapPart.svelte'
  import {
    townships,
    scale,
    translate,
    width,
    height,
  } from '../../store/map.js'
  let map
</script>

<style>
  svg {
    background: var(--grey-blue);
  }
</style>

<svg width={$width} height={$height} preserveAspectRatio="xMinYMin meet">
  <g
    transform="translate({$translate.x}, {$translate.y}) scale({$scale})"
    bind:this={map}
    id="map">
    {#await $townships then townships}
      {#each townships.features as d (d.properties.Gemeentenaam)}
        <MapPart geoTownship={d} />
      {/each}
    {/await}
  </g>
</svg>
