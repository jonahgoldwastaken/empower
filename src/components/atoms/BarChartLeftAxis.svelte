<script>
  import { axisLeft, format, select } from 'd3'

  export let margin
  export let yScale
  let g
  $: axis = yScale && axisLeft(yScale).tickFormat(format('.0f'))
  $: console.log(axis)
  $: axis && select(g).call(axis)
</script>

<style>
  #y-axis :global(text) {
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    font-size: var(--step-0);
    text-anchor: end;
    alignment-baseline: top;
  }
</style>

<g
  transform="translate({margin.left} {margin.top})"
  bind:this={g}
  id="y-axis" />
