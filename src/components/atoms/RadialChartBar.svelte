<script>
  import { interpolate } from 'd3'
  import { tweened } from 'svelte/motion'
  import { cubicInOut } from 'svelte/easing'

  export let end
  export let start
  export let i
  export let arc
  export let energyType

  const path = tweened(
    {
      start: 0,
      end: 0,
    },
    {
      delay: 1000,
      duration: 750,
      easing: cubicInOut,
      interpolate,
    }
  )

  $: path.set({
    start,
    end: end + start,
  })
</script>

<style>
  path {
    fill: var(--light-grey);
  }

  .biogas {
    fill: var(--green);
  }

  .solar {
    fill: var(--yellow);
  }

  .wind {
    fill: var(--blue);
  }
</style>

<path
  class:biogas={energyType === 'biogas'}
  class:solar={energyType === 'solar'}
  class:wind={energyType === 'wind'}
  d={arc($path, i)}
/>
