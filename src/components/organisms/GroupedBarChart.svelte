<script>
  import { scaleLinear, scaleBand, max } from 'd3'
  import BarChartBarGroup from '../molecules/BarChartBarGroup.svelte'
  import BarChartBottomAxis from '../atoms/BarChartBottomAxis.svelte'
  import BarChartLeftAxis from '../atoms/BarChartLeftAxis.svelte'
  import GraphSVG from '../atoms/GraphSVG.svelte'

  const margin = {
    top: 30,
    left: 80,
    bottom: 50,
    right: 30,
  }
  const data = [
    { name: 'hi', test: 20, good: 20, bad: 50 },
    { name: 'bye', test: 92, good: 20, bad: 50 },
  ]
  let width = 0

  $: height = (width / 960) * 540
  $: groupKey = Object.keys(data[0])[0]
  $: keys = Object.keys(data[0]).slice(1)
  $: yScale = scaleLinear()
    .domain([0, max(data, d => max(keys, key => d[key]))])
    .nice()
    .rangeRound([height - margin.bottom, margin.top])
  $: x1Scale = scaleBand()
    .domain(data.map(d => d[groupKey]))
    .range([margin.left, width - margin.right])
    .padding(0.5)
  $: x2Scale =
    x1Scale &&
    scaleBand().domain(keys).rangeRound([0, x1Scale.bandwidth()]).padding(0.25)
</script>

<GraphSVG bind:width>
  <BarChartBottomAxis {margin} bind:height bind:x1Scale />
  <BarChartLeftAxis {margin} bind:yScale />
  {#each data as datum (datum.name)}
    <BarChartBarGroup
      {datum}
      {margin}
      bind:groupKey
      bind:keys
      bind:height
      bind:x1Scale
      bind:x2Scale
      bind:yScale />
  {/each}
</GraphSVG>
