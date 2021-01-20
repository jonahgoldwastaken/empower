<script>
  import { comparingMunicipalities } from '../../store/municipality'
  import TableRow from '../molecules/TableRow.svelte'
  import TableDetail from '../atoms/TableDetail.svelte'
  import TableHeading from '../atoms/TableHeading.svelte'
</script>

<style>
  table {
    border-collapse: collapse;
    grid-column: span 1;
    grid-row: span 1;
    width: 100%;
    height: 100%;
  }
</style>

<table>
  <thead>
    <TableRow>
      <TableDetail scope="col" />
      {#each $comparingMunicipalities as d (d.code)}
        <TableHeading scope="col">{d.municipality}</TableHeading>
      {/each}
    </TableRow>
  </thead>
  <tbody>
    <TableRow>
      <TableDetail scope="row">Population</TableDetail>
      {#each $comparingMunicipalities as d (d.code)}
        <TableDetail>{d.population}</TableDetail>
      {/each}
    </TableRow>
    <TableRow>
      <TableDetail scope="row">Location</TableDetail>
      {#each $comparingMunicipalities as d (d.code)}
        <TableDetail>{d.location}</TableDetail>
      {/each}
    </TableRow>
    <TableRow>
      <TableDetail scope="row">Total area</TableDetail>
      {#each $comparingMunicipalities as d (d.code)}
        <TableDetail>{d.totalArea / 10} KM<sup>2</sup></TableDetail>
      {/each}
    </TableRow>
  </tbody>
</table>
