<script>
  export let svg
  export let width = 0

  $: height = (width / 960) * 540
</script>

<style>
  div {
    width: 100%;
  }
</style>

<div bind:offsetWidth={width}>
  {#if width}
    <svg bind:this={svg} viewBox="0 0 {width} {height}">
      <g transform="translate(50% 50%)">
        <slot />
      </g>
    </svg>
  {/if}
</div>
