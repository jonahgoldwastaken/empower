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
    transition: fill 0.4s ease-in-out, stroke-width 0.4s ease-in-out;
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
  d={$geoPath(datum)} />
