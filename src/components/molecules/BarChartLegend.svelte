<script>
  import LegendStep from '../atoms/LegendStep.svelte'
  import { comparingMunicipalities } from '../../store/municipality'
</script>

<style>
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>

<ol>
  {#each $comparingMunicipalities as d, i}
    <LegendStep color={i === 0 ? 'dark-green' : i === 1 ? 'green' : 'blue'}>
      {d.municipality}
    </LegendStep>
  {/each}
</ol>
