<script>
  import { path as geoPath, interact } from '../../store/map'

  export let datum
  export let level = 0
  export let showColour = false
  export let focused = false
  export let recommended = false
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
    fill-opacity: 0.7;
  }

  path.show-colour.level-1 {
    fill: var(--test-green-1);
  }

  path.show-colour.level-2 {
    fill: var(--test-green-2);
  }

  path.show-colour.level-3 {
    fill: var(--test-green-3);
  }

  path.show-colour.level-4 {
    fill: var(--test-green-4);
  }

  path.show-colour.level-5 {
    fill: var(--test-green-5);
  }

  path.show-colour.recommended {
    fill: var(--blue);
    stroke-width: 2;
  }
</style>

<path
  on:click
  on:mouseover
  on:mouseout
  class:focused
  class:recommended
  class:interact={$interact}
  class:show-colour={showColour}
  class="level-{level}"
  d={$geoPath(datum)}
/>
