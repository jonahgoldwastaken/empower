<script>
  import MapRenderer from '../organs/MapRenderer.svelte'
  import MapTooltip from '../atoms/MapTooltip.svelte'
  import MapLegend from '../atoms/MapLegend.svelte'
  import { width, height } from '../../store/map'

  let divHeight = 0
  let divWidth = 0

  $: width.set(divWidth)
  $: height.set(divHeight)
</script>

<style>
  div {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>

<div bind:offsetHeight={divHeight} bind:offsetWidth={divWidth}>
  <MapRenderer />
  <MapTooltip />
  <MapLegend />
</div>
