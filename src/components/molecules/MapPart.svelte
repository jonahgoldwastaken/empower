<script>
  import MapPath from '../atoms/MapPath.svelte'
  import MapText from '../atoms/MapText.svelte'
  import {
    data,
    filter,
    recommendedMunicipalities,
    comparingMunicipalities,
  } from '../../store/municipality.js'
  import {
    currentFocus,
    scale,
    translate,
    path,
    width,
    height,
    interact,
  } from '../../store/map.js'
  import { select } from 'd3'

  export let geoTownship = null
  let g
  let hover = false

  $: datum =
    $data.length &&
    $data.find(d => geoTownship?.properties.Gemeentenaam === d.municipality)
  $: active = $currentFocus?.code === datum?.code
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
    : $comparingMunicipalities?.find(d => datum.municipality === d.municipality)
    ? true
    : false
  $: recommended = $recommendedMunicipalities?.find(
    d => d.municipality === datum?.municipality
  )

  function clickHandler() {
    if ($interact) {
      currentFocus.set(datum)
      const bounds = $path.bounds(geoTownship)
      const dx = bounds[1][0] - bounds[0][0]
      const dy = bounds[1][1] - bounds[0][1]
      const x = (bounds[0][0] + bounds[1][0]) / 2
      const y = (bounds[0][1] + bounds[1][1]) / 2
      const newScale = Math.max(
        1,
        Math.min(3, 0.9 / Math.max(dx / $width, dy / $height))
      )
      const newTranslate = [
        $width / 2 - newScale * x,
        $height / 2 - newScale * y,
      ]

      scale.set(newScale)

      translate.set({
        x: newTranslate[0],
        y: newTranslate[1],
      })
    }
  }

  function hoverHandler() {
    console.log($interact)
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
    bind:active
    bind:level
    bind:showColour
    bind:recommended />
  <MapText datum={geoTownship} bind:hover>{datum?.municipality}</MapText>
</g>
