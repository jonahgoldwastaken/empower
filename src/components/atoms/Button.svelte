<style>
  button {
    appearance: none;
    border: none;
    padding: 0.5rem 2.75rem;
    color: var(--white);
    background-color: var(--orange);
    border-radius: 0.75rem;
    font-size: var(--step-0);
    cursor: pointer;
    border: 1px solid transparent;
    box-shadow: var(--light-box-shadow);
    transition: all 0.2s ease-in-out;
  }

  button:hover {
    border-color: var(--orange);
    background-color: var(--white);
    color: var(--orange);
  }
</style>

<button on:click>
  <slot />
</button>
