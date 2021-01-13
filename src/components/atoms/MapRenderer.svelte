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
    filter,
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
    return e => {
      if (e.type === 'mouseover' && !hoverPoint) hoverPoint = d
      else if (e.type === 'mouseout' && hoverPoint) hoverPoint = null
    }
  }

  function generateClasses(
    d,
    filter,
    currentHighlighted,
    hoverPoint,
    recommendedMunicipalities
  ) {
    let classes = ''
    const totalGeneration = findTotalEnergyGeneration(d)
    if ($data.length) {
      if (filter === 'show all') {
        console.log('hoi')
        if (totalGeneration < 200) classes += 'level-1 '
        if (totalGeneration < 400 && totalGeneration >= 200)
          classes += 'level-2 '
        if (totalGeneration < 600 && totalGeneration >= 400)
          classes += 'level-3 '
        if (totalGeneration < 800 && totalGeneration >= 600)
          classes += 'level-4 '
        if (totalGeneration >= 800) classes += 'level-5 '
      } else if (filter === '0-200' && totalGeneration < 200)
        classes += 'level-1 '
      else if (
        filter === '200-400' &&
        totalGeneration < 400 &&
        totalGeneration >= 200
      )
        classes += 'level-2 '
      else if (
        filter === '400-600' &&
        totalGeneration < 600 &&
        totalGeneration >= 400
      )
        classes += 'level-3 '
      else if (
        filter === '600-800' &&
        totalGeneration < 800 &&
        totalGeneration >= 600
      )
        classes += 'level-4 '
      else if (filter === '800' && totalGeneration >= 800) classes += 'level-5 '
      else if (
        currentHighlighted?.municipality === d.properties.Gemeentenaam ||
        hoverPoint === d
      ) {
        if (totalGeneration < 200) classes += 'level-1 '
        else if (totalGeneration < 400) classes += 'level-2 '
        else if (totalGeneration < 600) classes += 'level-3 '
        else if (totalGeneration < 800) classes += 'level-4 '
        else if (totalGeneration >= 800) classes += 'level-5 '
      }
    }
    if (
      recommendedMunicipalities.find(
        item => item.municipality === d.properties.Gemeentenaam
      )
    )
      classes += 'recommended '
    if (currentHighlighted?.municipality === d.properties.Gemeentenaam)
      classes += 'active '

    return classes
  }

  onMount(async () => {
    townships = await json('/townships.geojson')
  })
</script>

<style>
  svg {
    background: var(--grey-blue);
  }

  #map path {
    stroke: var(--white);
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
    cursor: pointer;
    fill: var(--dark-grey);
  }

  :global(#map .level-1) {
    fill: var(--orange) !important;
  }

  :global(#map .level-2) {
    fill: var(--muted-orange) !important;
  }

  :global(#map .level-3) {
    fill: var(--yellow) !important;
  }

  :global(#map .level-4) {
    fill: var(--light-green) !important;
  }

  :global(#map .level-5) {
    fill: var(--green) !important;
  }

  #map path.recommended {
    fill: var(--blue) !important;
    stroke-width: 2;
  }

  #map path:hover,
  #map path.active {
    fill-opacity: 0.7;
  }

  #map text {
    --zoom: 1;
    font-family: 'Roboto', sans-serif;
    font-size: calc(var(--step--1) / var(--zoom));
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
            d={path(d)}
            class={generateClasses(d, $filter, $currentHighlighted, hoverPoint, $recommendedMunicipalities)} />
        {/each}
      </g>
      <g id="map-texts">
        {#each townships.features as d (d.properties.Gemeentenaam)}
          <text
            style="--zoom: {$zoom}"
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
