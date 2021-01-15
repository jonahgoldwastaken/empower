<script>
  export let energyType = 'solar'
  export let amount = 0
  export let background = 'green'
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
    height: calc(12 * var(--step-0));
    flex-grow: 2;
    margin-right: var(--step-0);
  }

  article:nth-child(2) {
    margin-left: var(--step-0);
  }

  article:nth-child(4) {
    margin-right: 0;
  }

  img {
    grid-column: 2;
    grid-row: 1;
    width: calc(3 * var(--step-0));
    height: calc(3 * var(--step-0));
    object-fit: contain;
    justify-self: end;
  }

  strong {
    grid-column: 1;
    grid-row: 1;
    font-size: var(--step-5);
  }

  p {
    font-size: var(--step-0);
    grid-column: span 2;
    align-self: end;
    margin: 0;
  }
</style>

<article style="--bg: var(--{background})">
  <img src="{energyType}.svg" alt="{energyType} icon" />
  <strong>{amount}</strong>
  <p>Average kWp proceeds per {energyType} project</p>
</article>
