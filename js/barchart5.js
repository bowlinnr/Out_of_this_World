class Barchart5 {

  /**
   * Class constructor with basic chart configuration
   * @param {Object}
   * @param {Array}
   */
  constructor(_config, _data, _graphData) {
    // Configuration object with defaults
    this.config = {
      parentElement: _config.parentElement,
      containerWidth: _config.containerWidth || 710,
      containerHeight: _config.containerHeight || 200,
      margin: _config.margin || {top: 10, right: 5, bottom: 25, left: 60},
      reverseOrder: _config.reverseOrder || false,
      tooltipPadding: _config.tooltipPadding || 15
    }
    this.data = _data;
    this.graphData = _graphData;

    //console.log("GraphData Check:")
    //console.log(this.graphData[0].numStars);



    this.initVis();
  }
  
  /**
   * Initialize scales/axes and append static elements, such as axis titles
   */
  initVis() {
    let vis = this;

    // Calculate inner chart size. Margin specifies the space around the actual chart.
    vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
    vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

    // Initialize scales and axes
    // Important: we flip array elements in the y output range to position the rectangles correctly
    vis.yScale = d3.scaleLinear()
        .range([vis.height, 0]) 

    vis.xScale = d3.scaleBand()
        .range([0, vis.width])
        .paddingInner(0.2);

    vis.colorPalette = d3.scaleOrdinal()
      .range(['#3170A9', '#BD0909'])
      .domain(['Yes','No']);
    


    vis.xAxis = d3.axisBottom(vis.xScale)
        .tickSizeOuter(0);

    vis.yAxis = d3.axisLeft(vis.yScale)
        .ticks(4)
        .tickSizeOuter(0)
        .tickFormat(d3.format('d')); // Format y-axis ticks as millions

    // Define size of SVG drawing area
    vis.svg = d3.select(vis.config.parentElement)
        .attr('width', vis.config.containerWidth)
        .attr('height', vis.config.containerHeight);

    // SVG Group containing the actual chart; D3 margin convention
    vis.chart = vis.svg.append('g')
        .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

    // Append empty x-axis group and move it to the bottom of the chart
    vis.xAxisG = vis.chart.append('g')
        .attr('class', 'axis x-axis')
        .attr('transform', `translate(0,${vis.height})`)
        //.call(vis.xAxis)
        //.selectAll("text")
        //.attr("y", 0,)
        //.attr("x", 9)
        //.attr("dy", ".35em")
        //.attr("transform", "rotate(40)")
        //.style("text-anchor", "start");
    

    // Append y-axis group 
    vis.yAxisG = vis.chart.append('g')
        .attr('class', 'axis y-axis');
  }

  /**
   * Prepare data and scales before we render it
   */
  updateVis() {
    let vis = this;

    // Reverse column order depending on user selection
    if (vis.config.reverseOrder) {
      vis.graphdata.reverse();
    }

    // Specificy x- and y-accessor functions
    vis.xValue = d => d.xValue;
    vis.yValue = d => d.yValue;


    // Set the scale input domains
    
    //ORIG SCALES
    vis.xScale.domain(vis.graphData.map(vis.xValue));
    vis.yScale.domain([0, 2000]);

    vis.renderVis();
  }

  /**
   * Bind data to visual elements
   */
  renderVis() {
    let vis = this;

    //console.log(vis.graphData)

    // Add rectangles
    let bars = vis.chart.selectAll('.bar1')
        .data(vis.graphData)
      .join('rect');

    
    bars.style('opacity', 0.5)
      .transition().duration(1000)
        .style('opacity', 1)
        .attr('class', 'barCustom')
        .attr('x', d => vis.xScale(vis.xValue(d)))
        .attr('width', vis.xScale.bandwidth())
        .attr('height', d => vis.height - vis.yScale(vis.yValue(d)))
        .attr('fill', d => vis.colorPalette(vis.xValue(d)))
        //.attr('height', function heightFunction(d,i)
        //                {
        //                  vis.height - vis.yScale(vis.yValue(d[i].freq))
        //                  console.log(d[i].freq) 
        //                 return 0;
        //                })
        .attr('y', d => vis.yScale(vis.yValue(d)));
    
    // Tooltip event listeners
    bars
        .on('mouseover', (event,d) => {
          d3.select('#tooltip')
            .style('opacity', 1)
            // Format number with million and thousand separator
            .html(`<div class="tooltip-label">Frequency</div>${d3.format(',')(d.yValue)}`);
        })
        .on('mousemove', (event) => {
          d3.select('#tooltip')
            .style('left', (event.pageX + vis.config.tooltipPadding) + 'px')   
            .style('top', (event.pageY + vis.config.tooltipPadding) + 'px')
        })
        .on('mouseleave', () => {
          d3.select('#tooltip').style('opacity', 0);
        });

    // Update axes
    vis.xAxisG
        .transition().duration(1000)
        .call(vis.xAxis);

    vis.yAxisG.call(vis.yAxis);
  }
}

