<script>
  import { axisLeft, format, select } from 'd3'

  export let margin
  export let yScale
  let g
  $: axis =
    yScale &&
    axisLeft(yScale)
      .ticks(5)
      .tickFormat((d, i) =>
        i === 0 ? format('.0f')(d) + ' kWh' : format('.0f')(d)
      )
  $: axis && select(g).call(axis)
</script>

<style>
  #y-axis :global(text) {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: var(--step--1);
    text-anchor: end;
    alignment-baseline: top;
  }
</style>

<g transform="translate({margin.left}, 0)" bind:this={g} id="y-axis" />
