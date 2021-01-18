<script>
  import FactList from '../molecules/FactList.svelte'
  import { comparingMunicipalities } from '../../store/municipality'
</script>

{#each $comparingMunicipalities as municipality, i (municipality.code)}
  <FactList {i} bind:municipality />
{/each}
