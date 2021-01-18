<script>
  import { radiusToDegrees } from '../../utils/radialChart.js'
  export let scale
  export let chartRadius

  $: ticks = scale.ticks(10).slice(0, -1)
</script>

<style>
  line {
    stroke-width: 1;
    stroke: var(--light-grey);
  }

  text {
    font-family: 'Roboto', sans-serif;
    font-size: var(--step--1);
  }
</style>

{#each ticks as tick, i (tick)}
  <g transform="rotate({radiusToDegrees(scale(tick)) - 90})">
    <line x2={chartRadius} />
    <text
      x={chartRadius + 10}
      transform="rotate({90 - radiusToDegrees(scale(tick))}, {chartRadius + 10}, 0)"
      text-anchor={i === Math.floor(ticks.length) / 2 || tick === 0 ? 'middle' : i < ticks.length / 2 ? 'start' : 'end'}
      alignment-baseline="middle">
      {tick}
    </text>
  </g>
{/each}
