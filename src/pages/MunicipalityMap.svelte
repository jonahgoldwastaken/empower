<script>
  import Layout from '../components/template/Layout.svelte'
  import MapComponent from '../components/organisms/MapComponent.svelte'
  import CompareList from '../components/organisms/CompareList.svelte'
  import RecommendedList from '../components/organisms/RecommendedList.svelte'
  import MunicipalityList from '../components/organisms/MunicipalityList.svelte'
  import SearchBar from '../components/atoms/SearchBar.svelte'
  import SelectInput from '../components/atoms/SelectInput.svelte'
  import { sort, filter } from '../store/municipality'
</script>

<style>
  .select-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--step-4);
  }
</style>

<Layout>
  <slot slot="sidebar">
    <h2>Compare municipalities</h2>
    <SearchBar />
    <div class="select-container">
      <SelectInput
        name="sort"
        bind:value={$sort}
        options={[{ name: 'Alphabetically', value: 'alphabetical' }, { name: 'High production', value: 'production-high' }, { name: 'Low production', value: 'production-low' }]}>
        Sort:
      </SelectInput>
      <SelectInput
        name="sort"
        bind:value={$filter}
        options={[{ name: 'Show All', value: 'show all' }, { name: '0-200 TJ', value: '0-200' }, { name: '200-400 TJ', value: '200-400' }, { name: '400-600 TJ', value: '400-600' }, { name: '600-800 TJ', value: '600-800' }, { name: '800+ TJ', value: '800' }]}>
        Filter production:
      </SelectInput>
    </div>
    <CompareList />
    <RecommendedList />
    <MunicipalityList />
  </slot>
  <slot slot="main">
    <MapComponent />
  </slot>
</Layout>
