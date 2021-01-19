<script>
  import { get } from 'svelte/store'
  import { comparingMunicipalities } from '../../store/municipality'
  export let municipality

  $: checked = $comparingMunicipalities.find(
    d => d.municipality === municipality.municipality
  )

  function changeHandler() {
    const currentComparingMunicipalities = get(comparingMunicipalities)
    const index = currentComparingMunicipalities.findIndex(
      d => municipality.municipality === d.municipality
    )
    if (index < 0 && currentComparingMunicipalities.length < 3)
      comparingMunicipalities.set([
        ...currentComparingMunicipalities,
        municipality,
      ])
    else if (index > -1 && currentComparingMunicipalities.length <= 3)
      comparingMunicipalities.set(
        index === 0
          ? [...currentComparingMunicipalities.slice(index + 1)]
          : [
              ...currentComparingMunicipalities.slice(0, index),
              ...currentComparingMunicipalities.slice(index + 1),
            ]
      )
  }
</script>

<style>
  label {
    display: inline-block;
    box-sizing: border-box;
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

<label class:checked>
  {checked ? 'Remove' : 'Compare'}
  <input on:change={changeHandler} type="checkbox" {checked} />
</label>
