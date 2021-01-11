<script>
  import { onMount } from 'svelte'
  import Layout from '../components/template/Layout.svelte'
  import MapComponent from '../components/molecules/MapComponent.svelte'
  import MunicipalityList from '../components/organisms/MunicipalityList.svelte'
  import SearchBar from '../components/atoms/SearchBar.svelte'
  import { filteredData } from '../store/municipality'
</script>

{#if $filteredData}
  <Layout>
    <slot slot="sidebar">
      <SearchBar />
      <MunicipalityList municipalities={$filteredData} />
    </slot>
    <slot slot="main">
      <MapComponent />
    </slot>
  </Layout>
{/if}
