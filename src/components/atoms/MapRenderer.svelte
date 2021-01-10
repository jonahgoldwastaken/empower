<script>
  import { tweened } from 'svelte/motion'
  import { cubicInOut } from 'svelte/easing'
  import { onMount, createEventDispatcher } from 'svelte'
  import { geoMercator, select, geoPath, json } from 'd3'

  export let width
  export let height
  export let data = []
  export let center

  let svg
  let map
  let hoverPoint
  let townships

  let translate = tweened(
    {
      x: 0,
      y: 0,
    },
    {
      duration: 750,
      easing: cubicInOut,
    }
  )

  let zoom = tweened(1, {
    duration: 750,
    easing: cubicInOut,
  })

  $: projection = townships && geoMercator().fitSize([width, height], townships)
  $: path = projection && geoPath().projection(projection)

  $: if (center) {
    const bounds = path.bounds(center),
      dx = bounds[1][0] - bounds[0][0],
      dy = bounds[1][1] - bounds[0][1],
      x = (bounds[0][0] + bounds[1][0]) / 2,
      y = (bounds[0][1] + bounds[1][1]) / 2,
      scale = Math.max(1, Math.min(3, 0.9 / Math.max(dx / width, dy / height))),
      newTranslate = [width / 2 - scale * x, height / 2 - scale * y]

    zoom.set(scale)
    translate.set({
      x: newTranslate[0],
      y: newTranslate[1],
    })
  } else {
    translate.set({
      x: 0,
      y: 0,
    })
    zoom.set(1)
  }

  const dispatch = createEventDispatcher()

  function findTotalEnergyGeneration(d) {
    return data.find(
      item =>
        item.municipality.toLowerCase() ===
        d.properties.Gemeentenaam.toLowerCase()
    )?.totalEnergyGeneration
  }

  function pathClickHandler(d) {
    return e =>
      dispatch('pathClick', {
        event: e,
        datum: d,
      })
  }

  function pathHoverHandler(d) {
    return () => (hoverPoint ? (hoverPoint = null) : (hoverPoint = d))
  }

  onMount(async () => {
    townships = await json('/townships.geojson')
  })
</script>

<style>
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

  #map path:hover,
  #map path.active {
    fill-opacity: 0.7;
  }

  #map text {
    font-family: 'Roboto', sans-serif;
    font-size: var(--step--2);
    pointer-events: none;
    fill-opacity: 0;
  }

  #map text.hover {
    fill-opacity: 1;
  }
</style>

<svg bind:this={svg} {width} {height} preserveAspectRatio="xMinYMin meet">
  <g
    transform="translate({$translate.x}, {$translate.y}) scale({$zoom})"
    bind:this={map}
    id="map">
    {#if townships}
      <g id="map-paths">
        {#each townships.features as d (d.properties.Gemeentenaam)}
          <path
            on:click={pathClickHandler(d)}
            on:mouseover={pathHoverHandler(d)}
            on:mouseout={pathHoverHandler(d)}
            class:active={center === d}
            d={path(d)}
            class:level-1={findTotalEnergyGeneration(d) < 200}
            class:level-2={400 > findTotalEnergyGeneration(d) && findTotalEnergyGeneration(d) >= 200}
            class:level-3={600 > findTotalEnergyGeneration(d) && findTotalEnergyGeneration(d) >= 400}
            class:level-4={800 > findTotalEnergyGeneration(d) && findTotalEnergyGeneration(d) >= 600}
            class:level-5={findTotalEnergyGeneration(d) >= 800} />
        {/each}
      </g>
      <g id="map-texts">
        {#each townships.features as d (d.properties.Gemeentenaam)}
          <text
            class:hover={center !== d && hoverPoint === d}
            text-anchor="middle"
            alignment-baseline="middle"
            transform="scale({(1 / $zoom) * 100}% {(1 / $zoom) * 100}%)"
            y={path.centroid(d)[1]}
            x={path.centroid(d)[0]}>
            {d.properties.Gemeentenaam}
          </text>
        {/each}
      </g>
    {/if}
  </g>
</svg>
