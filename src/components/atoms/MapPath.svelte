<script>
  import { path as geoPath } from '../../store/map'

  export let datum
  export let level
  export let showColour
  export let focused
  export let recommended
</script>

<style>
  path {
    stroke: var(--white);
    stroke-width: 1;
    fill: var(--light-grey);
    cursor: pointer;
    vector-effect: non-scaling-stroke;
  }

  path:hover,
  path:focus,
  path.focused {
    fill-opacity: 0.7;
  }

  path.recommended {
    fill: var(--blue) !important;
    stroke-width: 2;
  }

  path.show-colour.level-1 {
    fill: var(--orange);
  }

  path.show-colour.level-2 {
    fill: var(--muted-orange);
  }

  path.show-colour.level-3 {
    fill: var(--yellow);
  }

  path.show-colour.level-4 {
    fill: var(--light-green);
  }

  path.show-colour.level-5 {
    fill: var(--green);
  }
</style>

<path
  on:click
  on:mouseover
  on:mouseout
  class:focused
  class:recommended
  class:show-colour={showColour}
  class="level-{level}"
  d={$geoPath(datum)} />
