<script>
  export let name = 'input'
  export let value = 'value'
</script>

<style>
  label {
    font-size: var(--step-0);
  }

  input {
    appearance: none;
    font-size: inherit;
    padding: 0.5em 1.125em;
    position: relative;
    border: none;
    border-bottom: 2px solid transparent;
    background: white;
  }

  input:focus {
    outline: none;
    border-color: var(--orange);
  }

  div {
    display: flex;
    height: min-content;
    width: min-content;
    border-radius: 0.5rem;
    overflow: hidden;
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
    color: var(--white);
  }
</style>

<label for={name}>
  <slot />
</label>
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
    {name}
    bind:value />
  {#if $$slots.after}
    <span>
      <slot name="after" />
    </span>
  {/if}
</div>
