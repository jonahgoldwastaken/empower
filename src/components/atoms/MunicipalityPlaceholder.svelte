<style>
  li {
    box-sizing: border-box;
    height: calc(2 * var(--step-2) + 3 * var(--step-1) + 4px);
    width: 100%;
    background: var(--white);
    border: 2px dashed var(--dark-grey);
    font-size: var(--step-1);
    text-align: center;
    line-height: calc(2 * var(--step-2) + 3 * var(--step-1));
    border-radius: 0.75rem;
    box-shadow: var(--light-box-shadow);
  }
  li:not(:last-child) {
    margin-bottom: var(--step-1);
  }
</style>

<li>
  <slot />
</li>
