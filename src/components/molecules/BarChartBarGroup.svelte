<script>
  import BarChartClipPath from '../atoms/BarChartClipPath.svelte'
  import BarChartBar from '../atoms/BarChartBar.svelte'

  export let datum
  export let height
  export let xScale
  export let yScale
  export let margin
  $: x = xScale(datum.name)
  $: y = yScale(datum.value) + margin.top
  $: barWidth = xScale.bandwidth()
  $: barHeight = height - yScale(datum.value) - margin.top - margin.bottom
</script>

<g>
  <BarChartClipPath
    id={datum.name}
    bind:x
    bind:y
    bind:width={barWidth}
    bind:height={barHeight} />
  <BarChartBar
    id={datum.name}
    bind:x
    bind:y
    bind:width={barWidth}
    bind:height={barHeight} />
</g>
