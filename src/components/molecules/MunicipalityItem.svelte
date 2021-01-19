<script>
  import ProductionTile from '../atoms/ProductionTile.svelte'
  import CompareButton from '../atoms/CompareButton.svelte'

  export let municipality
</script>

<style>
  li {
    box-sizing: border-box;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: min-content min-content;
    background: var(--white);
    padding: var(--step--1);
    grid-gap: var(--step--2);
    box-shadow: var(--very-light-box-shadow);
  }

  li:not(:last-child) {
    margin-bottom: var(--step--2);
  }

  h3 {
    display: inline-block;
    margin: 0;
    grid-row: 1;
    line-height: 1;
    font-size: var(--step-2);
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    width: calc(100% - 5rem);
  }

  li :global(label) {
    grid-row: 1;
    align-self: start;
    justify-self: end;
  }

  p {
    margin: 0;
    color: var(--text-primary);
    font-size: var(--step--1);
  }

  strong {
    color: var(--orange);
  }

  div {
    align-self: end;
  }

  ol {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>

<li>
  <h3>{municipality.municipality}</h3>
  <CompareButton {municipality} />
  <div>
    <p>Production: <strong>{municipality.totalEnergyGeneration} TJ</strong></p>
    <div>
      <ol>
        {#if municipality.windEnergyGeneration}
          <ProductionTile small type="wind" active />
        {/if}
        {#if municipality.solarEnergyGeneration}
          <ProductionTile small type="solar" active />
        {/if}
        {#if municipality.biogasEnergyGeneration}
          <ProductionTile small type="biogas" active />
        {/if}
      </ol>
    </div>
  </div>
</li>
