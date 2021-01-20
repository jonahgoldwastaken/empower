<script>
  export let name
  export let options
  export let value
</script>

<style>
  label {
    display: block;
    width: min-content;
    font-size: var(--step--1);
    position: relative;
  }

  label::after {
    content: '';
    background: url(/down-arrow-black.svg) no-repeat center/contain;
    position: absolute;
    right: calc(0.75 * var(--step--1));
    bottom: calc(0.55 * var(--step--1));
    width: var(--step--2);
    height: var(--step--1);
    pointer-events: none;
  }

  select {
    appearance: none;
    border: none;
    display: block;
    margin-top: 0.25em;
    font-size: var(--step--1);
    padding: 0.5em;
    padding-right: 2.5em;
    border-radius: 0.5rem;
    background: white;
  }
</style>

<label>
  <slot />
  <select {name} bind:value>
    {#each options as option (option.value)}
      <option value={option.value}>{option.name}</option>
    {/each}
  </select>
</label>
