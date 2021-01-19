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
    grid-template-columns: max(25rem, min(30rem, 30%)) 1fr;
    grid-template-rows: min-content 1fr;
  }

  main {
    grid-row: span 2;
    overflow: hidden scroll;
    position: relative;
  }

  main:first-child {
    grid-column: span 2;
  }
</style>

<div>
  {#if $$slots.sidebar}
    <Header />
    <Sidebar>
      <slot name="sidebar" />
    </Sidebar>
  {/if}
  <main>
    <slot name="main" />
  </main>
</div>
