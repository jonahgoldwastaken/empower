<script>
  import { Router, Route } from 'svelte-routing'
  import Loadable from 'svelte-loadable'
  import Index from './pages/Index.svelte'
  import Playground from './pages/Playground.svelte'
  import TestRoute from './pages/TestRoute.svelte'
</script>

<style global>
  @import 'normalize.css/opinionated.css';
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
  @font-face {
    font-family: 'DIN Alternate';
    src: url(/din-alternate.ttf) format('ttf');
  }

  :root {
    /* @link https://utopia.fyi/generator-mk-ii?c=320,16,1.125,1920,20,1.125,4,0, */
    --step--2: clamp(0.79rem, 0.7505rem + 0.1975vw, 0.9875rem);
    --step--1: clamp(0.8888rem, 0.8443rem + 0.2225vw, 1.1113rem);
    --step-0: clamp(1rem, 0.95rem + 0.25vw, 1.25rem);
    --step-1: clamp(1.125rem, 1.0688rem + 0.2813vw, 1.4063rem);
    --step-2: clamp(1.2656rem, 1.2024rem + 0.3163vw, 1.5819rem);
    --step-3: clamp(1.4238rem, 1.3525rem + 0.3563vw, 1.78rem);
    --step-4: clamp(1.6019rem, 1.5218rem + 0.4006vw, 2.0025rem);

    --dark-green: #8fbc94;
    --green: #79c181;
    --light-green: #c5e99b;
    --orange: #ed9040;
    --muted-orange: #f1b989;
    --light-orange: #f8ac36;
    --yellow: #f4dc86;
    --turqoise: #81cfd0;
    --white: white;
    --black: black;
    --light-grey: #efeded;
    --dark-grey: #bfbfbf;

    --very-light-box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
    --light-box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    --medium-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    --text-primary: black;
    --text-secondary: white;

    font-family: 'Roboto', sans-serif;
    line-height: 1.5;
  }

  /* @media (prefers-color-scheme: dark) {
    :root {
      --text-primary: white;
      --text-secondary: black;
    }
  } */

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.125;
  }

  h2,
  h3 {
    font-family: 'Roboto';
    font-weight: 500;
  }

  h1 {
    font-family: 'DIN Alternate', sans-serif;
    font-weight: bold;
    font-size: var(--step-4);
  }

  h2 {
    font-size: var(--step-3);
  }

  h3 {
    font-size: var(--step-2);
  }

  a {
    color: var(--light-green);
    font-weight: 500;
  }
</style>

<Router>
  <Route path="/">
    <Index />
  </Route>
  <Route path="/comparetest">
    <Loadable loader={() => import('./pages/MunicipalityMap.svelte')}>
      <div slot="loading">Loading...</div>
    </Loadable>
  </Route>
  <Route path="/playground">
    <Playground />
  </Route>
  <Route path="/testroute">
    <TestRoute />
  </Route>
</Router>
