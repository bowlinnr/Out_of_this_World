class LineChart {

  /**
   * Class constructor with basic chart configuration
   * @param {Object}
   * @param {Array}
   */
  constructor(_config, _data, _graphData) {
    this.config = {
      parentElement: _config.parentElement,
      containerWidth: _config.containerWidth || 800,
      containerHeight: _config.containerHeight || 240,
      margin: _config.margin || {top: 25, right: 50, bottom: 30, left: 50}
    }
    this.data = _graphData;
    //console.log('Line Chart Data Check')
    //console.log(this.data)
    this.initVis();
  }
  
  /**
   * Initialize scales/axes and append static chart elements
   */
  initVis() {
    let vis = this;
    //console.log(vis.data);

    vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
    vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

    vis.xScale = d3.scaleLinear()
        .range([0, vis.width]);

    vis.yScale = d3.scaleLinear()
        .range([vis.height, 0]);

    // Initialize axes
    vis.xAxis = d3.axisBottom(vis.xScale)
        .ticks(31)
        .tickSizeOuter(0)
        .tickPadding(10)
        .tickFormat(d3.format('d'));

    vis.yAxis = d3.axisLeft(vis.yScale)
        .ticks(4)
        .tickSizeOuter(0)
        .tickPadding(10);

    // Define size of SVG drawing area
    vis.svg = d3.select(vis.config.parentElement)
        .attr('width', vis.config.containerWidth)
        .attr('height', vis.config.containerHeight);



    // Append group element that will contain our actual chart (see margin convention)
    vis.chart = vis.svg.append('g')
        .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

    // Append empty x-axis group and move it to the bottom of the chart
    vis.xAxisG = vis.chart.append('g')
        .attr('class', 'axis x-axis')
        .attr('transform', `translate(0,${vis.height})`)
        //.call(vis.xAxis)
        //.selectAll("text")
        //console.log("SelectAll Log")
        //console.log(vis.xAxisG.selectAll("text"));
        //.attr("font-size", 20)
        //.attr("y", 0,)
        //.attr("x", 9)
        //.attr("dy", ".35em")
        //.attr("transform", "rotate(40)")
        //.style("text-anchor", "start");
        
        
    
    // Append y-axis group
    vis.yAxisG = vis.chart.append('g')
        .attr('class', 'axis y-axis');

    // We need to make sure that the tracking area is on top of other chart elements
    vis.marks = vis.chart.append('g');
    vis.trackingArea = vis.chart.append('rect')
        .attr('width', vis.width)
        .attr('height', vis.height)
        .attr('fill', 'none')
        .attr('pointer-events', 'all');

        //(event,d) => {

    // Empty tooltip group (hidden by default)
    vis.tooltip = vis.chart.append('g')
        .attr('class', 'tooltip')
        .style('display', 'none');

    vis.tooltip.append('circle')
        .attr('r', 4);

    vis.tooltip.append('text');
  }

  /**
   * Prepare the data and scales before we render it.
   */
  updateVis() {
    let vis = this;
    
    vis.xValue = d => d.xValue;
    vis.yValue = d => d.yValue;

    vis.line = d3.line()
        .x(d => vis.xScale(vis.xValue(d)))
        .y(d => vis.yScale(vis.yValue(d)));

    // Set the scale input domains
    vis.xScale.domain(d3.extent(vis.data, vis.xValue));
    vis.yScale.domain(d3.extent(vis.data, vis.yValue));

    //vis.bisectDate = d3.bisector(vis.xValue).left;
    vis.renderVis();

  }

  /**
   * Bind data to visual elements
   */
  renderVis() {
    let vis = this;

    // Add line path
    vis.marks.selectAll('.chart-line')
        .data([vis.data])
        .join('path')
        .attr('class', 'chart-line')
        .attr('d', vis.line);

    vis.trackingArea
        .on('mouseenter', () => {
          vis.tooltip.style('display', 'block');
        })
        .on('mouseleave', () => {
          vis.tooltip.style('display', 'none');
        })
        .on('mousemove', function(event) {
          // Get date that corresponds to current mouse x-coordinate
          const xPos = d3.pointer(event, this)[0]; // First array element is x, second is y
          const year = vis.xScale.invert(xPos);
          

          //Find nearest data point
          //const index = d3.bisector(vis.data, year, 1);
          //console.log(index);
          //const a = vis.data[index - 1];
          //console.log('a')
          //console.log(a)
          //const b = vis.data[index];
          //console.log('b')
          //console.log(b)
          //const d = b && (year - a.year > b.year - year) ? b : a;
          //console.log('d')
          //console.log(d)
          //const d = vis.data[30]
          //console.log('d')
          //console.log(d)
          

          //Update tooltip
          //vis.tooltip.select('circle')
          //    .attr('transform', `translate(${vis.xScale(d.xValue)},${vis.yScale(d.yValue)})`)
          //    console.log("Just made a circle.  Performing dcheck")
          //    console.log(d);
          
          //vis.tooltip.select('text')
          //    .attr('transform', `translate(${vis.xScale(d.xValue)},${(vis.yScale(d.yValue) - 15)})`)
          //    .text(Math.round(d.yValue))
          //    console.log(Math.round(d.yValue));

        });
    
    // Update the axes
    vis.xAxisG.call(vis.xAxis);
    vis.yAxisG.call(vis.yAxis);

    vis.xAxisG.selectAll("text")
        .attr("transform", "translate(-10,10)rotate(-45)")
        .attr("y", 0,)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(40)")
        .style("text-anchor", "start");
        //console.log("SelectAll Log")
        //console.log(vis.xAxisG.selectAll("text"));
  }
}