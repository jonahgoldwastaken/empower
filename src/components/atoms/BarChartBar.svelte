<script>
  export let height
  export let width
  export let x
  export let y
  export let id
</script>

<style>
  rect {
    fill: var(--blue);
  }
</style>

<rect clip-path="url(#{id})" {x} {y} {width} {height} />
