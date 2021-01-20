<script>
  import { recommendedMunicipalities } from '../../store/municipality'
  import { currentFocus } from '../../store/map'
  import ProductionTile from '../atoms/ProductionTile.svelte'
  import CompareButton from '../atoms/CompareButton.svelte'

  export let municipality

  function clickHandler(e) {
    console.log(e.target)
    if (e.target.type !== 'label' && e.target.type !== 'checkbox')
      currentFocus.set(municipality)
  }
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
    box-shadow: var(--very-light-box-shadow);
    transition: outline 0.2s ease-in-out;
    cursor: pointer;
  }

  li:hover {
    outline: 1px solid var(--orange);
  }

  .recommended {
    outline: 1px solid var(--blue);
  }

  li:not(:last-child) {
    margin-bottom: var(--step--2);
  }

  h4 {
    display: inline-block;
    margin: 0;
    grid-row: 1;
    line-height: 1;
    font-size: var(--step-0);
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
    color: var(--dark-green);
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

<li
  class:recommended={!!$recommendedMunicipalities.find(
    d => d.municipality === municipality.municipality
  )}
  on:click={clickHandler}
>
  <h4>{municipality.municipality}</h4>
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
