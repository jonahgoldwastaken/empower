<script>
  import BarChartClipPath from '../atoms/BarChartClipPath.svelte'
  import BarChartBar from '../atoms/BarChartBar.svelte'

  export let datum
  export let keys
  export let groupKey
  export let x1Scale
  export let x2Scale
  export let yScale
  export let intersecting

  const currentYear = new Date().getFullYear()
  $: data = keys.map(key => ({ key, value: datum[key] }))
  $: groupX = x1Scale(datum[groupKey])
</script>

<g transform="translate({groupX} 0)">
  {#each data as d (d.key)}
    <BarChartClipPath
      id={(datum.name + d.key).replace(/[^\w]/g, '')}
      x={x2Scale(d.key)}
      y={yScale(d.value)}
      bind:yScale
      bind:intersecting
      width={x2Scale.bandwidth()}
      height={yScale(0) - yScale(d.value)}
    />
    <BarChartBar
      id={(datum.name + d.key).replace(/[^\w]/g, '')}
      future={currentYear < datum[groupKey]}
      keyIndex={keys.indexOf(d.key)}
      x={x2Scale(d.key)}
      y={yScale(d.value)}
      height={yScale(0) - yScale(d.value)}
      width={x2Scale.bandwidth()}
    />
  {/each}
</g>
