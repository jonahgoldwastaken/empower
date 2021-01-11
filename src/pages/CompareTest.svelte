<script>
  import { onMount } from 'svelte'
  import Layout from '../components/template/Layout.svelte'
  import MapComponent from '../components/molecules/MapComponent.svelte'
  import MunicipalityList from '../components/organisms/MunicipalityList.svelte'

  let data

  onMount(() => {
    fetch(`${window.location.origin}/api/municipalities`)
      .then(res => res.json())
      .then(body => (data = body))
  })
</script>

{#if data}
  <Layout>
    <slot slot="sidebar">
      <MunicipalityList municipalities={data} />
    </slot>
    <slot slot="main">
      <MapComponent {data} />
    </slot>
  </Layout>
{/if}
