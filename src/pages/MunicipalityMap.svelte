<script>
  import { onMount } from 'svelte'
  import Layout from '../components/template/Layout.svelte'
  import MapComponent from '../components/molecules/MapComponent.svelte'
  import MunicipalityList from '../components/organisms/MunicipalityList.svelte'
  import SearchBar from '../components/atoms/SearchBar.svelte'
  import SelectInput from '../components/atoms/SelectInput.svelte'
  import { filteredData, sort, filter } from '../store/municipality'
</script>

<style>
  .select-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--step-4);
  }
</style>

{#if $filteredData}
  <Layout>
    <slot slot="sidebar">
      <SearchBar />
      <div class="select-container">
        <SelectInput
          bind:value={$sort}
          options={[{ name: 'Alphabetically', value: 'alphabetical' }, { name: 'High production', value: 'production-high' }, { name: 'Low production', value: 'production-low' }]}>
          Sort:
        </SelectInput>
        <SelectInput
          bind:value={$filter}
          options={[{ name: 'Show All', value: 'all' }, { name: '0-200 TJ', value: '0-200' }, { name: '200-400 TJ', value: '200-400' }, { name: '400-600 TJ', value: '400-600' }, { name: '600-800 TJ', value: '600-800' }, { name: '800+ TJ', value: '800' }]}>
          Filter production:
        </SelectInput>
      </div>
      <MunicipalityList municipalities={$filteredData} />
    </slot>
    <slot slot="main">
      <MapComponent />
    </slot>
  </Layout>
{/if}
