<script>
  import MapPath from '../atoms/MapPath.svelte'
  import MapText from '../atoms/MapText.svelte'
  import {
    data,
    filter,
    recommendedMunicipalities,
    comparingMunicipalities,
  } from '../../store/municipality.js'
  import { currentFocus, interact } from '../../store/map.js'
  import { select } from 'd3'

  export let geoTownship = null
  let g
  let hover = false

  $: datum =
    $data.length &&
    $data.find(d => geoTownship?.properties.Gemeentenaam === d.municipality)
  $: focused = $currentFocus?.code === datum?.code
  $: level =
    datum &&
    (datum.totalEnergyGeneration < 200
      ? 1
      : datum.totalEnergyGeneration < 400 && datum.totalEnergyGeneration >= 200
      ? 2
      : datum.totalEnergyGeneration < 600 && datum.totalEnergyGeneration >= 400
      ? 3
      : datum.totalEnergyGeneration < 800 && datum.totalEnergyGeneration >= 600
      ? 4
      : 5)
  $: showColour = $interact
    ? $filter === 'show all' ||
      ($filter === '0-200' && level === 1) ||
      ($filter === '200-400' && level === 2) ||
      ($filter === '400-600' && level === 3) ||
      ($filter === '600-800' && level === 4) ||
      ($filter === '800' && level === 5)
    : $comparingMunicipalities?.find(
        d => datum?.municipality === d.municipality
      )
    ? true
    : false
  $: recommended = $recommendedMunicipalities?.find(
    d => d.municipality === datum?.municipality
  )

  $: comparing = !!$comparingMunicipalities.find(
    d => d.municipality === geoTownship.properties.Gemeentenaam
  )

  $: !$interact && comparing && select(g).raise()

  function clickHandler() {
    if ($interact) currentFocus.set(datum)
  }

  function hoverHandler() {
    if ($interact) {
      if (!hover) select(g).raise()
      hover = !hover
    }
  }
</script>

<g bind:this={g} id={datum?.municipality}>
  <MapPath
    on:click={clickHandler}
    on:mouseover={hoverHandler}
    on:mouseout={hoverHandler}
    datum={geoTownship}
    bind:focused
    bind:comparing
    bind:level
    bind:showColour
    bind:recommended
  />
  {#if $interact || $comparingMunicipalities.find(d => d.municipality === geoTownship.properties.Gemeentenaam)}
    <MapText
      datum={geoTownship}
      bind:hover
      active={!$interact &&
        $comparingMunicipalities.find(
          d => d.municipality === geoTownship.properties.Gemeentenaam
        )}
    >{datum?.municipality}</MapText
    >
  {/if}
</g>
