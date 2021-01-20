<script>
  import { scaleLinear, scaleBand, max } from 'd3'
  import { comparingMunicipalities } from '../../store/municipality'
  import BarChartBarGroup from '../molecules/BarChartBarGroup.svelte'
  import BarChartBottomAxis from '../atoms/BarChartBottomAxis.svelte'
  import BarChartLeftAxis from '../atoms/BarChartLeftAxis.svelte'
  import GraphSVG from '../atoms/GraphSVG.svelte'

  const margin = {
    top: 30,
    left: 50,
    bottom: 20,
    right: 10,
  }
  let width = 0

  $: data = $comparingMunicipalities
    .reduce((acc, { municipality, windProjects, solarProjects }) => {
      let newAcc = [...acc]
      windProjects.forEach(project => {
        let index = newAcc.findIndex(d => d.name === project.realisatiejaar)
        if (index < 0)
          newAcc.push({
            name: project.realisatiejaar,
            [municipality]: +project.vermogen,
          })
        else if (municipality in newAcc[index])
          newAcc[index] = {
            ...newAcc[index],
            [municipality]: newAcc[index][municipality] + +project.vermogen,
          }
        else
          newAcc[index] = {
            ...newAcc[index],
            [municipality]: +project.vermogen,
          }
      })
      solarProjects.forEach(project => {
        let index = newAcc.findIndex(d => d.name === project.realisatiejaar)
        if (index < 0)
          newAcc.push({
            name: project.realisatiejaar,
            [municipality]: +project.vermogen,
          })
        else if (municipality in newAcc[index])
          newAcc[index] = {
            ...newAcc[index],
            [municipality]: newAcc[index][municipality] + +project.vermogen,
          }
        else
          newAcc[index] = {
            ...newAcc[index],
            [municipality]: +project.vermogen,
          }
      })
      return newAcc
    }, [])
    .sort((a, b) => a.name > b.name)

  $: height = (width / 960) * 540
  $: groupKey = 'name'
  $: keys = $comparingMunicipalities.map(({ municipality }) => municipality)
  $: yScale =
    data.length &&
    scaleLinear()
      .domain([0, max(data, d => max(keys, key => d[key]))])
      .nice()
      .rangeRound([height - margin.bottom, margin.top])
  $: x1Scale =
    data.length &&
    scaleBand()
      .domain(data.map(d => d[groupKey]))
      .range([margin.left, width - margin.right])
      .padding(0.5)
  $: x2Scale =
    x1Scale &&
    x1Scale &&
    scaleBand().domain(keys).rangeRound([0, x1Scale.bandwidth()]).padding(0.25)
</script>

<GraphSVG bind:width bind:height>
  {#each data as datum (datum[groupKey])}
    <BarChartBarGroup
      {datum}
      bind:groupKey
      bind:keys
      bind:x1Scale
      bind:x2Scale
      bind:yScale
    />
  {/each}
  <BarChartBottomAxis {margin} bind:height bind:x1Scale />
  <BarChartLeftAxis {margin} bind:yScale />
</GraphSVG>
