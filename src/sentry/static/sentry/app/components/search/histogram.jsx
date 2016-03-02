import React from 'react';
import Reflux from 'reflux';
import {t} from 'app/locale';
import d3 from 'd3';
var _data = [{"date":"1999-12-31T16:00:00.000Z","price":1394.46},{"date":"2000-01-31T16:00:00.000Z","price":1366.42},{"date":"2000-02-29T16:00:00.000Z","price":1498.58},{"date":"2000-03-31T16:00:00.000Z","price":1452.43},{"date":"2000-04-30T16:00:00.000Z","price":1420.6},{"date":"2000-05-31T16:00:00.000Z","price":1454.6},{"date":"2000-06-30T16:00:00.000Z","price":1430.83},{"date":"2000-07-31T16:00:00.000Z","price":1517.68},{"date":"2000-08-31T16:00:00.000Z","price":1436.51},{"date":"2000-09-30T16:00:00.000Z","price":1429.4},{"date":"2000-10-31T16:00:00.000Z","price":1314.95},{"date":"2000-11-30T16:00:00.000Z","price":1320.28},{"date":"2000-12-31T16:00:00.000Z","price":1366.01},{"date":"2001-01-31T16:00:00.000Z","price":1239.94},{"date":"2001-02-28T16:00:00.000Z","price":1160.33},{"date":"2001-03-31T16:00:00.000Z","price":1249.46},{"date":"2001-04-30T16:00:00.000Z","price":1255.82},{"date":"2001-05-31T16:00:00.000Z","price":1224.38},{"date":"2001-06-30T16:00:00.000Z","price":1211.23},{"date":"2001-07-31T16:00:00.000Z","price":1133.58},{"date":"2001-08-31T16:00:00.000Z","price":1040.94},{"date":"2001-09-30T16:00:00.000Z","price":1059.78},{"date":"2001-10-31T16:00:00.000Z","price":1139.45},{"date":"2001-11-30T16:00:00.000Z","price":1148.08},{"date":"2001-12-31T16:00:00.000Z","price":1130.2},{"date":"2002-01-31T16:00:00.000Z","price":1106.73},{"date":"2002-02-28T16:00:00.000Z","price":1147.39},{"date":"2002-03-31T16:00:00.000Z","price":1076.92},{"date":"2002-04-30T16:00:00.000Z","price":1067.14},{"date":"2002-05-31T16:00:00.000Z","price":989.82},{"date":"2002-06-30T16:00:00.000Z","price":911.62},{"date":"2002-07-31T16:00:00.000Z","price":916.07},{"date":"2002-08-31T16:00:00.000Z","price":815.28},{"date":"2002-09-30T16:00:00.000Z","price":885.76},{"date":"2002-10-31T16:00:00.000Z","price":936.31},{"date":"2002-11-30T16:00:00.000Z","price":879.82},{"date":"2002-12-31T16:00:00.000Z","price":855.7},{"date":"2003-01-31T16:00:00.000Z","price":841.15},{"date":"2003-02-28T16:00:00.000Z","price":848.18},{"date":"2003-03-31T16:00:00.000Z","price":916.92},{"date":"2003-04-30T16:00:00.000Z","price":963.59},{"date":"2003-05-31T16:00:00.000Z","price":974.5},{"date":"2003-06-30T16:00:00.000Z","price":990.31},{"date":"2003-07-31T16:00:00.000Z","price":1008.01},{"date":"2003-08-31T16:00:00.000Z","price":995.97},{"date":"2003-09-30T16:00:00.000Z","price":1050.71},{"date":"2003-10-31T16:00:00.000Z","price":1058.2},{"date":"2003-11-30T16:00:00.000Z","price":1111.92},{"date":"2003-12-31T16:00:00.000Z","price":1131.13},{"date":"2004-01-31T16:00:00.000Z","price":1144.94},{"date":"2004-02-29T16:00:00.000Z","price":1126.21},{"date":"2004-03-31T16:00:00.000Z","price":1107.3},{"date":"2004-04-30T16:00:00.000Z","price":1120.68},{"date":"2004-05-31T16:00:00.000Z","price":1140.84},{"date":"2004-06-30T16:00:00.000Z","price":1101.72},{"date":"2004-07-31T16:00:00.000Z","price":1104.24},{"date":"2004-08-31T16:00:00.000Z","price":1114.58},{"date":"2004-09-30T16:00:00.000Z","price":1130.2},{"date":"2004-10-31T16:00:00.000Z","price":1173.82},{"date":"2004-11-30T16:00:00.000Z","price":1211.92},{"date":"2004-12-31T16:00:00.000Z","price":1181.27},{"date":"2005-01-31T16:00:00.000Z","price":1203.6},{"date":"2005-02-28T16:00:00.000Z","price":1180.59},{"date":"2005-03-31T16:00:00.000Z","price":1156.85},{"date":"2005-04-30T16:00:00.000Z","price":1191.5},{"date":"2005-05-31T16:00:00.000Z","price":1191.33},{"date":"2005-06-30T16:00:00.000Z","price":1234.18},{"date":"2005-07-31T16:00:00.000Z","price":1220.33},{"date":"2005-08-31T16:00:00.000Z","price":1228.81},{"date":"2005-09-30T16:00:00.000Z","price":1207.01},{"date":"2005-10-31T16:00:00.000Z","price":1249.48},{"date":"2005-11-30T16:00:00.000Z","price":1248.29},{"date":"2005-12-31T16:00:00.000Z","price":1280.08},{"date":"2006-01-31T16:00:00.000Z","price":1280.66},{"date":"2006-02-28T16:00:00.000Z","price":1294.87},{"date":"2006-03-31T16:00:00.000Z","price":1310.61},{"date":"2006-04-30T16:00:00.000Z","price":1270.09},{"date":"2006-05-31T16:00:00.000Z","price":1270.2},{"date":"2006-06-30T16:00:00.000Z","price":1276.66},{"date":"2006-07-31T16:00:00.000Z","price":1303.82},{"date":"2006-08-31T16:00:00.000Z","price":1335.85},{"date":"2006-09-30T16:00:00.000Z","price":1377.94},{"date":"2006-10-31T16:00:00.000Z","price":1400.63},{"date":"2006-11-30T16:00:00.000Z","price":1418.3},{"date":"2006-12-31T16:00:00.000Z","price":1438.24},{"date":"2007-01-31T16:00:00.000Z","price":1406.82},{"date":"2007-02-28T16:00:00.000Z","price":1420.86},{"date":"2007-03-31T16:00:00.000Z","price":1482.37},{"date":"2007-04-30T16:00:00.000Z","price":1530.62},{"date":"2007-05-31T16:00:00.000Z","price":1503.35},{"date":"2007-06-30T16:00:00.000Z","price":1455.27},{"date":"2007-07-31T16:00:00.000Z","price":1473.99},{"date":"2007-08-31T16:00:00.000Z","price":1526.75},{"date":"2007-09-30T16:00:00.000Z","price":1549.38},{"date":"2007-10-31T16:00:00.000Z","price":1481.14},{"date":"2007-11-30T16:00:00.000Z","price":1468.36},{"date":"2007-12-31T16:00:00.000Z","price":1378.55},{"date":"2008-01-31T16:00:00.000Z","price":1330.63},{"date":"2008-02-29T16:00:00.000Z","price":1322.7},{"date":"2008-03-31T16:00:00.000Z","price":1385.59},{"date":"2008-04-30T16:00:00.000Z","price":1400.38},{"date":"2008-05-31T16:00:00.000Z","price":1280},{"date":"2008-06-30T16:00:00.000Z","price":1267.38},{"date":"2008-07-31T16:00:00.000Z","price":1282.83},{"date":"2008-08-31T16:00:00.000Z","price":1166.36},{"date":"2008-09-30T16:00:00.000Z","price":968.75},{"date":"2008-10-31T16:00:00.000Z","price":896.24},{"date":"2008-11-30T16:00:00.000Z","price":903.25},{"date":"2008-12-31T16:00:00.000Z","price":825.88},{"date":"2009-01-31T16:00:00.000Z","price":735.09},{"date":"2009-02-28T16:00:00.000Z","price":797.87},{"date":"2009-03-31T16:00:00.000Z","price":872.81},{"date":"2009-04-30T16:00:00.000Z","price":919.14},{"date":"2009-05-31T16:00:00.000Z","price":919.32},{"date":"2009-06-30T16:00:00.000Z","price":987.48},{"date":"2009-07-31T16:00:00.000Z","price":1020.62},{"date":"2009-08-31T16:00:00.000Z","price":1057.08},{"date":"2009-09-30T16:00:00.000Z","price":1036.19},{"date":"2009-10-31T16:00:00.000Z","price":1095.63},{"date":"2009-11-30T16:00:00.000Z","price":1115.1},{"date":"2009-12-31T16:00:00.000Z","price":1073.87},{"date":"2010-01-31T16:00:00.000Z","price":1104.49},{"date":"2010-02-28T16:00:00.000Z","price":1140.45}];

