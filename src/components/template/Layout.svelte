<script>
  import Header from '../molecules/Header.svelte'
  import Sidebar from '../molecules/Sidebar.svelte'
</script>

<style>
  div {
    position: fixed;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100vh;
    display: grid;
    overflow: hidden;
    grid-template-columns: 3rem max(25rem, min(30rem, 30%)) 1fr;
    grid-template-areas: 'header sidebar main';
    grid-template-rows: 1fr;
  }

  main {
    overflow: hidden scroll;
    grid-area: main;
  }

  main:nth-child(2) {
    grid-column: 2 / span 2;
  }
</style>

<div>
  <Header />
  {#if $$slots.sidebar}
    <Sidebar>
      <slot name="sidebar" />
    </Sidebar>
  {/if}
  <main>
    <slot name="main" />
  </main>
  <slot />
</div>
