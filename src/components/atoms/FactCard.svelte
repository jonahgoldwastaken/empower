<script>
  import IntersectionObserver from 'svelte-intersection-observer'
  import { quintInOut } from 'svelte/easing'
  import { tweened } from 'svelte/motion'

  export let energyType = 'solar'
  export let amount = 0
  export let background = 'green'

  const tweenAmount = tweened(0, {
    duration: 750,
    easing: quintInOut,
  })

  let element
  let intersecting

  $: console.log(intersecting, amount)

  $: intersecting && tweenAmount.set(amount)
</script>

<style>
  article {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    background: var(--bg);
    border-radius: 0.75rem;
    color: var(--white);
    padding: calc(0.75 * var(--step-0));
    height: 100%;
    flex: 0 1 calc(100% / 3);
    margin-bottom: var(--step-0);
  }

  article:nth-child(2) {
    margin-top: var(--step-0);
  }

  article:nth-child(4) {
    margin-bottom: 0;
  }

  img {
    grid-column: 2;
    grid-row: 1;
    width: calc(4 * var(--step-0));
    height: calc(4 * var(--step-0));
    object-fit: contain;
    justify-self: end;
  }

  strong {
    grid-column: 1;
    grid-row: 1;
    font-size: var(--step-5);
  }

  article :global(p) {
    font-size: var(--step-0);
    grid-column: span 2;
    align-self: end;
    margin: 0;
  }

  @media screen and (min-width: 100rem) {
    article {
      margin-top: 0;
      margin-bottom: 0;
      margin-right: var(--step-0);
    }

    article:nth-child(2) {
      margin-top: 0;
      margin-left: var(--step-0);
    }

    article:nth-child(4) {
      margin-bottom: 0;
      margin-right: 0;
    }

    strong {
      font-size: var(--step-5);
    }

    img {
      width: calc(2 * var(--step-0));
      height: calc(2 * var(--step-0));
    }
  }
</style>

<IntersectionObserver {element} bind:intersecting threshold={0.5}>
  <article bind:this={element} style="--bg: var(--{background})">
    <img src="/{energyType}.svg" alt="{energyType} icon" />
    <strong>{$tweenAmount.toFixed(0)}</strong>
    <slot>
      <p>Average kWp proceeds per {energyType} project</p>
    </slot>
  </article>
</IntersectionObserver>
