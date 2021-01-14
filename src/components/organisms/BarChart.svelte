<script>
  import { select, scaleLinear, scaleBand, axisLeft, max } from 'd3'
  import BarChartBarGroup from '../molecules/BarChartBarGroup.svelte'
  import BarChartBottomAxis from '../atoms/BarChartBottomAxis.svelte'
  import BarChartLeftAxis from '../atoms/BarChartLeftAxis.svelte'

  let width = 0
  let height = 0
  const margin = {
    top: 30,
    left: 50,
    bottom: 50,
    right: 30,
  }
  let svg
  const data = [
    { name: 'hi', value: 20 },
    { name: 'bye', value: 90 },
  ]

  $: yScale = scaleLinear()
    .domain([0, max(data, d => d.value)])
    .range([height - margin.top - margin.bottom, 0])

  $: xScale = scaleBand()
    .domain(data.map(d => d.name))
    .range([margin.left, width - margin.left - margin.right])
    .paddingInner(0.5)
    .paddingOuter(0.5)

  $: if (svg) {
    // const container = select(svg)
    //   .append('g')
    //   .attr('id', 'container')
    //   .attr('transform', 'translate(50% 50%)')
    // container
    //   .append('g')
    //   .attr('id', 'y-axis')
    //   .attr('transform', `translate(${margin.left}, ${margin.top})`)
    //   .call(axisLeft(yScale))
  }
</script>

<style>
  div {
    width: 100%;
    height: 50rem;
  }
</style>

<div bind:offsetWidth={width} bind:offsetHeight={height}>
  <svg bind:this={svg} viewBox="0 0 {width} {height}">
    <g transform="translate(50% 50%)">
      <BarChartBottomAxis {margin} bind:xScale />
      <BarChartLeftAxis {margin} bind:yScale />
      {#each data as datum (datum.name)}
        <BarChartBarGroup
          {datum}
          {margin}
          bind:height
          bind:xScale
          bind:yScale />
      {/each}
    </g>
  </svg>
</div>
