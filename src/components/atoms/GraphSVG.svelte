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

  p {
    font-size: var(--step-0);
    font-weight: 500;
    width: 100%;
    text-align: center;
    margin: 0;
  }

  @media screen and (min-width: 100rem) {
    div.centered {
      width: 50%;
    }
  }
</style>

<div class:centered bind:offsetWidth={width}>
  {#if width}
    <svg bind:this={svg} viewBox="0 0 {width} {height}">
      <g class:centered>
        <slot />
      </g>
    </svg>
  {/if}
  {#if $$slots.description}
    <p>
      <slot name="description" />
    </p>
  {/if}
</div>
