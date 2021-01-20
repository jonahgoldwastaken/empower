<style>
  th {
    font-size: var(--step-0);
    padding: 0.75em 1em;
    border: 1px solid var(--light-grey);
    color: var(--orange);
    border-top: none;
    text-align: center;
    vertical-align: middle;
    font-weight: 400;
  }

  th:last-child {
    border-right: none;
  }
</style>

<th {...$$restProps}>
  <slot />
</th>
