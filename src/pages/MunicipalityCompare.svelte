<script>
  import Layout from '../components/template/Layout.svelte'
  import CompareDashboard from '../components/organisms/CompareDashboard.svelte'
  import FactList from '../components/molecules/FactList.svelte'
  import CompareGridItem from '../components/atoms/CompareGridItem.svelte'
  import NotificationList from '../components/molecules/NotificationList.svelte'
  import Notification from '../components/atoms/Notification.svelte'
  import MapComponent from '../components/organisms/MapComponent.svelte'
  import Table from '../components/organs/Table.svelte'
  import TableRow from '../components/molecules/TableRow.svelte'
  import TableHeading from '../components/atoms/TableHeading.svelte'
  import TableDetail from '../components/atoms/TableDetail.svelte'
  import GroupedBarChart from '../components/organs/GroupedBarChart.svelte'
  import RadialStackedBarChart from '../components/organs/RadialStackedBarChart.svelte'
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
        <Table>
          <thead>
            <TableRow>
              <TableDetail scope="col" />
              <TableHeading scope="col">Amsterdam</TableHeading>
              <TableHeading scope="col">Dronten</TableHeading>
              <TableHeading scope="col">Castricum</TableHeading>
            </TableRow>
          </thead>
          <tbody>
            <TableRow>
              <TableDetail scope="row">Population</TableDetail>
              <TableDetail>1237898</TableDetail>
              <TableDetail>3</TableDetail>
              <TableDetail>327792</TableDetail>
            </TableRow>
            <TableRow>
              <TableDetail scope="row">Location</TableDetail>
              <TableDetail>Ergens</TableDetail>
              <TableDetail>Daar</TableDetail>
              <TableDetail>Hier</TableDetail>
            </TableRow>
            <TableRow>
              <TableDetail scope="row">Total area</TableDetail>
              <TableDetail>Heel groot</TableDetail>
              <TableDetail>Heel klein</TableDetail>
              <TableDetail>Ertussenin</TableDetail>
            </TableRow>
          </tbody>
        </Table>
      </CompareGridItem>
      <CompareGridItem area="facts">
        <FactList />
        <FactList />
        <FactList />
      </CompareGridItem>
    </CompareDashboard>
  </slot>
</Layout>
