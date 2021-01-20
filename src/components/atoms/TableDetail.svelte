<style>
  td {
    font-size: var(--step-0);
    border: 1px solid var(--light-grey);
    text-align: center;
    vertical-align: middle;
    color: var(--black);
    font-weight: 400;
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
    padding: 1em;
    font-weight: 400;
  }
</style>

<td {...$$restProps}>
  <slot />
</td>
