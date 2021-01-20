<script>
  import LegendStep from '../atoms/LegendStep.svelte'
</script>

<style>
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>

<ol>
  <LegendStep color="blue">Wind</LegendStep>
  <LegendStep color="yellow">Solar</LegendStep>
  <LegendStep color="green">Biogas</LegendStep>
  <LegendStep color="light-grey">Unknown</LegendStep>
</ol>
