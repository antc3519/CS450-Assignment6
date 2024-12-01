import React, { useState } from 'react';
import * as d3 from 'd3';
import './App.css';
import { generateMiniBarChart } from './js/Child1';

function App() {
  const [data, setData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const parsedData = d3.csvParse(text);
        console.log(parsedData);
        setData(parsedData);
      };
      reader.readAsText(file);
    }
  };

  const renderGraph = () => {
    d3.select("svg").remove()
    if (!data) return;
    
    const svgWidth = 800;
    const svgHeight = 500;
    const margin = { top: 50, right: 150, bottom: 50, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    // Prepare data
    const models = ["GPT-4", "Gemini", "PaLM-2", "Claude", "LLaMA-3.1"];
    const colors = d3.scaleOrdinal()
      .domain(models)
      .range(["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"]);

    const stack = d3.stack()
      .keys(["GPT-4", "Gemini", "PaLM-2", "Claude", "LLaMA-3.1"])
      .offset(d3.stackOffsetWiggle);
    
    const stackedData = stack(data);

    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d.Date)))
      .range([0, width]);

    const yScale = d3.scaleLinear()
    .domain([d3.min(stackedData, layer => d3.min(layer, d => d[0])),
      d3.max(stackedData, layer => d3.max(layer, d => d[1]))])
    .range([height, 0]);

    // Append SVG
    const svg = d3.select("#container")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Draw areas
    const areaGenerator = d3.area()
      .x(d => xScale(new Date(d.data.Date)))
      .y0(d => yScale(d[0]))
      .y1(d => yScale(d[1]))
      .curve(d3.curveBasis);

    g.selectAll("path")
      .data(stackedData)
      .join("path")
      .attr("d", areaGenerator)
      .attr("fill", d => colors(d.key))
      .on("mouseover", (event, d) => showTooltip(event, d,))
      .on("mousemove", moveTooltip)
      .on("mouseout", hideTooltip);

    // Add axes
    const xAxis = d3.axisBottom(xScale).ticks(6);
    const yAxis = d3.axisLeft(yScale);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

    g.append("g")
      .call(yAxis);

    // Add legend
    const legend = svg.append("g")
      .attr("transform", `translate(${width + 60},${margin.top})`);

    models.forEach((key, i) => {
      const legendRow = legend.append("g")
        .attr("transform", `translate(0,${i * 20})`);

      legendRow.append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", colors(key));

      legendRow.append("text")
        .attr("x", 20)
        .attr("y", 12.5)
        .text(key);
    });
  };

  const showTooltip = (event, d) => {
    const tooltip = d3.select("#tooltip");
    tooltip.style("opacity", 1);
    const models = ["GPT-4", "Gemini", "PaLM-2", "Claude", "LLaMA-3.1"];
    const colors = d3.scaleOrdinal()
      .domain(models)
      .range(["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"]);
    generateMiniBarChart(d, d.key, colors(d.key))
  };

  const moveTooltip = (event) => {
    const tooltip = d3.select("#tooltip");
    tooltip.style("left", `${event.pageX + 10}px`)
      .style("top", `${event.pageY + 10}px`);
  };

  const hideTooltip = () => {
    const tooltip = d3.select("#tooltip");
    tooltip.style("opacity", 0);
  };

  return (
    <div className="App">
      <h1>Streamgraph Assignment</h1>
      <div>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
      </div>
      <div id="container">
        {renderGraph()}
      </div>
      <div id="tooltip" style={{ position: 'absolute', opacity: 0, backgroundColor: 'white', padding: '5px', border: '1px solid black' }}></div>
    </div>
  );
}

export default App;
