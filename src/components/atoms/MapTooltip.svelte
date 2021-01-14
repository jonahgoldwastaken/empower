<script>
  import CompareButton from '../atoms/CompareButton.svelte'
  import { tweened } from 'svelte/motion'
  import { cubicInOut } from 'svelte/easing'
  import { fade } from 'svelte/transition'
  import { scale, translate, currentFocus } from '../../store/map'

  const productionAmount = tweened(0, {
    duration: 400,
    easing: cubicInOut,
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
    width: min-content;
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
    color: var(--dark-grey);
    margin: 0 0 0.5rem;
    font-size: var(--step-0);
  }

  p > strong {
    color: var(--orange);
  }

  #map-tooltip ol {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
  }

  #map-tooltip .productionTile {
    box-sizing: border-box;
    width: calc(var(--step-4) * 2);
    height: calc(var(--step-4) * 2);
    border-radius: 0.5rem;
    border: 1px dashed var(--dark-grey);
    padding: 0.5rem;
    background: var(--off-white);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s ease-in-out;
  }

  #map-tooltip .productionTile img {
    width: 100%;
    height: 100%;
  }

  #map-tooltip .productionTile:not(:last-child) {
    margin-right: 1rem;
  }

  #map-tooltip .productionTile#wind.active {
    border: none;
    background: var(--blue);
  }

  #map-tooltip .productionTile#solar.active {
    border: none;
    background: var(--yellow);
    padding: 0.3rem;
  }

  #map-tooltip .productionTile#biogas.active {
    border: none;
    background: var(--green);
  }

  .close-button {
    appearance: none;
    border: none;
    background: none;
    padding: 0;
    margin: 0 0 0 calc(var(--step--1) / 2);
    cursor: pointer;
  }

  .close-button img {
    width: var(--step--1);
    height: var(--step--1);
    opacity: 0.25;
    transition: opacity 0.2s ease-in-out;
  }

  .close-button:hover img {
    opacity: 1;
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
    in:fade={{ delay: 375, duration: 375, ease: cubicInOut }}
    out:fade={{ duration: 375, ease: cubicInOut }}>
    <h2>{$currentFocus.municipality}</h2>
    <div>
      <CompareButton municipality={$currentFocus} />
      <button class="close-button" on:click={closeClickHandler}>
        <img src="/cross.svg" alt="Close tooltip" />
      </button>
    </div>
    <div>
      <p>Production: <strong>{$productionAmount.toFixed(0)} TJ</strong></p>
      <ol>
        <li
          key="wind"
          id="wind"
          class="productionTile"
          class:active={$currentFocus.windEnergyGeneration}>
          <img src="/wind.svg" alt="Wind icon" />
        </li>
        <li
          key="wind"
          id="solar"
          class="productionTile"
          class:active={$currentFocus.solarEnergyGeneration}>
          <img src="/solar.svg" alt="Solar icon" />
        </li>
        <li
          key="wind"
          id="biogas"
          class="productionTile"
          class:active={$currentFocus.biogasEnergyGeneration}>
          <img src="/biogas.svg" alt="Biogas icon" />
        </li>
      </ol>
    </div>
  </div>
{/if}
