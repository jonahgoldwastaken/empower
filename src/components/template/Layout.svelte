<script>
  import Header from '../molecules/Header.svelte'
</script>

<style>
  div {
    position: fixed;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: grid;
    grid-template-columns: 3rem 1fr;
    grid-template-areas: 'header main';
    grid-template-rows: 100vh;
  }
</style>

<div>
  <Header />
  <slot />
</div>
