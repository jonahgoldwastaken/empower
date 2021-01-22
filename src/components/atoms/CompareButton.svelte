<script>
  import { comparingMunicipalities } from '../../store/municipality'
  export let municipality

  $: checked = $comparingMunicipalities.find(
    d => d.municipality === municipality.municipality
  )

  function changeHandler() {
    comparingMunicipalities.update(val => {
      const index = val.findIndex(
        d => municipality.municipality === d.municipality
      )
      if (index < 0 && val.length < 3) return [...val, municipality]
      else if (index > -1 && val.length <= 3)
        return index === 0
          ? [...val.slice(index + 1)]
          : [...val.slice(0, index), ...val.slice(index + 1)]
    })
  }
</script>

<style>
  label {
    display: inline-block;
    
    position: relative;
    border: 1.5px solid var(--text-primary);
    color: var(--text-primary);
    box-shadow: var(--very-light-box-shadow);
    font-size: var(--step--2);
    line-height: 1;
    padding: 0.2em;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;
    user-select: none;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    align-self: start;
    justify-self: end;
  }

  label:hover {
    border-color: var(--black);
    color: var(--black);
  }

  .checked {
    background: var(--orange);
    border-color: var(--orange);
    color: var(--text-secondary);
  }

  .checked:hover {
    background: var(--white);
    border-color: var(--orange);
    color: var(--orange);
  }

  input {
    position: absolute;
    appearance: none;
    pointer-events: none;
  }
</style>

<label on:click={e => e.stopPropagation()} class:checked>
  {checked ? 'Remove' : 'Compare'}
  <input
    on:click={e => e.stopPropagation()}
    on:change|stopPropagation={changeHandler}
    type="checkbox"
    {checked}
  />
</label>
