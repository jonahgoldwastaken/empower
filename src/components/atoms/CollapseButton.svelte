<script>
  export let checked
</script>

<style>
  label {
    display: block;
    position: relative;
    width: 1em;
    height: 1em;
    font-size: var(--step-1);
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  input {
    position: absolute;
    appearance: none;
    pointer-events: none;
  }

  input:not(:checked) + img {
    transform: rotate(90deg);
  }
</style>

<label>
  <input type="checkbox" bind:checked />
  <img src="/down-arrow-black.svg" alt={$$slots.default} />
</label>
