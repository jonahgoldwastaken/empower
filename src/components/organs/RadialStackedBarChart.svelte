<script>
  // Created with much help of: https://bl.ocks.org/AntonOrlov/6b42d8676943cc933f48a43a7c7e5b6c

  import { scaleLinear, max, arc as d3Calc } from 'd3'
  import RadialChartRadialAxis from '../atoms/RadialChartRadialAxis.svelte'
  import RadialChartAngleAxis from '../atoms/RadialChartAngleAxis.svelte'
  import RadialChartBarGroup from '../molecules/RadialChartBarGroup.svelte'
  import GraphSVG from '../atoms/GraphSVG.svelte'
  import { getInnerRadius, getOuterRadius } from '../../utils/radialChart'
  import { margin, arcMinRadius, arcPadding } from '../../store/radialChart'

  const data = [
    { name: 'Amsterdam', wind: 20, solar: 20, biogas: 50 },
    { name: 'Rotterdam', wind: 92, solar: 20, biogas: 50 },
  ]

  $: groupKey = Object.keys(data[0])[0]
  $: keys = Object.keys(data[0]).slice(1)

  let width = 0
  $: chartRadius = width / 2 - $margin
  $: numArcs = data.length
  $: arcWidth = (chartRadius - $arcMinRadius - numArcs * $arcPadding) / numArcs
  $: scale = scaleLinear()
    .domain([0, max(data, d => keys.reduce((acc, curr) => acc + d[curr], 0))])
    .nice()
    .range([0, 2 * Math.PI])
  $: arc = d3Calc()
    .innerRadius((_, i) => getInnerRadius(i, { arcWidth, numArcs }))
    .outerRadius((_, i) => getOuterRadius(i, { arcWidth, numArcs }))
    .startAngle(d => scale(d.start))
    .endAngle(d => scale(d.end))
</script>

<GraphSVG centered bind:width bind:height={width}>
  <RadialChartAngleAxis bind:scale bind:chartRadius />
  {#each data as d, i (d[groupKey])}
    <RadialChartBarGroup {data} {d} bind:arc {i} bind:keys />
  {/each}
  <RadialChartRadialAxis
    bind:width
    bind:height={width}
    {data}
    {groupKey}
    {arcWidth}
    {numArcs} />
</GraphSVG>
