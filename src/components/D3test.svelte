<script>
  import { onMount } from 'svelte'
  import { select } from 'd3'

  let svg: SVGElement

  onMount(() => {
    if (svg)
      select(svg)
        .attr('width', 960)
        .append('text')
        .attr('x', 30)
        .attr('y', 40)
        .text('Hi there, I am inside an SVG created with D3')
        .attr('fill', 'black')
        .attr('transform', 'rotate(0)')
  })
</script>

<svg bind:this={svg} viewBox="0 0 960 540" />
