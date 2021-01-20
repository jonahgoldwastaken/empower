<script>
  export let keyIndex
  export let height
  export let width
  export let x
  export let y
  export let id
  export let future
</script>

<style>
  rect {
    fill: var(--blue);
  }
  .one {
    fill: var(--dark-green);
  }
  .two {
    fill: var(--green);
  }
  .three {
    fill: var(--blue);
  }
  .future {
    fill-opacity: 0.3;
  }
</style>

<rect
  class:future
  clip-path="url(#{id})"
  class:one={keyIndex === 0}
  class:two={keyIndex === 1}
  class:three={keyIndex === 2}
  {x}
  {y}
  {width}
  {height}
/>
