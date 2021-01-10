<script>
  import MapComponent from '../components/molecules/MapComponent.svelte'
  import Layout from '../components/organisms/Layout.svelte'
</script>

<Layout>
  <slot slot="main">
    <MapComponent />
  </slot>
</Layout>
