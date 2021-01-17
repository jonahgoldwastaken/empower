<script>
  import { Router, Route } from 'svelte-routing'
  import Loadable from 'svelte-loadable'
  import Index from './pages/Index.svelte'
  import TestRoute from './pages/TestRoute.svelte'
</script>

<style global>
  @import url('https://unpkg.com/normalize.css@8.0.1/normalize.css');
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
  @font-face {
    font-family: 'DIN Alternate';
    src: url(/din-alternate.ttf) format('ttf');
  }

  :root {
    /* @link https://utopia.fyi/generator-mk-ii?c=320,16,1.067,2560,18,1.125,5,2,1920 */
    --step--2: clamp(0.8781rem, 0.8766rem + 0.0076vw, 0.8888rem);
    --step--1: clamp(0.9375rem, 0.9286rem + 0.0446vw, 1rem);
    --step-0: clamp(1rem, 0.9821rem + 0.0893vw, 1.125rem);
    --step-1: clamp(1.0669rem, 1.0385rem + 0.142vw, 1.2656rem);
    --step-2: clamp(1.1388rem, 1.098rem + 0.2036vw, 1.4238rem);
    --step-3: clamp(1.215rem, 1.1597rem + 0.2763vw, 1.6019rem);
    --step-4: clamp(1.2963rem, 1.224rem + 0.3612vw, 1.8019rem);
    --step-5: clamp(1.3831rem, 1.2911rem + 0.4603vw, 2.0275rem);

    --dark-green: #548687;
    --green: #8fbc94;
    --light-green: #c5e99b;
    --orange: #ed9040;
    --muted-orange: #ffbe5b;
    --red: #d35d5d;
    --yellow: #ffe68c;
    --blue: #6dc9dd;
    --grey-blue: #e2ebee;
    --black: black;
    --off-black: #515151;
    --dark-grey: #787878;
    --light-grey: #cfcfcf;
    --off-white: #f3f3f3;
    --white: white;

    --very-light-box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
    --light-box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    --medium-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    --text-primary: var(--off-black);
    --text-secondary: var(--white);

    --test-green-1: #8db991;
    --test-green-2: #73ab79;
    --test-green-3: #548c5a;
    --test-green-4: #457349;
    --test-green-5: #2f4c32;

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
    font-family: 'Roboto', sans-serif;
  }

  h1 {
    font-family: 'DIN Alternate', sans-serif;
    font-weight: bold;
    font-size: var(--step-3);
  }

  h2 {
    font-size: var(--step-2);
    font-weight: 700;
    margin: 0;
    margin-bottom: 1em;
  }

  h3 {
    font-size: var(--step-1);
    font-weight: 500;
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
  <Route path="/preview-compare">
    <Loadable loader={() => import('./pages/MunicipalityCompare.svelte')}>
      <div slot="loading">Loading...</div>
    </Loadable>
  </Route>
  <Route path="/preview">
    <Loadable loader={() => import('./pages/MunicipalityMap.svelte')}>
      <div slot="loading">Loading...</div>
    </Loadable>
  </Route>
  <Route path="/testroute">
    <TestRoute />
  </Route>
</Router>
