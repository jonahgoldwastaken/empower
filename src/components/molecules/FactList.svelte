<script>
  import FactCard from '../atoms/FactCard.svelte'
  import { tweened } from 'svelte/motion'
  import { quintInOut } from 'svelte/easing'

  export let municipality
  export let i

  $: solarAmount = municipality?.solarProjects.length
    ? +(
        municipality.solarProjects.reduce(
          (acc, curr) => (curr.vermogen ? acc + curr.vermogen : acc),
          0
        ) / municipality.solarProjects.filter(d => d.vermogen > -1).length
      ).toFixed(0)
    : 0

  $: windAmount = municipality?.windProjects.length
    ? +(
        municipality.windProjects.reduce(
          (acc, curr) => (curr.vermogen ? acc + curr.vermogen : acc),
          0
        ) / municipality.windProjects.filter(d => d.vermogen > -1).length
      ).toFixed(0)
    : 0

  $: biogasAmount = +municipality.biogasEnergyGeneration
</script>

<style>
  section {
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: calc(100% / 3);
  }

  section:not(:last-child) {
    margin-right: var(--step-0);
  }

  h3 {
    font-size: var(--step-0);
    flex: 0 0;
    hyphens: auto;
    margin: 0;
  }

  @media screen and (min-width: 100rem) {
    section {
      flex-direction: row;
      justify-content: initial;
      align-items: center;
      width: 100%;
      height: min-content;
    }

    section:not(:last-child) {
      margin-right: 0;
      margin-bottom: var(--step-0);
    }

    h3 {
      flex: 0 0 12%;
    }
  }
</style>

<section>
  <h3>{municipality?.municipality}</h3>
  <FactCard
    background={i === 0 ? 'dark-green' : i === 1 ? 'green' : 'blue'}
    energyType="solar"
    bind:amount={solarAmount}
  />
  <FactCard
    background={i === 0 ? 'dark-green' : i === 1 ? 'green' : 'blue'}
    energyType="wind"
    bind:amount={windAmount}
  />
  <FactCard
    background={i === 0 ? 'dark-green' : i === 1 ? 'green' : 'blue'}
    energyType="biogas"
    bind:amount={biogasAmount}
  >
    <p>TJ of biogas energy generation in total</p>
  </FactCard>
</section>
