<template>
  <div class="line-box">
    <div :id="boxId" :style="styles"></div>
  </div>
</template>
<script>
/* eslint-disable */
// import 'Plugins/echarts.js'
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import './chartsTheme/dark';

const randomId = () => {
  return 'chartLineId' + parseInt(Math.random() * 100);
};
export default {
  props: {
    boxId: {
      type: String,
      default: randomId()
    },
    // date: {
    //   type: Array,
    //   default: []
    // },
    sensor: {
      type: Object,
      default: {}
    },
    chartTitle: {
      type: String,
      default: ''
    },
    did: {},
    optionData: {},
    styles: {
      default: 'width:100%;height:320px;'
    },
    theme: {
      type: String,
      default: 'dark'
    }
  },
  data() {
    return {
      allSeriesData: [],
      allSeriesData2: [],
      xData: [],
      data: [],
      myChart: null,
      option: {
        legend: { data: [] },
        title: {
          left: 'center',
          text: '',
          textStyle: {
            fontSize: 14
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '10%',
          containLabel: true
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            // 轴线刻度是否从0开始显示
            onZero: false
          },
          splitLine: {
            // show: false,
            lineStyle: {
              type: 'dashed',
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 10
            }
          }
        },
        xAxis: {
          type: 'category',
          data: [],

          axisTick: {
            show: false
          },
          axisLine: {
            onZero: false
          }
        },
        series: [],
        tooltip: {
          trigger: 'axis'
        }
      },
      isInit: true
    };
  },
  methods: {
    setData() {
      this.myChart.setOption(this.option);
    },
    // 处理实时数据
    realTimeData(data) {
      const { series, xAxis } = data;
      //是否为初始化
      if (this.isInit) {
        this.option = Object.assign({}, this.option, data);
        this.isInit = false;
      } else {
        series.map((item, index) => {
          let newItem = Object.assign({}, item);
          if (newItem.data) {
            newItem.data.map((j, i) => {
              this.option.series[index].data.push(j);
              this.option.series[index].data.shift();
            });
          }
        });
        xAxis.data.map((item) => {
          this.option.xAxis.data.push(item);
          this.option.xAxis.data.shift();
        });
      }
      this.myChart.setOption(this.option);
    },
    chartResize() {
      this.myChart.resize();
    }
  },
  mounted() {
    // 制表
    this.myChart = echarts.init(
      document.getElementById(this.boxId),
      this.theme
    );
    // this.getData();
    if (this.chartTitle) {
      this.option.title.text = this.chartTitle;
    }
    this.setData();
    this.realTimeData(Object.assign({}, this.sensor.data));
    window.addEventListener('resize', this.chartResize);
  },
  watch: {
    chartTitle(val) {},
    sensor: {
      handler(val) {
        this.realTimeData(val.data);
        return val;
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.chartResize);
  }
};
</script>
<style scoped>
.tooltip-class {
  background-color: rgba(255, 255, 255, 0.7);
  padding: 3px;
  border-radius: 3px;
}
.line-box {
  /* padding: 10px; */
}
</style>
