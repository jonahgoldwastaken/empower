<style>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: calc(1.5 * var(--step-0));
  }
</style>

<ul>
  <slot />
</ul>
