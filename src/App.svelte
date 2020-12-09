<script lang="typescript">
  import { Router, Route } from 'svelte-routing'
  import Index from './pages/Index.svelte'
  import Test from './pages/Test.svelte'
</script>

<style global>
  @import 'normalize.css/opinionated.css';
</style>

<Router>
  <Route path="/">
    <Index />
  </Route>
  <Route path="/test">
    <Test />
  </Route>
</Router>
