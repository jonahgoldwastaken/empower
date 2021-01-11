<script>
  export let colour
</script>

<style>
  small {
    display: inline-block;
    --background: var(--black);
    font-size: var(--step--2);
    border-radius: 2px;
    padding: 0.2em;
    margin-right: 0.3em;
    line-height: 1;
    background: var(--background);
    color: white;
  }
</style>

<small style="--background: {colour}"><slot /></small>
