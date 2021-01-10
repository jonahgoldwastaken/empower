<script>
  export let name = 'toggle'

  let value = 1
  let div
  let labelOne
  let labelTwo

  $: checkedBgWidth =
    value === 1 ? labelOne?.offsetWidth : labelTwo?.offsetWidth
  $: checkedBgLeft = value === 1 ? labelOne?.offsetLeft : labelTwo?.offsetLeft
  $: console.log(labelOne?.offsetLeft)
</script>

<style>
  div {
    position: relative;
    display: flex;
    width: max-content;
    box-shadow: var(--light-box-shadow);
    border-radius: 1rem;
    overflow: hidden;
    background: var(--light-grey);
  }

  div:before {
    content: '';
    background: var(--orange);
    position: absolute;
    top: 0%;
    bottom: 0%;
    left: var(--checked-bg-left);
    width: var(--checked-bg-width);
    transition: all 0.2s ease-in-out;
    z-index: 0;
  }

  label {
    position: relative;
    z-index: 1;
    display: block;
    padding: 0.625rem 0.75rem;
    font-size: var(--step-0);
    color: var(--dark-grey);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  label:first-of-type {
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
    border-right: 1px solid var(--text-secondary);
  }

  label:last-of-type {
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    border-left: 1px solid var(--text-secondary);
  }

  input {
    all: unset;
    user-select: none;
    pointer-events: none;
  }

  input:checked + label {
    color: var(--white);
  }
</style>

<div
  bind:this={div}
  style="--checked-bg-width: {checkedBgWidth}px; --checked-bg-left: {checkedBgLeft}px;">
  <input
    type="radio"
    {name}
    id={name + 'one'}
    value={1}
    checked
    bind:group={value} />
  <label bind:this={labelOne} for={name + 'one'}>
    <slot name="labelOne" />
  </label>
  <input type="radio" {name} id={name + 'two'} value={2} bind:group={value} />
  <label bind:this={labelTwo} for={name + 'two'}>
    <slot name="labelTwo" />
  </label>
</div>