const style = require('css/search/histogram.less');

const Histogram = React.createClass({
  componentWillMount() {
    style.use();
  },
  componentWillUnmount() {
    style.unuse();
  },
  componentDidMount() {
    var _width = $(this.refs.histogram).width();
    var width = _width,
      height2 = 60;

    var x2 = d3.time.scale().range([0, width]),
      y2 = d3.scale.linear().range([height2, 0]);

    var xAxis2 = d3.svg.axis().scale(x2).orient("bottom");

    var brush = d3.svg.brush().x(x2).on("brushend", onBrushend);

    var area2 = d3.svg.area().interpolate("monotone").x(function(d) {
      return x2(d.date);
    }).y0(height2).y1(function(d) {
      return y2(d.price);
    });

    var svg = d3.select('.search-histogram')
      .append('svg')
      .attr("class", "context")
      .attr("width", width);

    function render(data) {
      var mapedDate = data.map(function(d) {
        return d.date;
      });
      var dateExtent = d3.extent(mapedDate);
      var maxPrice = d3.max(data.map(function(d) {
        return d.price;
      }));

      x2.domain(dateExtent);
      y2.domain([0, maxPrice]);

      svg.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area2);
      // svg.append("g")
      //   .attr("class", "bars")
      //   .selectAll(".bar")
      //   .data(data)
      //   .enter().append("rect")
      //       .attr("class", "bar")
      //       .attr("x", function(d) { return x2(d.date) - 3; })
      //       .attr("width", 8)
      //       .attr("y", function(d) { return y2(d.price); })
      //       .attr("height", function(d) { return height2 - y2(d.price); });

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height2 + ")")
        .call(xAxis2);

      svg.append("g")
        .attr("class", "x brush")
        .call(brush)
        .selectAll("rect")
        .attr("y", -6)
        .attr("height", height2 + 7);
    }
    _data = _data.map(function(d) {
      var parseDate = d3.time.format("%b %Y").parse;
      var d = {
        date: new Date(d.date),
        price: d.price
      }
      return d;
    });
    render(_data);

    function onBrushend() {
      var extent = brush.empty()? x2.domain(): brush.extent();
      // console.log('brush end:', extent);
    }
  },
  render() {
    return (
      <div className="search-histogram" ref="histogram"></div>
    )
  }
});

export default Histogram;
