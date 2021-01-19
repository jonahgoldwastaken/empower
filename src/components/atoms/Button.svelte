<script>
  import { link } from 'svelte-routing'
  export let href = ''
</script>

<style>
  a {
    text-decoration: none;
  }

  button {
    appearance: none;
  }

  button,
  a {
    border: 1px solid transparent;
    border-radius: 0.75rem;
    padding: 0.75em;
    background-color: var(--orange);
    color: var(--text-secondary);
    font-size: var(--step-0);
    font-weight: bold;
    line-height: 1;
    cursor: pointer;
    box-shadow: var(--light-box-shadow);
    transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
      color 0.2s ease-in-out;
  }

  button:hover,
  a:hover {
    border-color: var(--orange);
    background-color: var(--text-secondary);
    color: var(--orange);
  }
</style>

{#if href && href[0] === '/'}
  <a {href} use:link>
    <slot />
  </a>
{:else if href}
  <a {href} target="_blank" rel="noopener noreferrer">
    <slot />
  </a>
{:else}
  <button on:click>
    <slot />
  </button>
{/if}
