<script>
  export let checked
</script>

<style>
  label {
    display: inline-block;
    box-sizing: border-box;
    position: relative;
    border: 1.5px solid var(--dark-grey);
    color: var(--dark-grey);
    box-shadow: var(--very-light-box-shadow);
    line-height: 1;
    padding: 0.2em;
    text-align: center;
    border-radius: 0.4em;
    cursor: pointer;
    user-select: none;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    align-self: start;
    justify-self: end;
  }

  label:hover {
    border-color: var(--black);
  }

  .checked {
    background: var(--orange);
    border-color: var(--orange);
    color: var(--white);
  }

  input {
    position: absolute;
    appearance: none;
    pointer-events: none;
  }
</style>

<label class:checked>Compare <input type="checkbox" bind:checked /></label>
