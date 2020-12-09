<script lang="typescript">
  import { Router, Route } from 'svelte-routing'
  import Index from './pages/Index.svelte'
</script>

<style global>
  @import 'normalize.css/opinionated.css';
</style>

<Router>
  <Route path="/">
    <Index />
  </Route>
</Router>
