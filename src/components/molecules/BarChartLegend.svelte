<script>
  import LegendStep from '../atoms/LegendStep.svelte'
  import { comparingMunicipalities } from '../../store/municipality'
</script>

<style>
  div {
    border-radius: 0.75rem;
    background: var(--white);
    flex: 0 0 calc(7 * var(--step-0));
  }

  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>

<div>
  <ol>
    {#each $comparingMunicipalities as d, i}
      <LegendStep color={i === 0 ? 'dark-green' : i === 1 ? 'green' : 'blue'}>
        {d.municipality}
      </LegendStep>
    {/each}
  </ol>
</div>
