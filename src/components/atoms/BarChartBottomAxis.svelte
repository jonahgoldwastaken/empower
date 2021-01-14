<script>
  import { axisBottom, select } from 'd3'

  export let margin
  export let xScale
  let g
  $: console.log(xScale)
  $: axis = xScale && axisBottom(xScale)
  $: axis && select(g).call(axis)
</script>

<style>
  #x-axis {
    transform: translateY(calc(100% - var(--margin)));
  }

  #x-axis :global(text) {
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    font-size: var(--step-0);
    text-anchor: middle;
    alignment-baseline: top;
  }
</style>

<g style="--margin: {margin.bottom}px" bind:this={g} id="x-axis" />
