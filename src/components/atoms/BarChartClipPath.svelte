<script>
  export let id
  export let x
  export let y
  export let width
  export let height

  $: actualHeight = height + 16
</script>

<clipPath {id}>
  <rect {width} rx="16" height={actualHeight} {x} {y} />
</clipPath>
