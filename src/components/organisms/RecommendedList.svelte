<script>
  import MunicipalityItem from '../molecules/MunicipalityItem.svelte'

  import { recommendedMunicipalities } from '../../store/municipality'
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
    margin: 0 0 var(--step--2);
  }
</style>

{#if $recommendedMunicipalities.length}
  <section>
    <h3>Recommended</h3>
    <ul>
      {#each $recommendedMunicipalities as municipality (municipality.municipality)}
        <MunicipalityItem {municipality} />
      {/each}
    </ul>
  </section>
{/if}
