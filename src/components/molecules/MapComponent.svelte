<script>
  import MapRenderer from '../atoms/MapRenderer.svelte'
  import MapTooltip from '../atoms/MapTooltip.svelte'
  import MapLegend from '../atoms/MapLegend.svelte'
  import { data } from '../../store/municipality'

  let height
  let width
  let currentFocus

  function pathClickHandler({ detail: { event, datum } }) {
    if (currentFocus === datum) currentFocus = null
    else currentFocus = datum
  }

  function closeHandler() {
    currentFocus = null
  }
</script>

<style>
  div {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>

<div bind:offsetHeight={height} bind:offsetWidth={width}>
  {#if $data.length}
    <MapRenderer
      on:pathClick={pathClickHandler}
      bind:width
      bind:height
      bind:center={currentFocus}
      data={$data} />
    <MapTooltip
      on:close={closeHandler}
      data={$data.find(d => d.municipality === currentFocus?.properties.Gemeentenaam)} />
    <MapLegend />
  {/if}
</div>
