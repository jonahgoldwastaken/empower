<script>
  import barchart from '../../actions/barchart.js'
</script>

<svg
  use:barchart={[{ name: 'hi', value: 20 }, { name: 'bye', value: 90 }]} />
