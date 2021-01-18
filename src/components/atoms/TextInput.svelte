<script>
  import Label from './Label.svelte'

  export let name = 'input'
  export let value
  export let placeholder = 'type something here'
</script>

<style>
  input {
    appearance: none;
    font-size: inherit;
    padding: 0.5em 1.125em;
    position: relative;
    border: 1px solid var(--dark-grey);
    border-radius: 0.5rem;
    background: white;
    transition: border 0.1s ease-in-out;
  }

  input:focus {
    outline: none;
    border-color: var(--orange);
  }

  div {
    display: flex;
    height: min-content;
    width: min-content;
    overflow: hidden;
    border-radius: 0.5rem;
    box-shadow: var(--medium-box-shadow);
  }

  .before {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }

  .after {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  span {
    font-size: inherit;
    padding: 0.5em 1.125em;
    background: var(--green);
    color: var(--text-secondary);
  }
</style>

<Label for={name}>
  <slot />
</Label>
<div>
  {#if $$slots.before}
    <span>
      <slot name="before" />
    </span>
  {/if}
  <input
    id={name}
    class:before={$$slots.before}
    class:after={$$slots.after}
    type="text"
    {placeholder}
    {name}
    bind:value />
  {#if $$slots.after}
    <span>
      <slot name="after" />
    </span>
  {/if}
</div>
