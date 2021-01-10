<script>
  import { cubicInOut } from 'svelte/easing'
  import { fade } from 'svelte/transition'
  import { createEventDispatcher } from 'svelte'
  export let data

  const dispatch = createEventDispatcher()
  function closeClickHandler() {
    dispatch('close')
  }

  $: request =
    data &&
    fetch(
      `${window.location.origin}/api/municipality?code=${+data.properties.Code}`
    ).then(res => res.json())
</script>

<style>
  #map-tooltip {
    background: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, calc(-100% - (var(--step-0) / 2)));
    border-radius: 0.75rem;
    padding: var(--step--1);
    display: grid;
    grid-template-columns: repeat(2, max-content);
    grid-template-rows: repeat(3, min-content);
    grid-column-gap: 4rem;
    grid-row-gap: 0.75rem;
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
    background: var(--light-grey);
    display: flex;
    align-items: center;
    justify-content: center;
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
    background: var(--turqoise);
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
</style>

<svelte:head>
  <meta rel="preload" href="/wind.svg" />
  <meta rel="preload" href="/solar.svg" />
  <meta rel="preload" href="/biogas.svg" />
</svelte:head>

{#if data}
  <div
    id="map-tooltip"
    in:fade={{ delay: 375, duration: 375, ease: cubicInOut }}
    out:fade={{ duration: 375, ease: cubicInOut }}>
    {#await request}
      <h2>{data.properties.Gemeentenaam}</h2>
      <div>
        <label>Compare <input type="checkbox" name="compare" /></label>
        <button on:click={closeClickHandler}>Close</button>
      </div>
      <div>
        <p>Production: <strong>...</strong></p>
      </div>
    {:then municipality}
      <h2>{municipality.municipality}</h2>
      <div>
        <label>Compare <input type="checkbox" name="compare" /></label>
        <button on:click={closeClickHandler}>Close</button>
      </div>
      <div>
        <p>
          Production:
          <strong>{municipality.totalEnergyGeneration} TJ</strong>
        </p>
        <ol>
          <li
            in:fade={{ duration: 200 }}
            key="wind"
            id="wind"
            class="productionTile"
            class:active={municipality.windEnergyGeneration}>
            <img src="/wind.svg" alt="Wind icon" />
          </li>
          <li
            in:fade={{ duration: 200 }}
            key="wind"
            id="solar"
            class="productionTile"
            class:active={municipality.solarEnergyGeneration}>
            <img src="/solar-filled.svg" alt="Solar icon" />
          </li>
          <li
            in:fade={{ duration: 200 }}
            key="wind"
            id="biogas"
            class="productionTile"
            class:active={municipality.biogasEnergyGeneration}>
            <img src="/biogas.svg" alt="Biogas icon" />
          </li>
        </ol>
      </div>
    {/await}
  </div>
{/if}
