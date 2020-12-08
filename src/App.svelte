<script lang="typescript">
  import { Router, Route } from 'svelte-routing'
  import Index from './pages/Index.svelte'

  export let url = ''
</script>

<style global>
  @import 'normalize.css/opinionated.css';
</style>

<Router {url}>
  <Route path="/">
    <Index />
  </Route>
</Router>
