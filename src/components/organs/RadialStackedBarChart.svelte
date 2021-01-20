<script>
  // Created with much help of: https://bl.ocks.org/AntonOrlov/6b42d8676943cc933f48a43a7c7e5b6c

  import { scaleLinear, max, arc as d3Arc } from 'd3'
  import RadialChartRadialAxis from '../atoms/RadialChartRadialAxis.svelte'
  import RadialChartAngleAxis from '../atoms/RadialChartAngleAxis.svelte'
  import RadialChartBarGroup from '../molecules/RadialChartBarGroup.svelte'
  import GraphSVG from '../atoms/GraphSVG.svelte'
  import { getInnerRadius, getOuterRadius } from '../../utils/radialChart'
  import { margin, arcMinRadius, arcPadding } from '../../store/radialChart'
  import { comparingMunicipalities } from '../../store/municipality'

  export let divideByHoudeholds = false

  $: data = $comparingMunicipalities
    .map(
      ({
        municipality,
        windEnergyGeneration,
        solarEnergyGeneration,
        biogasEnergyGeneration,
        totalEnergyGeneration,
        households,
      }) => ({
        municipality,
        windEnergyGeneration: divideByHoudeholds
          ? (windEnergyGeneration / households) * 277777.777777778
          : windEnergyGeneration,
        solarEnergyGeneration: divideByHoudeholds
          ? (solarEnergyGeneration / households) * 277777.777777778
          : solarEnergyGeneration,
        biogasEnergyGeneration: divideByHoudeholds
          ? (biogasEnergyGeneration / households) * 277777.777777778
          : biogasEnergyGeneration,
        totalEnergyGeneration: divideByHoudeholds
          ? ((totalEnergyGeneration -
              windEnergyGeneration -
              solarEnergyGeneration -
              biogasEnergyGeneration) /
              households) *
            277777.777777778
          : totalEnergyGeneration -
            windEnergyGeneration -
            solarEnergyGeneration -
            biogasEnergyGeneration,
      })
    )
    .sort(
      (a, b) =>
        a.windEnergyGeneration +
          a.solarEnergyGeneration +
          a.biogasEnergyGeneration +
          a.totalEnergyGeneration <
        b.windEnergyGeneration +
          b.solarEnergyGeneration +
          b.biogasEnergyGeneration +
          b.totalEnergyGeneration
    )

  $: groupKey = data.length && Object.keys(data[0])[0]
  $: keys = data.length && Object.keys(data[0]).slice(1)

  let width = 0
  $: chartRadius = width / 2 - $margin
  $: numArcs = data.length
  $: arcWidth = (chartRadius - $arcMinRadius - numArcs * $arcPadding) / numArcs
  $: scale = scaleLinear()
    .domain([
      0,
      max(data, d => keys.reduce((acc, curr) => acc + d[curr], 0)) * 1.1,
    ])
    .nice()
    .range([0, 2 * Math.PI])
  $: arc = d3Arc()
    .innerRadius((_, i) => getInnerRadius(i, { arcWidth, numArcs }))
    .outerRadius((_, i) => getOuterRadius(i, { arcWidth, numArcs }))
    .startAngle(d => scale(d.start))
    .endAngle(d => scale(d.end))
</script>

<GraphSVG centered bind:width bind:height={width}>
  <RadialChartAngleAxis {divideByHoudeholds} bind:scale bind:chartRadius />
  {#each data as d, i (d[groupKey])}
    <RadialChartBarGroup {data} {d} bind:arc {i} bind:keys />
  {/each}
  <RadialChartRadialAxis {data} {groupKey} bind:arcWidth {numArcs} />
  <slot slot="description">
    {#if divideByHoudeholds}Per household{:else}In total{/if}
  </slot>
</GraphSVG>
