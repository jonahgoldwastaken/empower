<script>
  import Button from './Button.svelte'
</script>

<style>
  div {
    box-sizing: border-box;
    position: relative;
    height: 100%;
    width: 100%;
    z-index: 1;
    padding: var(--step-1);
    display: flex;
    flex-direction: column;
    border-radius: 0.75rem;
    overflow: hidden;
  }

  h3 {
    margin-top: 0;
    font-size: var(--step-3);
    font-weight: 500;
    font-family: 'DIN Alternate', sans-serif;
    color: var(--text-secondary);
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    object-fit: cover;
    filter: hue-rotate(-220deg) saturate(0.6) brightness(1);
    z-index: -1;
  }

  div :global(a) {
    margin-top: auto;
    margin-bottom: auto;
    align-self: center;
    font-size: var(--step-3);
  }
</style>

<div>
  <h3>Improve your statistics!</h3>
  <Button href="https://northsearegion.eu/empower-20/">
    Make your municipality greener
  </Button>
  <img tabindex="-1" src="/windmills.jpg" alt="Wind mills" />
</div>
