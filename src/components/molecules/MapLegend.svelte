<script>
  import LegendStep from '../atoms/LegendStep.svelte'
</script>

<style>
  section {
    box-sizing: border-box;
    position: absolute;
    bottom: 6rem;
    right: 1.25rem;
    border-radius: 0.75rem;
    background: var(--white);
    padding: var(--step--1);
    max-width: 10rem;
  }

  h3 {
    font-size: var(--step--0);
    font-family: 'Roboto', sans-serif;
    margin: 0;
    margin-bottom: 1em;
  }

  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>

<section>
  <h3>Green energy production</h3>
  <ol>
    <LegendStep color="map-green-1">&lt; 200 TJ</LegendStep>
    <LegendStep color="map-green-2">200 - 400 TJ</LegendStep>
    <LegendStep color="map-green-3">400 - 600 TJ</LegendStep>
    <LegendStep color="map-green-4">600 - 800 TJ</LegendStep>
    <LegendStep color="map-green-5">&gt;= 800 TJ</LegendStep>
  </ol>
</section>
