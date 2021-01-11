<script>
  import { searchQuery } from '../../store/municipality'
</script>

<style>
  input {
    appearance: none;
    display: block;
    width: 100%;
    font-size: var(--step-0);
    padding: 0.6em;
    border: 1px solid var(--dark-grey);
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    background: white;
    transition: border 0.1s ease-in-out;
  }

  input:focus {
    outline: none;
    border-color: var(--orange);
  }

  div {
    box-sizing: border-box;
    font-size: var(--step-0);
    height: calc(var(--step-0) * 2);
    display: flex;
    width: 100%;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
  }

  img {
    box-sizing: border-box;
    display: block;
    object-fit: contain;
    font-size: inherit;
    padding: 0.5em 0.5em;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    background: var(--green);
  }
</style>

<div>
  <img src="/search-icon.png" alt="Magnifying glass" />
  <input
    type="text"
    placeholder="Maastricht"
    name="search"
    bind:value={$searchQuery} />
</div>
