<script>
  import { afterUpdate } from 'svelte'
  import { select } from 'd3'

  let svg: SVGElement

  afterUpdate(() => {
    if (svg)
      select(svg)
        .attr('width', 960)
        .append('text')
        .attr('x', 30)
        .attr('y', 40)
        .text('Hi there')
        .attr('fill', 'black')
    // .attr('transform', 'rotate(0)')
    // .transition()
    // .duration(400)
    // .attr('transform', 'rotate(360)')
  })
</script>

<svg bind:this={svg} viewBox="0 0 960 540" />
