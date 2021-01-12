<style>
  aside {
    grid-row: 2;
    grid-column: 1;
    background: #f3f3f3;
    padding: var(--step-4) var(--step-2);
    border-right: 1px solid var(--dark-grey);
    overflow-y: scroll;
  }
</style>

<aside>
  <slot />
</aside>
