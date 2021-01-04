<script>
  import { Link } from 'svelte-routing'
  import Button from '../components/atoms/Button.svelte'
  import Toggle from '../components/atoms/Toggle.svelte'
  import BarChart from '../components/atoms/BarChart.svelte'
  import TextInput from '../components/atoms/TextInput.svelte'
  import Checkbox from '../components/atoms/Checkbox.svelte'
</script>

<h1>hoi</h1>
<Link to="/test">To test</Link>
<Button>Hoi</Button>
<Button gradient>Hoi</Button>
<Toggle>
  <slot slot="labelOne">Per citizen</slot>
  <slot slot="labelTwo">Total</slot>
</Toggle>
<TextInput>
  How much munnie do you need?
  <slot slot="before">€</slot>
  <slot slot="after">m3</slot>
</TextInput>
<Checkbox>I don't want to see my usage</Checkbox>
<BarChart />
