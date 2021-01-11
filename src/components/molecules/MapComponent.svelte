<script>
  import MapRenderer from '../atoms/MapRenderer.svelte'
  import MapTooltip from '../atoms/MapTooltip.svelte'
  import MapLegend from '../atoms/MapLegend.svelte'

  let height
  let width
</script>

<style>
  div {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>

<div bind:offsetHeight={height} bind:offsetWidth={width}>
  <MapRenderer bind:width bind:height />
  <MapTooltip />
  <MapLegend />
</div>
