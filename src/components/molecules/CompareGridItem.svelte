<script>
  import CompareGridItemHeading from '../atoms/CompareGridItemHeading.svelte'
  export let area = ''
</script>

<style>
  section {
    grid-area: var(--area);
    border-radius: 0.75rem;
    background: var(--white);
    padding: calc(1.5 * var(--step-0));
    display: flex;
    flex-flow: row wrap;
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
    flex-flow: row wrap;
  }

  .facts {
    justify-content: flex-start;
    align-self: start;
  }

  .button {
    background: none;
    justify-content: center;
    align-items: center;
  }

  .heading {
    padding: 0;
    justify-content: flex-start;
    background: 0;
  }

  .heading :global(h1) {
    margin: 0;
  }
</style>

<section
  class:notifications={area === 'notifications'}
  class:map={area === 'map'}
  class:radial-graph={area === 'graph-2'}
  class:facts={area === 'facts'}
  class:button={area === 'button'}
  class:heading={area === 'heading'}
  style="--area: {area}"
>
  {#if $$slots.heading}
    <CompareGridItemHeading><slot name="heading" /></CompareGridItemHeading>
  {/if}
  <slot />
</section>
