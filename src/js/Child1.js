import * as d3 from "d3";

export function generateMiniBarChart(data, modelName, color) {

  const tooltip = d3.select("#tooltip");
  const margin = { top: 10, right: 10, bottom: 20, left: 30 };
  const width = 200 - margin.left - margin.right;
  const height = 100 - margin.top - margin.bottom;


  tooltip.select("svg").remove();

  console.log(data)
  const formattedData = data.map((d) => ({
    date: new Date(d["data"].Date),
    count: +d["data"][modelName],
  }));
  console.log(formattedData)

  const x = d3
    .scaleBand()
    .domain(formattedData.map((d) => d.date))
    .range([0, width])
    .padding(0.1);

  const y = d3
    .scaleLinear()
    .domain([d3.min(formattedData, (d) => d.count), d3.max(formattedData, (d) => d.count)])
    .range([height, 0]);


  const svg = tooltip
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);


  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b %Y")).tickSize(0))
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-0.8em")
    .attr("dy", "0.15em")
    .attr("transform", "rotate(-40)");


  svg.append("g").call(d3.axisLeft(y).ticks(3));


  svg
    .selectAll(".bar")
    .data(formattedData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => x(d.date))
    .attr("y", (d) => y(d.count))
    .attr("width", x.bandwidth())
    .attr("height", (d) => height - y(d.count))
    .attr("fill", color);

  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", -5)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .style("font-weight", "bold")
    .text(`${modelName} Usage`);
}

