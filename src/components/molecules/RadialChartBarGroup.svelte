<script>
  import RadialChartBar from '../atoms/RadialChartBar.svelte'
  import { calculateStart } from '../../utils/radialChart'

  export let data
  export let d
  export let i
  export let arc
  export let keys
</script>

{#each keys as key (key)}
  <RadialChartBar
    end={d[key]}
    start={calculateStart(data[i], keys, key)}
    bind:arc
    {i}
    energyType={key
      .toLowerCase()
      .includes(
        'wind'
      ) ? 'wind' : key.toLowerCase().includes('solar') ? 'solar' : 'biogas'} />
{/each}
