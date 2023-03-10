class Scatterplot {

  /**
   * Class constructor with basic chart configuration
   * @param {Object}
   * @param {Array}
   */
  constructor(_config, _data, _graphData) {
    this.config = {
      parentElement: _config.parentElement,
      containerWidth: _config.containerWidth || 600,
      containerHeight: _config.containerHeight || 400,
      margin: _config.margin || {top: 25, right: 20, bottom: 20, left: 50},
      tooltipPadding: _config.tooltipPadding || 15
    }
    this.data = _graphData;
    this.initVis();
  }
  
  /**
   * We initialize scales/axes and append static elements, such as axis titles.
   */
  initVis() {
    let vis = this;

    // Calculate inner chart size. Margin specifies the space around the actual chart.
    vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
    vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

    // Initialize scales
    //vis.colorScale = d3.scaleOrdinal()
    //    .range(['#d3eecd', '#7bc77e', '#2a8d46']) // light green to dark green
    //    .domain(['Easy','Intermediate','Difficult']);

    vis.xScale = d3.scaleLog()
      .range([0, vis.width]);

    vis.yScale = d3.scaleLog()
    .range([vis.height, 0]);

    // Initialize axes
    vis.xAxis = d3.axisBottom(vis.xScale)
        .ticks(6)
        .tickSize(-vis.height - 10)
        .tickPadding(10)
        .tickFormat(d => d);

    vis.yAxis = d3.axisLeft(vis.yScale)
        .ticks(3)
        .tickSize(-vis.width - 10)
        .tickPadding(10)
        .tickFormat(d => d);

    // Define size of SVG drawing area
    vis.svg = d3.select(vis.config.parentElement)
        .attr('width', vis.config.containerWidth)
        .attr('height', vis.config.containerHeight);

    // Append group element that will contain our actual chart 
    // and position it according to the given margin config
    vis.chart = vis.svg.append('g')
        .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

    // Append empty x-axis group and move it to the bottom of the chart
    vis.xAxisG = vis.chart.append('g')
        .attr('class', 'axis x-axis')
        .attr('transform', `translate(0,${vis.height})`);
    
    // Append y-axis group
    vis.yAxisG = vis.chart.append('g')
        .attr('class', 'axis y-axis');

    // Append both axis titles
    vis.chart.append('text')
        .attr('class', 'axis-title')
        .attr('y', vis.height - 15)
        .attr('x', vis.width + 10)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Mass Relative to Earth');

    vis.svg.append('text')
        .attr('class', 'axis-title')
        .attr('x', 0)
        .attr('y', 0)
        .attr('dy', '.71em')
        .text('Radius Relative to Earth');

    // Specificy accessor functions
    vis.colorValue = 50;
    vis.xValue = d => d.xValue;
    vis.yValue = d => d.yValue;

  }

  /**
   * Prepare the data and scales before we render it.
   */
  updateVis() {
    let vis = this;
    
    // Set the scale input domains
    vis.xScale.domain(d3.extent(vis.data, vis.xValue));
    //vis.xScale.domain([0, 5000])
    vis.yScale.domain([1e-1, 100]);

    // Add circles
    vis.circles = vis.chart.selectAll('.point')
        .data(vis.data)
        .join('circle')
        //.attr('class', 'point')
        .attr('r', 4)
        .attr('cy', d => vis.yScale(vis.yValue(d)))
        .attr('cx', d => vis.xScale(vis.xValue(d)))
        .style("fill", "#69b3a2");


    
    // Update the axes/gridlines
    // We use the second .call() to remove the axis and just show gridlines
    vis.xAxisG
        .call(vis.xAxis)
        .call(g => g.select('.domain').remove());

    vis.yAxisG
        .call(vis.yAxis)
        .call(g => g.select('.domain').remove())
  }

}