<script>
  import { link } from 'svelte-routing'
  import CompareGridItemHeading from '../atoms/CompareGridItemHeading.svelte'
  export let area = ''
</script>

<style>
  section {
    box-sizing: border-box;
    grid-area: var(--area);
    border-radius: 0.75rem;
    background: var(--white);
    padding: var(--step-1);
    display: grid;
    grid-template-rows: min-content 1fr;
    grid-column-gap: var(--step-0);
  }

  .content {
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    grid-column: 1 / span 2;
    grid-row: 2 / span 1;
  }

  .legend {
    grid-column: 2;
    grid-row: 1;
  }

  .map {
    position: relative;
    padding: 0;
    overflow: hidden;
  }

  .map .content {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
  }

  .map a {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    color: var(--text-secondary);
    font-size: var(--step-0);
    opacity: 0;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: opacity 0.1s ease-in-out;
    border-radius: inherit;
  }

  .map a span {
    border: 3px solid var(--text-secondary);
    padding: 0.5em 1em;
  }

  .map:hover a {
    opacity: 1;
    pointer-events: auto;
  }

  .notifications {
    padding: 0;
    background: none;
  }

  .table .content {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  .facts .content {
    display: flex;
    justify-content: center;
  }

  .radial-graph .content {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .cta {
    background: none;
    padding: 0;
    display: flex;
  }

  .heading {
    padding: 0;
    justify-content: flex-start;
    background: 0;
  }

  .heading :global(h1) {
    margin: 0;
  }

  .share {
    background: none;
    padding: 0;
  }

  @media screen and (min-width: 100rem) {
    .facts .content {
      display: block;
    }

    .radial-graph {
      align-self: start;
    }

    .radial-graph .content {
      flex-direction: row;
    }
  }
</style>

<section
  style="--area: {area}"
  class:notifications={area === 'notifications'}
  class:map={area === 'map'}
  class:table={area === 'table'}
  class:radial-graph={area === 'graph-2'}
  class:facts={area === 'facts'}
  class:cta={area === 'cta'}
  class:heading={area === 'heading'}
  class:share={area === 'share'}
>
  {#if $$slots.heading}
    <CompareGridItemHeading><slot name="heading" /></CompareGridItemHeading>
  {/if}
  {#if $$slots.legend}
    <div class="legend">
      <slot name="legend" />
    </div>
  {/if}
  <div class="content">
    <slot />
    {#if area === 'map'}
      <a href="/" use:link><span>Back to map</span></a>
    {/if}
  </div>
</section>
