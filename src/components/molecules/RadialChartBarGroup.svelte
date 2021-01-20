<script>
  import RadialChartBar from '../atoms/RadialChartBar.svelte'
  import { calculateStart } from '../../utils/radialChart'

  export let data
  export let d
  export let i
  export let arc
  export let keys
  export let intersecting
</script>

{#each keys as key (key)}
  <RadialChartBar
    end={d[key]}
    start={calculateStart(data[i], keys, key)}
    bind:arc
    bind:intersecting
    {i}
    energyType={key.toLowerCase().includes('wind')
      ? 'wind'
      : key.toLowerCase().includes('solar')
      ? 'solar'
      : key.toLowerCase().includes('biogas')
      ? 'biogas'
      : 'unknown'}
  />
{/each}
