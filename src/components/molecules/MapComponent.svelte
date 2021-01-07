<script>
  import { select, zoom } from 'd3'
  import { afterUpdate } from 'svelte'
  import MapRenderer from '../atoms/MapRenderer.svelte'

  let svg
  let height
  let width
  let mapTransform

  const request = fetch(`${window.location.origin}/api/map`).then(res =>
    res.json()
  )

  afterUpdate(() => {
    select(svg).call(
      zoom()
        .extent([
          [0, 0],
          [width, height],
        ])
        .on('zoom', ({ transform }) => (mapTransform = transform))
    )
  })
</script>

<style>
  svg {
    border: 1px solid black;
  }
</style>

<svelte:window bind:innerHeight={height} bind:innerWidth={width} />

{#await request then data}
  <svg bind:this={svg} viewBox="0 0 {width} {height}">
    <MapRenderer bind:transform={mapTransform} bind:width bind:height {data} />
  </svg>
{/await}
