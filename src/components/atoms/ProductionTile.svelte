<script>
  export let active
  export let small
  export let type
</script>

<style>
  li {
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

  li:not(:last-child) {
    margin-right: 1rem;
  }

  li.small {
    width: var(--step-4);
    height: var(--step-4);
    border-radius: 0.25rem;
    padding: 0.25rem;
  }

  li.small:not(:last-child) {
    margin-right: 0.5em;
  }

  .wind.active {
    border: none;
    background: var(--blue);
  }

  .solar.active {
    border: none;
    background: var(--yellow);
    padding: 0.3rem;
  }

  .biogas.active {
    border: none;
    background: var(--green);
  }

  img {
    width: 100%;
    height: 100%;
  }
</style>

<li class={type} class:active class:small>
  <img src="/{type}.svg" alt={type} />
</li>
