<style>
  button {
    appearance: none;
    border: none;
    background: none;
    padding: 0;
    margin: 0 0 0 calc(var(--step--1) / 2);
    cursor: pointer;
  }

  img {
    width: var(--step--1);
    height: var(--step--1);
    opacity: 0.25;
    transition: opacity 0.2s ease-in-out;
  }

  button:hover img {
    opacity: 1;
  }
</style>

<button on:click>
  <img src="/cross.svg" alt="Close tooltip" />
</button>
