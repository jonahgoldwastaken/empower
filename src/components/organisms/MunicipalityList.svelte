<script>
  import MunicipalityItem from '../molecules/MunicipalityItem.svelte'
  export let municipalities = []
</script>

<style>
  ul {
    display: block;
    padding: 0;
    margin: 0;
  }
</style>

<ul>
  {#each municipalities as municipality (municipality.code)}
    <MunicipalityItem {municipality} />
  {/each}
</ul>
