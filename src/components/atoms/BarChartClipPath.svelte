<script>
  import { tweened } from 'svelte/motion'
  import { quintInOut } from 'svelte/easing'

  export let id
  export let x
  export let y
  export let yScale
  export let width
  export let height
  export let intersecting

  const tweenY = tweened(yScale(0), {
    duration: 750,
    easing: quintInOut,
  })

  $: actualHeight = height + width / 3

  $: intersecting && tweenY.set(isNaN(y) ? yScale(0) : y)
</script>

<clipPath {id}>
  <rect {width} rx={width / 3} height={actualHeight} {x} y={$tweenY} />
</clipPath>
