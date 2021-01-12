<script>
  import Button from '../atoms/Button.svelte'
  import MunicipalityItem from '../molecules/MunicipalityItem.svelte'
  import MunicipalityPlaceholder from '../atoms/MunicipalityPlaceholder.svelte'
  import { comparingMunicipalities } from '../../store/municipality'

  function clearQueueHandler() {
    comparingMunicipalities.set([])
  }
</script>

<style>
  section {
    background: var(--grey-blue);
    padding: calc(var(--step-2) / 2);
    border-radius: 0.75rem;
    margin: 0 0 var(--step-4);
  }

  ul {
    display: block;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  h3 {
    margin: 0;
  }

  header {
    margin-bottom: var(--step--2);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
</style>

<section>
  <header>
    <h3>Compare queue: {$comparingMunicipalities.length} / 3</h3>
    {#if $comparingMunicipalities.length}
      <Button on:click={clearQueueHandler}>Clear</Button>
    {/if}
  </header>
  <ul>
    {#each $comparingMunicipalities as municipality (municipality.municipality)}
      <MunicipalityItem {municipality} />
    {/each}
    {#if $comparingMunicipalities.length === 0}
      <MunicipalityPlaceholder>
        Add your own municipality
      </MunicipalityPlaceholder>
    {/if}
    {#if $comparingMunicipalities.length === 1}
      <MunicipalityPlaceholder>
        Add a municipality to start comparing
      </MunicipalityPlaceholder>
    {/if}
  </ul>
</section>
