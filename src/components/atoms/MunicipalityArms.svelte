<script>
  export let municipality
  $: alt = 'Coat of arms of municipality: ' + municipality
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

<img
  src="{window.location.origin}/api/arms?municipality={municipality}"
  {alt} />
