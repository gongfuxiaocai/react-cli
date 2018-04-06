import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import './TrendChart.css';

class TrendChart extends React.Component {
    static propTypes = {
        chartData: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.renderChart();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.chartData !== nextProps.chartData) {
            return true;
        }
        return false;
    }

    componentDidUpdate() {
        this.renderChart();
    }

    renderChart = () => {
        const chartData = this.props.chartData;
        if (Object.keys(chartData).length === 0) { //判断对象是否为空，是ES6的新方法, 返回值是对象中属性名组成的数组
            return;
        } 
        const myDate = chartData.datetime.split('-');
        
        const [curYear, curMonth, curDate] = myDate;
        console.log(curYear, curMonth, curDate);
        let legend;
        if (chartData.legend) {
            legend = {
                align: 'center',
                verticalAlign: 'top',
                borderWidth: 0
            }
        } else {
            legend = {
                enabled: false
            }
        }
        let colors = [];
        let series = [];
        chartData.series.forEach((item, index) => {
            colors.push(item.color);
            series.push({
                type: item.type,
                name: item.name,
                zones: [item.decimal, item.unit],
                pointStart: Date.UTC(curYear, curMonth-1, curDate),
                pointInterval: 24 * 3600 * 1000, // one day
                //24小时内每分钟交易金额
                data: item.data
            });
        });
        const chartid = this.props.chartId;
        const chart = new Highcharts.Chart(chartid, {
            title: {                                                                
                text: null  // 禁用标题                                           
            }, 
            subtitle: {
                text: null  // 禁用副标题
            },
            xAxis: {
                tickWidth: 0,    //刻度线宽度（隐藏刻度线）
                labels: {
                    style: {
                        color: '#666'  //x轴文字颜色
                    }
                }, 
                type: 'datetime', 
                // tickInterval: 20,                     
                // tickPixelInterval: 80,                                                 
                dateTimeLabelFormats: {
                    day: '%Y-%m-%d'
                }
            },
            tooltip: {                                                              
                formatter: function() {  
                    // console.log(this.points);
                    var s = Highcharts.dateFormat('%Y-%m-%d', this.x);
                    // 如果有多条线的情况
                    this.points.forEach((item, index) => {
                        s += '<br/><b>' + item.series.name + '</b>: ' +
                            Highcharts.numberFormat(item.y, item.series.zones[0], '.', ',') + ' ' + item.series.zones[1];
                    });
                    return s;
                    // var decimal = chartData.isDecimal ? 2 : 0;                        
                    // return Highcharts.dateFormat('%Y-%m-%d', this.x) + '<br/>' + 
                    // this.series.name + ' <b>' + Highcharts.numberFormat(this.y, decimal, '.', ',') + '</b> ' + chartData.unit;                         
                },
                shared: true                                                                 
            }, 
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    style: {
                        color: '#666'  //y轴文字颜色
                    }
                }, 
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            colors: colors,
            credits:{
                enabled:false  // 禁用版权信息
            },                                                                 
            legend: legend,
            exporting: {                                                            
                enabled: false                                                      
            }, 
            plotOptions: {
                series: {
                    marker: {
                        enabled: false  //数据点不显示
                    }
                },
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            }, 
            // series: [{
            //     type: 'area',
            //     name: chartData.title,
            //     decimal: chartData.decimal,
            //     unit: chartData.unit,
            //     pointStart: Date.UTC(curYear, curMonth, curDate),
            //     pointInterval: 24 * 3600 * 1000, // one day
            //     //24小时内每分钟交易金额
            //     data: chartData.data
            // }]
            series: series
        });

    }

    render() {
        const {className,children,chartData,animation,chartId,...others} = this.props;
        const cls=classNames({
            'chart_wrap': true,
            [className]: className
        });

        return (
            <div className={cls} {...others}>
                <div id={chartId} style={{height:'360px'}}></div>   
            </div>
        )
    }
}

export default TrendChart;