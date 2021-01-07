<script>
  import { onMount } from 'svelte'
  import { geoMercator, geoPath, json } from 'd3'

  export let data = []
  export let width
  export let height
  export let transform
  let townships
  $: projection = townships && geoMercator().fitSize([width, height], townships)
  $: path = projection && geoPath().projection(projection)

  function findTotalEnergyGeneration(d) {
    return data.find(
      item =>
        item.municipality.toLowerCase() ===
        d.properties.Gemeentenaam.toLowerCase()
    )?.totalEnergyGeneration
  }

  onMount(async () => {
    townships = await json('/townships.geojson')
  })
</script>

<style global>
  #map path {
    stroke: white;
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
    cursor: pointer;
  }

  #map .level-1 {
    fill: var(--orange);
  }

  #map .level-2 {
    fill: var(--muted-orange);
  }

  #map .level-3 {
    fill: var(--yellow);
  }

  #map .level-4 {
    fill: var(--light-green);
  }

  #map .level-5 {
    fill: var(--dark-green);
  }

  #map path:hover {
    opacity: 0.7;
  }
</style>

<g id="map" {transform} preserveAspectRatio="xMinYMin meet">
  {#if townships}
    {#each townships.features as d (d.properties.Gemeentenaam)}
      <path
        d={path(d)}
        class:level-1={findTotalEnergyGeneration(d) < 200}
        class:level-2={400 > findTotalEnergyGeneration(d) && findTotalEnergyGeneration(d) >= 200}
        class:level-3={600 > findTotalEnergyGeneration(d) && findTotalEnergyGeneration(d) >= 400}
        class:level-4={800 > findTotalEnergyGeneration(d) && findTotalEnergyGeneration(d) >= 600}
        class:level-5={findTotalEnergyGeneration(d) >= 800} />
    {/each}
  {/if}
</g>
