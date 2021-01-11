<style>
  label {
    display: block;
    font-size: var(--step--1);
    margin-bottom: calc(0.25 * var(--step-0));
  }
</style>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label {...$$restProps}>
  <slot />
</label>
