<script>
  import { onMount } from 'svelte'
  import { comparingMunicipalities } from '../store/municipality'
  import CompareDashboard from '../components/organisms/CompareDashboard.svelte'
  import FactListGroup from '../components/organs/FactListGroup.svelte'
  import CompareGridItem from '../components/molecules/CompareGridItem.svelte'
  import NotificationList from '../components/molecules/NotificationList.svelte'
  import MapComponent from '../components/organisms/MapComponent.svelte'
  import Table from '../components/organs/Table.svelte'
  import GroupedBarChart from '../components/organs/GroupedBarChart.svelte'
  import BarChartLegend from '../components/molecules/BarChartLegend.svelte'
  import RadialStackedBarChart from '../components/organs/RadialStackedBarChart.svelte'
  import RadialChartLegend from '../components/molecules/RadialChartLegend.svelte'
  import ShareButtons from '../components/atoms/ShareButtons.svelte'
  import CTA from '../components/atoms/CTA.svelte'

  export let params

  $: title = `Comparing ${$comparingMunicipalities
    .map(({ municipality }) => municipality)
    .join(', ')}`

  onMount(() => {
    if (!$comparingMunicipalities.length) {
      const queryParams = Object.values(params).reduce(
        (acc, curr) => acc.concat(`municipalities=${curr}&`),
        ''
      )
      fetch(
        `${window.location.origin}/.netlify/functions/compare?${queryParams}`
      )
        .then(res => res.json())
        .then(data => comparingMunicipalities.set(data))
    }
  })
</script>

<style>
  main {
    overflow: hidden scroll;
  }
</style>

<main>
  <CompareDashboard>
    <CompareGridItem area="heading">
      <h1>{title}</h1>
    </CompareGridItem>
    <CompareGridItem area="map">
      <MapComponent interaction={false} />
    </CompareGridItem>
    <CompareGridItem area="notifications">
      <NotificationList />
    </CompareGridItem>
    <CompareGridItem area="graph-1">
      <slot slot="heading">Green energy production gained over the years</slot>
      <slot slot="legend">
        <BarChartLegend />
      </slot>
      <GroupedBarChart />
    </CompareGridItem>
    <CompareGridItem area="graph-2">
      <slot slot="heading">Total renewable energy production compared</slot>
      <slot slot="legend">
        <RadialChartLegend />
      </slot>
      <RadialStackedBarChart />
      <RadialStackedBarChart divideByHoudeholds />
    </CompareGridItem>
    <CompareGridItem area="table">
      <slot slot="heading">General information</slot>
      <Table />
    </CompareGridItem>
    <CompareGridItem area="facts">
      <slot slot="heading">Energy facts</slot>
      <FactListGroup />
    </CompareGridItem>
    <CompareGridItem area="cta">
      <CTA />
    </CompareGridItem>
    <CompareGridItem area="share">
      <ShareButtons />
    </CompareGridItem>
  </CompareDashboard>
</main>
