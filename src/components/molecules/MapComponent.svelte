<script>
  import MapRenderer from '../atoms/MapRenderer.svelte'
  import MapTooltip from '../atoms/MapTooltip.svelte'
  import MapLegend from '../atoms/MapLegend.svelte'

  let height
  let width
  let currentFocus
  export let data

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
  {#if data}
    <MapRenderer
      on:pathClick={pathClickHandler}
      bind:width
      bind:height
      bind:center={currentFocus}
      {data} />
    <MapTooltip
      on:close={closeHandler}
      data={data.find(d => d.municipality === currentFocus?.properties.Gemeentenaam)} />
    <MapLegend />
  {/if}
</div>
