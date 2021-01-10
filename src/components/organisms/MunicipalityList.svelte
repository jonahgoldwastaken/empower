<script>
  import MunicipalityItem from '../molecules/MunicipalityItem.svelte'
  export let municipalities = []
</script>

<style>
  ul {
    padding: 0;
    margin: 0;
    display: grid;
    grid-gap: var(--step-2);
  }
</style>

<ul>
  {#each municipalities as municipality (municipality.code)}
    <MunicipalityItem {municipality} />
  {/each}
</ul>
