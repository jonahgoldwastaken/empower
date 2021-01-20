<script>
  import Sidebar from '../molecules/Sidebar.svelte'
</script>

<style>
  div {
    display: grid;
    grid-template-columns: var(--sidebar-width) 1fr;
    grid-area: main;
    grid-template-areas: 'sidebar main';
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }

  main {
    overflow: hidden;
  }
</style>

<div>
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
