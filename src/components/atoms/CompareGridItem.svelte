<script>
  export let area = ''
</script>

<style>
  section {
    grid-area: var(--area);
    border-radius: 0.75rem;
    background: var(--white);
    padding: calc(1.5 * var(--step-0));
  }
</style>

<section style="--area: {area}">
  <slot />
</section>
