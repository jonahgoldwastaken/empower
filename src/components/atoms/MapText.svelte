<script>
  import { scale, path } from '../../store/map'
  export let datum
  export let hover = false
</script>

<style>
  text {
    --zoom: 1;
    font-family: 'Roboto', sans-serif;
    font-size: calc(var(--step--1) / var(--zoom));
    pointer-events: none;
    fill-opacity: 0;
  }

  text.hover {
    fill-opacity: 1;
  }
</style>

<text
  style="--zoom: {$scale}"
  class:hover
  text-anchor="middle"
  alignment-baseline="middle"
  y={$path?.centroid(datum)[1]}
  x={$path?.centroid(datum)[0]}>
  <slot />
</text>
