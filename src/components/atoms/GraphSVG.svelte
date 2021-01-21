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
    transform: translate(var(--x), var(--y));
  }

  p {
    font-size: var(--step-0);
    font-weight: 500;
    width: 100%;
    text-align: center;
    margin: -1em 0 1em;
  }

  @media screen and (min-width: 100rem) {
    div.centered {
      width: 50%;
    }

    p {
      margin-bottom: 0;
    }
  }
</style>

<div class:centered bind:offsetWidth={width}>
  {#if width}
    <svg bind:this={svg} viewBox="0 0 {width} {height}">
      <g style="--x: {width / 2}px; --y: {height / 2}px" class:centered>
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
