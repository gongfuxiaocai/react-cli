import React from 'react';

import Panel from '../panel/Panel';
import PanelTitle from '../panel/PanelTitle';
import PanelBody from '../panel/PanelBody';
import Cell from '../cell/index';
import Radio from '../radio/Radio';

import './TrendingChart.css';

class TrendingChart extends React.Component {
  constructor(props) {
    super(props);

    let defaultActiveField = '';
    if (props && Array.isArray(props.fields) && props.fields[0] && props.fields[0].value) {
      defaultActiveField = props.fields[0].value;
    }
    this.state = {
      chartCategories: [],
      chartData: null,
      activeField: defaultActiveField
    };
    this.chart = null;
    this.chartuuid = (new Date()).valueOf();
    this.chartParams = null;
  }

  componentWillReceiveProps(nextProps) {

    if (Array.isArray(nextProps.fields) && nextProps.fields.length) {
      this.chartParams = {};
      nextProps.fields.forEach((v) => {
        this.chartParams[v.value] = {
          text: v.text,
          unit: v.unit
        };
      });
    }
    this.setState({
      chartCategories: nextProps.chartCategories,
      chartData: nextProps.chartData,
      activeField: nextProps.fields[0].value
    }, ()=> {
      this.updateChart();
    });
  }

  updateChart() {
    if (!this.state.chartData || !this.state.activeField || !this.chartParams  || !this.state.chartCategories.length) {
      return false;
    }
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    var that = this;
    let chartOption = {
      title: { text: null },
      subtitle: { text: null },
      credits:{ enabled:false },
      xAxis: {
        tickWidth: 0,
        labels: {
          style: {
            color: '#666'
          }
        },
        type: 'datetime',
        tickPixelInterval: 180,
        dateTimeLabelFormats: {
          day: '%Y-%m-%d'
        },
        categories: this.state.chartCategories
      },
      yAxis: {
        title: {
          text: null
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      tooltip: {
        formatter: function() {
          let s = '';
          this.points.forEach((point) => {
            s += '<b>' +  point.x + '</b>' + '<br/>' + point.series.name + ': ';
            s += Highcharts.numberFormat(point.y, that.chartParams[that.state.activeField].decimals, '.', ',') + ' ' + that.chartParams[that.state.activeField].unit;
          });
          return s;
        },
        shared: true
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false
          }
        }
      },
      series: [{
        type: 'spline',
        name: this.chartParams[this.state.activeField].text,
        data: this.state.chartData[this.state.activeField]
      }]

    };
    const chartid = 'highcharts-' + this.chartuuid;
    this.chart = Highcharts.chart(chartid, chartOption);
  }

  updateActiveField(newValue) {
    this.setState({
      activeField: newValue
    }, () => {
      this.updateChart();
    });
  }

  generateFields() {
    return this.props.fields.map((currentValue, index) => {
      return <Radio
        onChange={this.updateActiveField.bind(this, currentValue.value)}
        key={'chartOption' + index}
        model="primary"
        name="chartOption"
        value={currentValue.value}
        text={currentValue.text}
        checked={this.state.activeField === currentValue.value}
      />;
    });
  }

  componentDidMount() {
    const chartid = 'highcharts-' + this.chartuuid;
    if (document.getElementById(chartid)) {
      Highcharts.setOptions({lang: {loading: '加载中......'}});
      this.chart = Highcharts.chart(chartid, {title: { text: null },});
      this.chart.showLoading();
    }
  }

  render() {
    const chartid = 'highcharts-' + this.chartuuid;
    return (
      <div className="swiftBI_trendingchart">
        <Panel className="mg_btm20">
          <PanelTitle><span>{this.props.title}</span></PanelTitle>
          <PanelBody>
            <Cell>
              <CellLabel>{this.props.fieldsLabel}</CellLabel>
              <Cell.CellBody className="pad_12_15">
                {this.generateFields()}
              </Cell.CellBody>
            </Cell>
            <div className="panel_img_wrap">
              <div id={chartid}/>
            </div>
          </PanelBody>
        </Panel>
      </div>
    );
  }
};

TrendingChart.defaultProps = {
  title: '趋势指标',
  fieldsLabel: '请选择维度',
  fields: [],
  chartCategories: [],
  chartData: null
};

export default TrendingChart;