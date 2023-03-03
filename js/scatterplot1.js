class Scatterplot {
  @param {Object}
  @param {Array}

  constructor(_config, _data, _graphData) {
    this.config = {
      parentElement: _config.parentElement,
      containerWidth: _config.containerWidth || 600,
      containerHeight: _config.containerHeight || 400,
      margin: _config.margin || {top: 25, right: 20, bottom: 20, left: 35},
      tooltipPadding: _config.tooltipPadding || 15
    }
    this.data = _graphData;
    this.initVis();
  }

  initVis() {
    let vis = this;

    vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
    vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

    vis.xScale = d3.scaleLinear()
      .range([0, vis.width]);

    vis.yScale = d3.scaleLinear()
      .range([vis.height, 0]);

    vis.xAxis = d3.axisBottom(vis.xScale)
      .ticks(6)
      .tickSize(-vis.height - 10)
      .tickPadding(10)
      .tickFormat(d => d);
      
    vis.yAxis = d3.axisLeft(vis.yScale)
      .ticks(6)
      .tickSize(-vis.width - 10)
      .tickPadding(10);
  }
  updateVis() {
  }
  
}