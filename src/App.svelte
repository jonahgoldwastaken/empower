<script>
  import Loadable from 'svelte-loadable'
  import { Router, Route } from 'svelte-routing'
  import Layout from './components/template/Layout.svelte'
  import Loader from './components/atoms/Loader.svelte'
</script>

<style global>
  @import url('https://unpkg.com/normalize.css@8.0.1/normalize.css');
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
  @font-face {
    font-family: 'DIN Alternate';
    src: url(/din-alternate.ttf) format('ttf');
  }

  :root {
    /* @link https://utopia.fyi/generator-mk-ii?c=320,16,1.067,2560,18,1.2,5,2,1920 */
    --step--2: clamp(0.8781rem, 0.892rem + -0.0692vw, 0.7813rem);
    --step--1: clamp(0.9375rem, 0.9375rem + 0vw, 0.9375rem);
    --step-0: clamp(1rem, 0.9821rem + 0.0893vw, 1.125rem);
    --step-1: clamp(1.0669rem, 1.0264rem + 0.2022vw, 1.35rem);
    --step-2: clamp(1.1388rem, 1.07rem + 0.3438vw, 1.62rem);
    --step-3: clamp(1.215rem, 1.1109rem + 0.5205vw, 1.9438rem);
    --step-4: clamp(1.2963rem, 1.1482rem + 0.7402vw, 2.3325rem);
    --step-5: clamp(1.3831rem, 1.1808rem + 1.0116vw, 2.7994rem);

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

    --map-green-1: #a6c9a9;
    --map-green-2: #73ab79;
    --map-green-3: #4d8051;
    --map-green-4: #365939;
    --map-green-5: #273f29;

    --sidebar-width: max(15rem, min(20rem, 30%));

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
    font-weight: 400;
  }

  a {
    color: var(--light-green);
    font-weight: 500;
  }
</style>

<Layout>
  <Router>
    <Route path="/compare/:munOne/:munTwo" let:params>
      <Loadable
        delay={200}
        loader={() => import('./pages/Compare.svelte')}
        {params}
      >
        <slot slot="loading" />
      </Loadable>
    </Route>
    <Route path="/compare/:munOne/:munTwo/:munThree" let:params>
      <Loadable
        delay={200}
        loader={() => import('./pages/Compare.svelte')}
        {params}
      >
        <slot slot="loading"><Loader /></slot>
      </Loadable>
    </Route>
    <Route path="/">
      <Loadable delay={200} loader={() => import('./pages/MapPage.svelte')}>
        <slot slot="loading"><Loader /></slot>
      </Loadable>
    </Route>
  </Router>
</Layout>
