<script>
  export let color = ''
</script>

<style>
  li {
    display: flex;
    margin-top: 0.5em;
    --color: '';
    font-size: var(--step--1);
  }

  li:before {
    content: '';
    display: block;
    border-radius: 0.125em;
    height: 0.75em;
    flex: 0 0 1.5em;
    margin-top: calc(0.25em * 1.5);
    margin-right: 1.125em;
    background: var(--color);
  }
</style>

<li style="--color: var(--{color})">
  <slot />
</li>
