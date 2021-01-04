import { select, scaleLinear, scaleBand, axisLeft, axisBottom, max } from 'd3'

export default function (node: SVGElement, data: any[]) {
  const margin = 50
  const size = 540

  const container = select(node)
    .attr('viewBox', `0 0 ${size} ${size}`)
    .attr('xmlns', 'http://w3.org/2000/svg')
    .append('g')
    .attr('id', 'container')

  console.log(max(data, d => d.value))

  const yScale = scaleLinear()
    .domain([0, max(data, d => d.value)])
    .range([size - margin * 2, margin])
    .nice()

  const xScale = scaleBand()
    .domain(data.map(d => d.name))
    .range([margin, size - margin * 2])
    .paddingInner(0.5)
    .paddingOuter(0.5)

  container
    .append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0, ${size - margin * 2})`)
    .call(axisBottom(xScale))
    .selectAll('text')
    .attr('transform', 'translate(0, 0)')
    .style('font-size', 'Roboto, sans-serif')
    .style('font-weight', size - margin * 2)
    .style('text-anchor', 'middle')

  container
    .append('g')
    .attr('id', 'y-axis')
    .attr('transform', `translate(${margin}, 0)`)
    .call(axisLeft(yScale))

  select(node)
    .append('defs')
    .selectAll('clipPath')
    .data(data)
    .join('clipPath')
    .attr('id', d => d.name)
    .append('rect')
    .attr('width', xScale.bandwidth())
    .attr('x', d => xScale(d.name))
    .attr('height', d => size - margin * 2 - yScale(d.value) + 16)
    .attr('y', d => yScale(d.value))
    .attr('rx', '16')

  container
    .append('g')
    .attr('id', 'data-container')
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('width', xScale.bandwidth())
    .attr('x', d => xScale(d.name))
    .attr('height', d => size - margin * 2 - yScale(d.value))
    .attr('y', d => yScale(d.value))
    .attr('fill', '#79c181')
    .attr('clip-path', d => `url(#${d.name})`)
}
