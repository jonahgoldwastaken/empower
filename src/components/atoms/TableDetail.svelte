<style>
  td {
    font-size: var(--step-0);
    border: 1px solid var(--light-grey);
    text-align: center;
    vertical-align: middle;
    color: var(--orange);
    padding: 1.125em 2.5em;
  }

  td:last-child {
    border-right: none;
  }

  :global(td[scope='col']) {
    border: none;
  }

  :global(td[scope='row']) {
    color: var(--text-primary);
    text-align: left;
    border-left: none;
    padding: 1.125em 1em;
  }
</style>

<td {...$$restProps}>
  <slot />
</td>
