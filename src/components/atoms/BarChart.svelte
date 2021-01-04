<script>
  import barchart from '../../actions/barchart.ts'
</script>

<svg
  use:barchart={[{ name: 'hi', value: 20 }, { name: 'bye', value: 90 }]} />
