<script>
  export let color = ''
</script>

<style>
  li {
    margin-top: 0.5em;
    --color: '';
    font-size: var(--step-0);
  }

  li:before {
    content: '';
    display: inline-block;
    border-radius: 0.125em;
    height: 0.75em;
    width: 1.5em;
    margin-right: 1.125em;
    vertical-align: middle;
    background: var(--color);
  }
</style>

<li style="--color: var(--{color})"><slot /></li>
