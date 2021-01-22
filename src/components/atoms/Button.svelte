<script>
  import { link } from 'svelte-routing'
  export let href = ''
  export let anchor = ''
  export let center = false
</script>

<style>
  a {
    display: block;
    width: min-content;
    white-space: nowrap;
    text-decoration: none;
  }

  button {
    appearance: none;
  }

  button,
  a {
    
    border: 1px solid transparent;
    padding: 0.75em;
    border-radius: 2px;
    color: var(--text-secondary);
    font-size: var(--step-0);
    font-weight: bold;
    line-height: 1;
    box-shadow: var(--light-box-shadow);
    transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
      color 0.2s ease-in-out;
  }

  button:disabled,
  a.disabled {
    background-color: var(--light-grey) !important;
    cursor: not-allowed;
  }

  button,
  a {
    background-color: var(--orange);
    cursor: pointer;
  }

  button:not(:disabled):hover,
  a:not(.disabled):hover {
    border-color: var(--orange);
    background-color: var(--text-secondary);
    color: var(--orange);
  }

  .center {
    text-align: center;
    margin: auto;
  }
</style>

{#if href || anchor}
  <a class:center class:disabled={!href} {href} use:link>
    <slot />
  </a>
{:else}
  <button class:center on:click>
    <slot />
  </button>
{/if}
