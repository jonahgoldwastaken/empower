<script>
  import Button from '../atoms/Button.svelte'
  import CloseButton from '../atoms/CloseButton.svelte'
  import MunicipalityItem from '../molecules/MunicipalityItem.svelte'
  import MunicipalityPlaceholder from '../atoms/MunicipalityPlaceholder.svelte'
  import { comparingMunicipalities } from '../../store/municipality'

  function clearQueueHandler() {
    comparingMunicipalities.set([])
  }
</script>

<style>
  section {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 3rem;
    width: max(25rem, min(30rem, 30%));
    height: min-content;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: var(--grey-blue);
    padding: calc(var(--step-2));
    margin: 0;
    border-top-right-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
    box-shadow: 0px 0px 0px transparent;
    background: var(--off-white);
    transition: all 0.4s ease-in-out;
  }

  section.open {
    box-shadow: var(--medium-box-shadow);
    left: calc(max(25rem, min(30rem, 30%)));
    padding-left: calc(var(--step-2) + 3rem);
    width: calc(3rem + max(25rem, min(30rem, 30%)));
  }

  ul {
    display: block;
    margin: 0;
    padding: 0;
    list-style: none;
    width: 100%;
  }

  h3 {
    margin: 0;
    width: 100%;
    text-align: center;
    color: var(--text-primary);
    font-weight: 400;
  }

  header {
    margin-bottom: var(--step--2);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  section :global(a) {
    margin-top: var(--step-0);
  }
</style>

<section class:open={$comparingMunicipalities.length > 0}>
  <header>
    <h3>
      Compare {$comparingMunicipalities.length === 1
        ? '1 municipality'
        : `${$comparingMunicipalities.length} municipalities`}
    </h3>
    {#if $comparingMunicipalities.length}
      <CloseButton on:click={clearQueueHandler} />
    {/if}
  </header>
  <ul>
    {#each $comparingMunicipalities as municipality (municipality.municipality)}
      <MunicipalityItem {municipality} />
    {/each}
    {#if $comparingMunicipalities.length === 0}
      <MunicipalityPlaceholder>Add municipality</MunicipalityPlaceholder>
    {/if}
    {#if $comparingMunicipalities.length <= 1}
      <MunicipalityPlaceholder>Add municipality</MunicipalityPlaceholder>
    {/if}
    {#if $comparingMunicipalities.length <= 2}
      <MunicipalityPlaceholder>Add municipality</MunicipalityPlaceholder>
    {/if}
  </ul>
  <Button
    anchor={true}
    href={$comparingMunicipalities.length > 1
      ? `/compare/${$comparingMunicipalities
          .map(({ municipality }) => municipality)
          .join('/')}`
      : ''}
  >Compare municipalities</Button
  >
</section>
