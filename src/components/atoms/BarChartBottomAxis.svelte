<script>
  import { axisBottom, select } from 'd3'

  export let height
  export let margin
  export let x1Scale
  let g
  $: axis = x1Scale && axisBottom(x1Scale)
  $: axis && select(g).call(axis)
</script>

<style>
  #x-axis :global(text) {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: var(--step--1);
    text-anchor: middle;
    alignment-baseline: top;
  }
</style>

<g
  transform="translate(0, {height - margin.bottom})"
  bind:this={g}
  id="x-axis"
/>
