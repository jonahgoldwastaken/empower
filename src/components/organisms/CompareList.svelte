<script>
  import { onMount, onDestroy } from 'svelte'
  import Button from '../atoms/Button.svelte'
  import CloseButton from '../atoms/CloseButton.svelte'
  import MunicipalityItem from '../molecules/MunicipalityItem.svelte'
  import MunicipalityPlaceholder from '../atoms/MunicipalityPlaceholder.svelte'
  import { comparingMunicipalities } from '../../store/municipality'

  let section
  let noAnimate = false
  let unsub = comparingMunicipalities.subscribe(val => {
    if (section && val?.length > 0 && !noAnimate) {
      if (section.classList.contains('animating'))
        section.classList.remove('animating')
      section.classList.add('animating')
    } else if (val?.length === 0) {
      noAnimate = false
    }
  })

  function clearQueueHandler() {
    comparingMunicipalities.set([])
  }

  function animationEndHandler() {
    section.classList.remove('animating')
    noAnimate = false
  }

  function hoverHandler(e) {
    noAnimate = e.type === 'mouseover'
    section.classList.remove('animating')
  }

  onMount(() => {
    section.addEventListener('animationend', animationEndHandler)
  })

  onDestroy(() => {
    section.removeEventListener('animationend', animationEndHandler)
    unsub()
  })
</script>

<style>
  section {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 3rem;
    width: var(--sidebar-width);
    display: flex;
    align-items: center;
    flex-direction: column;
    background: var(--grey-blue);
    padding: 1rem;
    margin: 0;
    border-top-right-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
    box-shadow: 0px 0px 0px transparent;
    background: var(--off-white);
  }

  section.open:not(.animating),
  section.closed:not(.animating) {
    transition: all 0.4s ease-in-out;
  }

  section.open {
    box-shadow: var(--medium-box-shadow);
    left: calc(var(--sidebar-width) / 4);
    padding-left: 4rem;
    width: calc(3rem + var(--sidebar-width));
  }

  section.open:hover {
    left: var(--sidebar-width);
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
    color: var(--black);
    font-weight: 400;
    margin-right: auto;
  }

  header {
    margin-bottom: var(--step--2);
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  header :global(button img) {
    width: var(--step-1) !important;
    height: var(--step-1) !important;
  }

  section :global(a) {
    margin-top: var(--step-0);
  }

  :global(.animating):not(:hover) {
    transition: none;
    animation: slide-out 2s ease-in-out forwards;
  }

  @keyframes slide-out {
    from,
    to {
      left: calc(var(--sidebar-width) / 4);
    }
    20%,
    80% {
      left: var(--sidebar-width);
    }
  }
</style>

<section
  bind:this={section}
  class:closed={$comparingMunicipalities.length === 0}
  class:open={$comparingMunicipalities.length > 0}
  on:mouseover={hoverHandler}
  on:mouseout={hoverHandler}
>
  <header>
    <h3>
      Compare {$comparingMunicipalities.length === 1
        ? '1 municipality'
        : `${$comparingMunicipalities.length} municipalities`}
    </h3>
    <CloseButton on:click={clearQueueHandler} />
  </header>
  <ul>
    {#each $comparingMunicipalities as municipality (municipality.municipality)}
      <MunicipalityItem {municipality} />
    {/each}
    {#if $comparingMunicipalities.length === 0}
      <MunicipalityPlaceholder />
    {/if}
    {#if $comparingMunicipalities.length <= 1}
      <MunicipalityPlaceholder />
    {/if}
    {#if $comparingMunicipalities.length <= 2}
      <MunicipalityPlaceholder />
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
