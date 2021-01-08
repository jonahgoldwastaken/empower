<script>
  import MapRenderer from '../atoms/MapRenderer.svelte'
  import MapTooltip from '../atoms/MapTooltip.svelte'
  import MapLegend from '../atoms/MapLegend.svelte'

  let height
  let width
  let currentFocus

  const request = fetch(`${window.location.origin}/api/map`).then(res =>
    res.json()
  )

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
    height: 100vh;
    position: relative;
  }
</style>

<div bind:offsetHeight={height} bind:offsetWidth={width}>
  {#await request then data}
    <MapRenderer
      on:pathClick={pathClickHandler}
      bind:width
      bind:height
      bind:center={currentFocus}
      {data} />
    <MapTooltip on:close={closeHandler} bind:data={currentFocus} />
    <MapLegend />
  {/await}
</div>
