<script>
  export let gradient: boolean = false
</script>

<style>
  button {
    appearance: none;
    border: none;
    padding: 0.5rem 2.75rem;
    color: var(--white);
    background-color: var(--orange);
    border-radius: calc((var(--step-0) + 0.5rem));
    font-size: var(--step-0);
    cursor: pointer;
    border: 1px solid transparent;
    box-shadow: var(--light-box-shadow);
    /* transition: all 0.2s ease-in-out; */
  }

  button:hover {
    border-color: var(--orange);
    background-color: transparent;
    color: var(--orange);
  }

  .gradient {
    background-color: transparent;
    background-image: linear-gradient(
      to bottom right,
      var(--orange),
      var(--light-orange)
    );
  }

  .gradient:hover {
    background-image: linear-gradient(transparent, transparent);
  }
</style>

<button class:gradient on:click>
  <slot />
</button>
