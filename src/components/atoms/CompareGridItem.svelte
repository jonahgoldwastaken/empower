<script>
  export let area = ''
</script>

<style>
  section {
    grid-area: var(--area);
    border-radius: 0.75rem;
    background: var(--white);
    padding: calc(1.5 * var(--step-0));
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .map {
    padding: 0;
    overflow: hidden;
  }

  .notifications {
    padding: 0;
    background: none;
  }

  .radial-graph {
    flex-direction: row;
  }
</style>

<section
  class:notifications={area === 'notifications'}
  class:map={area === 'map'}
  class:radial-graph={area === 'graph-2'}
  style="--area: {area}">
  <slot />
</section>
