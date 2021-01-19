<script>
  import LegendStep from '../atoms/LegendStep.svelte'
</script>

<style>
  section {
    position: absolute;
    bottom: 0.5rem;
    left: 0.5rem;
    border-radius: 0.75rem;
    background: var(--white);
    padding: var(--step-0);
    box-shadow: var(--light-box-shadow);
    max-width: 10rem;
  }

  h3 {
    font-size: var(--step-1);
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
  <h3>Green energy production in TJ</h3>
  <ol>
    <LegendStep color="test-green-1">&lt; 200 TJ</LegendStep>
    <LegendStep color="test-green-2">200 - 400 TJ</LegendStep>
    <LegendStep color="test-green-3">400 - 600 TJ</LegendStep>
    <LegendStep color="test-green-4">600 - 800 TJ</LegendStep>
    <LegendStep color="test-green-5">&gt;= 800 TJ</LegendStep>
  </ol>
</section>
