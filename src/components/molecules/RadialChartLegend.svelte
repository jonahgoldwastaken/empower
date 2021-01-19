<script>
  import LegendStep from '../atoms/LegendStep.svelte'
</script>

<style>
  div {
    border-radius: 0.75rem;
    background: var(--white);
    flex: 0 0 calc(7 * var(--step-0));
  }

  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>

<div>
  <ol>
    <LegendStep color="blue">Wind</LegendStep>
    <LegendStep color="yellow">Solar</LegendStep>
    <LegendStep color="green">Biogas</LegendStep>
    <LegendStep color="light-grey">Unknown</LegendStep>
  </ol>
</div>
