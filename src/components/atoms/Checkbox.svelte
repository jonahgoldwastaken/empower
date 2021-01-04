<script>
  export let name = 'checkbox'
  export let value = 'checkbox'
</script>

<style>
  label {
    font-size: var(--step-0);
    display: flex;
    align-items: center;
  }

  input {
    appearance: none;
    display: inline-block;
    margin-right: 0.5rem;
    position: relative;
    font-size: inherit;
    border: 1px solid var(--dark-grey);
    border-radius: 5px;
    width: 1em;
    height: 1em;
    transition: all 0.2s ease-in-out;
  }

  input:checked {
    border-color: var(--orange);
  }

  input:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: calc(5px * 0.65);
    width: 0.65em;
    height: 0.65em;
    background: transparent;
    transition: all 0.2s ease-in-out;
  }

  input:checked:before {
    background: var(--orange);
  }
</style>

<label>
  <input type="checkbox" {name} bind:value />
  <slot />
</label>
