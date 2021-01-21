<script>
  import Loader from '../atoms/Loader.svelte'
  import MapRenderer from '../organs/MapRenderer.svelte'
  import MapTooltip from '../molecules/MapTooltip.svelte'
  import MapLegend from '../molecules/MapLegend.svelte'
  import { width, height, interact, townships } from '../../store/map.js'

  export let legend = false
  export let interaction = true
  let divHeight = 0
  let divWidth = 0

  $: width.set(divWidth)
  $: height.set(divHeight)
  $: interact.set(interaction)
  $: page = window.location.pathname
</script>

<style>
  div {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
</style>

{#await $townships}
  <Loader>Loading map data</Loader>
{:then}
  <div bind:offsetHeight={divHeight} bind:offsetWidth={divWidth}>
    <MapRenderer bind:page />
    {#if $interact}
      <MapTooltip />
    {/if}
    {#if legend}
      <MapLegend />
    {/if}
  </div>
{/await}
