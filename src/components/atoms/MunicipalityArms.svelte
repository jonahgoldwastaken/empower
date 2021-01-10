<script>
  export let municipality
  $: alt = 'Coat of arms of municipality: ' + municipality

  $: request = fetch(
    `${window.location.origin}/api/arms?municipality=${municipality}`
  ).then(res => res.text())
</script>

<style>
  img {
    display: block;
    width: 100%;
    grid-row: span 2;
    grid-column: 1;
    align-self: center;
  }
</style>

{#await request then src}<img {src} {alt} />{/await}
