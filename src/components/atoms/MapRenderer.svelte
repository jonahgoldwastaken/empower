<script>
  import { tweened } from 'svelte/motion'
  import { cubicInOut } from 'svelte/easing'
  import { get } from 'svelte/store'
  import { onMount } from 'svelte'
  import { geoMercator, geoPath, json } from 'd3'
  import {
    data,
    currentHighlighted,
    recommendedMunicipalities,
  } from '../../store/municipality.js'

  export let width
  export let height

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

  $: if ($currentHighlighted) {
    const center = townships.features.find(
      d => d.properties.Gemeentenaam === $currentHighlighted.municipality
    )
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

  function findTotalEnergyGeneration(d) {
    return get(data).find(
      item =>
        item.municipality.toLowerCase() ===
        d.properties.Gemeentenaam.toLowerCase()
    )?.totalEnergyGeneration
  }

  function pathClickHandler(d) {
    return () =>
      currentHighlighted.set(
        $data.find(item => item.municipality === d.properties.Gemeentenaam)
      )
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
    stroke: var(--white);
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
    cursor: pointer;
    fill: var(--dark-grey);
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

  #map path.recommended {
    fill: var(--turqoise);
    stroke-width: 2;
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

  /* #map text.recommended {
    fill: var(--black);
    fill-opacity: 1;
  } */
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
            class:active={$currentHighlighted === d.properties.Gemeentenaam}
            d={path(d)}
            class:level-1={$data.length && findTotalEnergyGeneration(d) < 200}
            class:level-2={$data.length && 400 > findTotalEnergyGeneration(d) && findTotalEnergyGeneration(d) >= 200}
            class:level-3={$data.length && 600 > findTotalEnergyGeneration(d) && findTotalEnergyGeneration(d) >= 400}
            class:level-4={$data.length && 800 > findTotalEnergyGeneration(d) && findTotalEnergyGeneration(d) >= 600}
            class:level-5={$data.length && findTotalEnergyGeneration(d) >= 800}
            class:recommended={$recommendedMunicipalities.find(item => item.municipality === d.properties.Gemeentenaam)} />
        {/each}
      </g>
      <g id="map-texts">
        {#each townships.features as d (d.properties.Gemeentenaam)}
          <text
            class:recommended={$recommendedMunicipalities.find(item => item.municipality === d.properties.Gemeentenaam)}
            class:hover={$currentHighlighted !== d.properties.Gemeentenaam && hoverPoint === d}
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
