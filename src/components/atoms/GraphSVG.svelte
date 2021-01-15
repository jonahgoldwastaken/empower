<script>
  export let svg
  export let width = 0
  export let height
  export let centered = false
</script>

<style>
  div {
    width: 100%;
  }

  g.centered {
    transform: translate(50%, 50%);
  }
</style>

<div bind:offsetWidth={width}>
  {#if width}
    <svg bind:this={svg} viewBox="0 0 {width} {height}">
      <g class:centered>
        <slot />
      </g>
    </svg>
  {/if}
</div>
