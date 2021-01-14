<script>
  export let area = ''
</script>

<style>
  section {
    grid-area: var(--area);
    border-radius: 0.75rem;
    background: var(--white);
    padding: calc(1.5 * var(--step-0));
  }

  .map {
    padding: 0;
    overflow: hidden;
  }

  .notifications {
    padding: 0;
    background: none;
  }
</style>

<section
  class:notifications={area === 'notifications'}
  class:map={area === 'map'}
  style="--area: {area}">
  <slot />
</section>
