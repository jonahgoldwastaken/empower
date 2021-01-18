<script>
  import { onMount } from 'svelte'
  import { comparingMunicipalities } from '../store/municipality'
  import Layout from '../components/template/Layout.svelte'
  import CompareDashboard from '../components/organisms/CompareDashboard.svelte'
  import FactListGroup from '../components/organs/FactListGroup.svelte'
  import CompareGridItem from '../components/atoms/CompareGridItem.svelte'
  import NotificationList from '../components/molecules/NotificationList.svelte'
  import Notification from '../components/atoms/Notification.svelte'
  import MapComponent from '../components/organisms/MapComponent.svelte'
  import Table from '../components/organs/Table.svelte'
  import GroupedBarChart from '../components/organs/GroupedBarChart.svelte'
  import RadialStackedBarChart from '../components/organs/RadialStackedBarChart.svelte'

  export let params

  onMount(() => {
    const queryParams = params.municipalities
      ?.split(',')
      .reduce((acc, curr) => acc.concat(`municipalities=${curr}&`), '')
    fetch(`${window.location.origin}/.netlify/functions/compare?${queryParams}`)
      .then(res => res.json())
      .then(data => comparingMunicipalities.set(data))
  })
</script>

<Layout>
  <slot slot="main">
    <CompareDashboard>
      <CompareGridItem area="map">
        <MapComponent interaction={false} />
      </CompareGridItem>
      <CompareGridItem area="notifications">
        <NotificationList>
          <Notification>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non error
            inventore dignissimos quia et dolorum impedit ipsa earum, dolore
            eius, soluta provident laboriosam incidunt numquam eos! Voluptatum
            suscipit dolore corrupti?
          </Notification>
          <Notification>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non error
            inventore dignissimos quia et dolorum impedit ipsa earum, dolore
            eius, soluta provident laboriosam incidunt numquam eos! Voluptatum
            suscipit dolore corrupti?
          </Notification>
        </NotificationList>
      </CompareGridItem>
      <CompareGridItem area="graph-1">
        <GroupedBarChart />
      </CompareGridItem>
      <CompareGridItem area="graph-2">
        <RadialStackedBarChart />
        <RadialStackedBarChart />
      </CompareGridItem>
      <CompareGridItem area="table">
        <Table />
      </CompareGridItem>
      <CompareGridItem area="facts">
        <FactListGroup />
      </CompareGridItem>
    </CompareDashboard>
  </slot>
</Layout>
