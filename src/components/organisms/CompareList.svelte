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
    background: var(--dark-grey);
    padding: var(--step-2);
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
    align-items: center;
  }
</style>

<section>
  <header>
    <h3>Compare queue: {$comparingMunicipalities.length} / 5</h3>
    <Button on:click={clearQueueHandler}>Clear queue</Button>
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
    {#if $comparingMunicipalities.length === 2}
      <MunicipalityPlaceholder>
        Add up to 5 municipalities if you want
      </MunicipalityPlaceholder>
    {/if}
  </ul>
</section>
