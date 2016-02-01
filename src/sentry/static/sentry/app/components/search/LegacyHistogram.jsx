/* global resultHistogram */

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var c3css = require('c3/c3.css');
import d3 from 'd3';
import c3 from 'c3';
import nv from 'nvd3';
//var Widget = require('../widgets/Widget');
import _ from 'underscore';
var SearchStore = require('../../stores/search/SearchStore');

import resultHistogram from '../../legacy/result-histogram';
//import NVD3Chart from 'react-nvd3';
// Hue-manatee. We tried to be sorry, but aren't.
var LegacyHistogram = React.createClass({
    RESOLUTIONS: ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute'],
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)return unescape(r[2]);
        return "";
    },
    componentDidMount() {
        var interval = "day";
        if (this.getQueryString("interval") != "") {
            interval = this.getQueryString("interval");
        }

        var data = {};
        var url = "http://192.168.1.80:9200/user02-2016.01.29/_search";
        if (this.getQueryString("q") == "") {
            data = {
                query: {match_all: {}},
                aggregations: {
                    age: {
                        date_histogram: {
                            field: "@timestamp",
                            interval: interval
                        }
                    }
                }
            }
        } else {
            data = {
                aggregations: {
                    age: {
                        date_histogram: {
                            field: "@timestamp",
                            interval: interval
                        }
                    }
                }
            }
            url += "q=" + this.getQueryString("q");
        }


        var str = JSON.stringify(data);

        $.ajax({
                url: url,
                'type': 'POST',
                'data': str,
                'contentType': 'application/json',
                success: function (result) {
                    var data = [];
                    var times = [];
                    times.push("x");
                    data.push("sample");
                    for (var i = 0; i < result.aggregations.age.buckets.length; i++) {
                        data.push(result.aggregations.age.buckets[i].doc_count);
                        times.push(result.aggregations.age.buckets[i].key);
                    }

                    var chart = c3.generate({
                        bindto: '#chart',
                        data: {
                            x: 'x',
                            columns: [times, data],
                            axes: {
                                data1: 'y2'
                            },
                            type: 'bar'
                        },
                        zoom: {
                            rescale: true,
                            enabled: true
                        },
                        grid: {
                            x: {
                                show: true
                            },
                            y: {
                                show: true
                            }
                        },
                        axis: {
                            y: {
                                label: {
                                    text: 'Y Label',
                                    position: 'outer-middle'
                                }
                            },
                            x: {
                                type: 'timeseries',
                                tick: {
                                    count: 4,
                                    format: '%Y-%m-%d %H:%M:%S'
                                }
                            }
                        }
                    });
                }
            }
        )
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
                <h4>图表</h4>
                {resolutionSelector}
                <div id="chart">
                </div>
            </div>
        );
    }
});

module.exports = LegacyHistogram;
