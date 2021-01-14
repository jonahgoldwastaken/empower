<script>
  import FactCard from '../atoms/FactCard.svelte'
</script>

<style>
  section {
    display: flex;
    align-items: center;
  }

  h3 {
    font-size: var(--step-0);
  }
</style>

<section>
  <h3>Amsterdam</h3>
  <FactCard energyType="solar" amount={200} />
  <FactCard energyType="wind" amount={130} />
  <FactCard energyType="biogas" amount={0} />
</section>
