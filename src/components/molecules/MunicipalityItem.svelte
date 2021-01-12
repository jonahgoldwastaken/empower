<script>
  import MunicipalityArms from '../atoms/MunicipalityArms.svelte'
  import Tag from '../atoms/Tag.svelte'
  import CompareButton from '../atoms/CompareButton.svelte'

  export let municipality
</script>

<style>
  li {
    box-sizing: border-box;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: min-content min-content;
    border-radius: 0.75rem;
    background: var(--white);
    padding: var(--step--1);
    grid-gap: var(--step--2);
    box-shadow: var(--very-light-box-shadow);
  }

  li:not(:last-child) {
    margin-bottom: var(--step--2);
  }

  h3 {
    display: inline-block;
    margin: 0;
    grid-row: 1;
    line-height: 1;
    font-size: var(--step-2);
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    width: calc(100% - 5rem);
  }

  li :global(label) {
    grid-row: 1;
    align-self: start;
    justify-self: end;
  }

  p {
    margin: 0;
    color: var(--dark-grey);
    font-size: var(--step--1);
  }

  strong {
    color: var(--orange);
  }

  div {
    align-self: end;
  }
</style>

<li>
  <h3>{municipality.municipality}</h3>
  <CompareButton {municipality} />
  <div>
    <p>Production: <strong>{municipality.totalEnergyGeneration} TJ</strong></p>
    <div>
      {#if municipality.windEnergyGeneration}
        <Tag colour="#81cfd0">Wind energy</Tag>
      {/if}
      {#if municipality.solarEnergyGeneration}
        <Tag colour="#f4dc86">Solar</Tag>
      {/if}
      {#if municipality.biogasEnergyGeneration}
        <Tag colour="#79c181">Biogas</Tag>
      {/if}
    </div>
  </div>
</li>
