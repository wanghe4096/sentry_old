/* global resultHistogram */

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
import d3 from 'd3';
import nv from 'nvd3';
//var Widget = require('../widgets/Widget');
import _ from 'underscore';
var SearchStore = require('../../stores/search/SearchStore');

import resultHistogram from '../../legacy/result-histogram';
import NVD3Chart from 'react-nvd3';
// Hue-manatee. We tried to be sorry, but aren't.
var LegacyHistogram = React.createClass({
    RESOLUTIONS: ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute'],
    componentDidMount() {
        nv.addGraph(function () {
            var chart = nv.models.discreteBarChart()
                .x(function (d) {
                    return d.label
                })
                .y(function (d) {
                    return d.value
                })
                .staggerLabels(true)
                .showValues(true)
                .duration(1000)
                .staggerLabels(true)
                .color(function (d, i) {
                    var colors = d3.scale.category20().range().slice(10);
                    return colors[i % colors.length - 1];
                });

            var data = [
                {
                    key: "Cumulative Return",
                    values: [

                        {
                            "label": "2016-01-01",
                            "value": 32.807804682612
                        },
                        {
                            "label": "2016-01-02",
                            "value": 196.45946739256
                        },
                        {
                            "label": "2016-01-03",
                            "value": 0.19434030906893
                        },
                        {
                            "label": "2016-01-04",
                            "value": 121
                        },
                        {
                            "label": "2016-01-05",
                            "value": 121
                        },
                        {
                            "label": "2016-01-06",
                            "value": 121
                        },
                        {
                            "label": "2016-01-07",
                            "value": 121
                        },
                        {
                            "label": "2016-01-08",
                            "value": 312
                        },
                        {
                            "label": "2016-01-09",
                            "value": 432
                        },
                        {
                            "label": "2016-01-10",
                            "value": 124
                        },
                        {
                            "label": "2016-01-11",
                            "value": 634
                        }

                    ]
                }
            ]
            d3.select('#chart svg')
                .datum(data)
                .call(chart);

            nv.utils.windowResize(chart.update);

            return chart;
        });

    },
    _resolutionChanged(newResolution) {
        return (event) => {
            event.preventDefault();
            SearchStore.resolution = newResolution;
        };
    },
    render() {
        var resolutionLinks = this.RESOLUTIONS.map((resolution) => {
            var className = "date-histogram-res-selector";
            if (this.props.histogram.interval === resolution) {
                className += " selected-resolution";
            }
            var suffix = resolution === this.RESOLUTIONS[this.RESOLUTIONS.length - 1] ? "" : ",";
            return (
                <li key={resolution}>
                    <a href="#" className={className} data-resolution={resolution}
                       onClick={this._resolutionChanged(resolution)}>
                        {resolution}
                    </a>
                    {suffix}
                </li>
            );
        });

        var resolutionSelector = (
            <ul className="graph-resolution-selector list-inline">
                <li><i className="fa fa-clock-o"></i></li>
                {resolutionLinks}
            </ul>
        );
        return (<div className="content-col">
                <h1>图表</h1>
                {resolutionSelector}
                <div id="chart">
                    <svg height="250px" width="1200px"></svg>
                </div>
            </div>
        );
    }
});

module.exports = LegacyHistogram;
