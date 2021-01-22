<script>
  import CompareButton from '../atoms/CompareButton.svelte'
  import ProductionTile from '../atoms/ProductionTile.svelte'
  import CloseButton from '../atoms/CloseButton.svelte'
  import { tweened } from 'svelte/motion'
  import { quintInOut } from 'svelte/easing'
  import { fade } from 'svelte/transition'
  import { scale, translate, currentFocus } from '../../store/map'

  const productionAmount = tweened(0, {
    duration: 400,
    easing: quintInOut,
  })

  $: $currentFocus && productionAmount.set($currentFocus.totalEnergyGeneration)

  function closeClickHandler() {
    currentFocus.set(null)
    translate.set({
      x: 0,
      y: 0,
    })
    scale.set(1)
  }
</script>

<style>
  #map-tooltip {
    background: white;
    position: absolute;
    top: 50%;
    left: 50%;
    width: auto;
    transform: translate(-50%, calc(-100% - (var(--step-0) / 2)));
    border-radius: 0.75rem;
    padding: var(--step--1);
    display: grid;
    grid-template-columns: repeat(2, max-content);
    grid-template-rows: repeat(3, min-content);
    grid-column-gap: 4rem;
    grid-row-gap: 0.75rem;
    transition: all 0.4s ease-in-out;
  }

  #map-tooltip::before {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 50%;
    width: var(--step-0);
    height: var(--step-0);
    transform: translateX(-50%) translateY(50%) rotate(45deg);
    background: white;
  }

  h2 {
    grid-row: 1;
    grid-column: 1;
    margin: 0;
    font-size: var(--step-2);
    font-family: 'DIN Alternate', sans-serif;
  }

  #map-tooltip div:nth-child(2) {
    grid-column: 2;
    grid-row: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  #map-tooltip div:nth-child(3) {
    grid-column: 1 / span 2;
    grid-row: 2;
  }

  p {
    color: var(--text-primary);
    margin: 0 0 0.5rem;
    font-size: var(--step-0);
  }

  p > strong {
    color: var(--orange);
  }

  ol {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
  }
</style>

<svelte:head>
  <meta rel="preload" href="/wind.svg" />
  <meta rel="preload" href="/solar.svg" />
  <meta rel="preload" href="/biogas.svg" />
</svelte:head>

{#if $currentFocus}
  <div
    id="map-tooltip"
    in:fade={{ delay: 375, duration: 375, ease: quintInOut }}
    out:fade={{ duration: 375, ease: quintInOut }}
  >
    <h2>{$currentFocus.municipality}</h2>
    <div>
      <CompareButton municipality={$currentFocus} />
      <CloseButton on:click={closeClickHandler} />
    </div>
    <div>
      <p>Production: <strong>{$productionAmount.toFixed(0)} TJ</strong></p>
      <ol>
        <ProductionTile
          type="wind"
          active={$currentFocus.windEnergyGeneration}
        />
        <ProductionTile
          type="solar"
          active={$currentFocus.solarEnergyGeneration}
        />
        <ProductionTile
          type="biogas"
          active={$currentFocus.biogasEnergyGeneration}
        />
      </ol>
    </div>
  </div>
{/if}
