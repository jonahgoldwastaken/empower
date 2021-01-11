<script>
  import MunicipalityItem from '../molecules/MunicipalityItem.svelte'
  import { filteredData } from '../../store/municipality'
</script>

<style>
  ul {
    display: block;
    padding: 0;
    margin: 0;
  }
</style>

<h3>{$filteredData.length} results</h3>
<ul>
  {#each $filteredData as municipality (municipality.code)}
    <MunicipalityItem {municipality} />
  {/each}
</ul>
