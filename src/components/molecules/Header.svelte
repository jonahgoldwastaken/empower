<script>
  import { link } from 'svelte-routing'
  import { comparingMunicipalities } from '../../store/municipality'
</script>

<style>
  header {
    grid-area: header;
    background: var(--dark-green);
  }

  nav {
    display: block;
    margin-top: 2.5rem;
  }

  a {
    box-sizing: border-box;
    display: block;
    padding: 0.5em;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 100%;
    height: 100%;
  }

  .active {
    background: rgba(255, 255, 255, 0.3);
    border-left: 4px solid var(--white);
  }

  .active img {
    margin-left: -2px;
  }

  .disabled {
    cursor: not-allowed;
  }

  .disabled img {
    opacity: 0.3;
  }
</style>

<header>
  <nav>
    <a
      class:active={window.location.pathname === '/preview'}
      use:link
      href="/preview">
      <img src="/map.svg" alt="Go to the municipality map" />
    </a>
    <a
      class:active={window.location.pathname.includes('compare')}
      use:link
      class:disabled={$comparingMunicipalities.length <= 1}
      href={$comparingMunicipalities.length > 1
        ? `/compare/${$comparingMunicipalities
            .map(({ municipality }) => municipality)
            .join('/')}`
        : ''}>
      <img src="/compare.svg" alt="Go to the compare page" />
    </a>
  </nav>
</header>
