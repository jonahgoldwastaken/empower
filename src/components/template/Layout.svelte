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
    height: 100%;
    display: grid;
    overflow: hidden;
    grid-template-columns: max(20rem, min(40rem, 25%)) 1fr;
    grid-template-rows: min-content 1fr;
  }

  main {
    grid-row: 2;
    grid-column: 2;
    width: 100%;
    height: 100%;
    overflow: hidden scroll;
  }
</style>

<div>
  <Header />
  <Sidebar>
    <slot name="sidebar" />
  </Sidebar>
  <main>
    <slot name="main" />
  </main>
</div>
