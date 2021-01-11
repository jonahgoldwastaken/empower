<script>
  export let municipality
  $: alt = 'Coat of arms of municipality: ' + municipality
</script>

<style>
  img {
    display: block;
    width: 100%;
    max-height: 100%;
    grid-row: 1 / span 2;
    grid-column: 1 / span 1;
    object-fit: contain;
    align-self: center;
  }
</style>

<img
  src="{window.location.origin}/api/arms?municipality={municipality}"
  {alt} />
