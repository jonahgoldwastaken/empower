<script>
  import { Link } from 'svelte-routing'
  import Layout from '../components/organisms/Layout.svelte'
  import Button from '../components/atoms/Button.svelte'
  import Toggle from '../components/atoms/Toggle.svelte'
  import BarChart from '../components/atoms/BarChart.svelte'
  import TextInput from '../components/atoms/TextInput.svelte'
  import Checkbox from '../components/atoms/Checkbox.svelte'
</script>

<Layout>
  <slot slot="main">
    <h1>hoi</h1>
    <Link to="/testroute">To test</Link>
    <Button>Hoi</Button>
    <Button gradient>Hoi</Button>
    <Toggle>
      <slot slot="labelOne">Per citizen</slot>
      <slot slot="labelTwo">Total</slot>
    </Toggle>
    <TextInput>
      How much munnie do you need?
      <slot slot="before">€</slot>
    </TextInput>
    <TextInput>
      How much cubic meter do you take up?
      <slot slot="after">m3</slot>
    </TextInput>
    <Checkbox>I don't want to see my usage</Checkbox>
    <BarChart />
  </slot>
</Layout>
