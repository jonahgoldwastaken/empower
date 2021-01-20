<script>
  import { path as geoPath, interact } from '../../store/map'

  export let datum
  export let level = 0
  export let showColour = false
  export let focused = false
  export let recommended = false
  export let comparing = false
</script>

<style>
  path {
    stroke: var(--white);
    stroke-width: 1;
    fill: var(--light-grey);
    vector-effect: non-scaling-stroke;
  }

  path.interact {
    cursor: pointer;
  }

  path.interact:hover,
  path.interact:focus,
  path.interact.focused {
    fill-opacity: 0.5;
  }

  path.show-colour.level-1 {
    fill: var(--map-green-1);
  }

  path.show-colour.level-2 {
    fill: var(--map-green-2);
  }

  path.show-colour.level-3 {
    fill: var(--map-green-3);
  }

  path.show-colour.level-4 {
    fill: var(--map-green-4);
  }

  path.show-colour.level-5 {
    fill: var(--map-green-5);
  }

  path.show-colour.recommended {
    fill: var(--blue);
  }

  path.comparing {
    fill: var(--orange) !important;
  }
</style>

<path
  on:click
  on:mouseover
  on:mouseout
  class:focused
  class:recommended
  class:comparing
  class:interact={$interact}
  class:show-colour={showColour}
  class="level-{level}"
  d={$geoPath(datum)}
/>
