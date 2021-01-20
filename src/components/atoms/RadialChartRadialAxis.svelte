<script>
  import { getOuterRadius, getInnerRadius } from '../../utils/radialChart'
  import { arcPadding, labelPadding } from '../../store/radialChart'

  export let data
  export let groupKey
  export let arcWidth
  export let numArcs
</script>

<style>
  circle {
    fill: none;
    stroke: var(--light-grey);
  }

  text {
    text-anchor: end;
    alignment-baseline: middle;
    font-family: 'Roboto', sans-serif;
    font-size: var(--step--2);
  }
</style>

{#each data as d, i (d[groupKey])}
  <g>
    <circle r={getOuterRadius(i, { numArcs, arcWidth }) + $arcPadding / 2} />
    <text
      x={$labelPadding}
      y={-(
        (getOuterRadius(i, {
          numArcs,
          arcWidth,
        }) +
          getInnerRadius(i, { numArcs, arcWidth })) /
        2
      )}>
      {d[groupKey]}
    </text>
  </g>
{/each}
