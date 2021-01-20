<script>
  import FactCard from '../atoms/FactCard.svelte'
  import { tweened } from 'svelte/motion'
  import { quintInOut } from 'svelte/easing'

  export let municipality
  export let i

  const solarAmount = tweened(0, {
    duration: 1000,
    easing: quintInOut,
  })

  const windAmount = tweened(0, {
    duration: 1000,
    easing: quintInOut,
  })

  const biogasAmount = tweened(0, {
    duration: 1000,
    easing: quintInOut,
  })

  $: municipality?.solarProjects.length &&
    solarAmount.set(
      +(
        municipality.solarProjects.reduce(
          (acc, curr) => (curr.vermogen ? acc + curr.vermogen : acc),
          0
        ) / municipality.solarProjects.filter(d => d.vermogen).length
      ).toFixed(0)
    )

  $: municipality?.windProjects.length &&
    windAmount.set(
      +(
        municipality.windProjects.reduce(
          (acc, curr) => (curr.vermogen ? acc + curr.vermogen : acc),
          0
        ) / municipality.windProjects.filter(d => d.vermogen).length
      ).toFixed(0)
    )

  $: biogasAmount.set(+municipality.biogasEnergyGeneration)
</script>

<style>
  section {
    box-sizing: border-box;
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
    amount={$solarAmount.toFixed(0)}
  />
  <FactCard
    background={i === 0 ? 'dark-green' : i === 1 ? 'green' : 'blue'}
    energyType="wind"
    amount={$windAmount.toFixed(0)}
  />
  <FactCard
    background={i === 0 ? 'dark-green' : i === 1 ? 'green' : 'blue'}
    energyType="biogas"
    amount={$biogasAmount.toFixed(0)}
  >
    <p>TJ of biogas energy generation in total</p>
  </FactCard>
</section>
