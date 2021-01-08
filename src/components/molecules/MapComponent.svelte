<script>
  import MapRenderer from '../atoms/MapRenderer.svelte'

  let height
  let width

  const request = fetch(`${window.location.origin}/api/map`).then(res =>
    res.json()
  )

  function pathClickHandler({ detail: { event, datum } }) {}
</script>

<svelte:window bind:innerHeight={height} bind:innerWidth={width} />

{#await request then data}
  <MapRenderer on:pathClick={pathClickHandler} bind:width bind:height {data} />
{/await}
