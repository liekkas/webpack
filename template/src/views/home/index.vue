<template>
  <div style="padding-top: 60px;">
    <div id="chart"></div>
    <!-- <iframe src="http://192.168.0.103:8889/workflow/modeler.html?modelId=50001"></iframe> -->
  </div>
</template>

<script>
import G2 from '@antv/g2';
import { View } from '@antv/data-set';
import data from './diamond.json';

export default {
  mounted() {
    // var _DataSet = DataSet,
    // DataView = _DataSet.DataView;
    var chart = new G2.Chart({
      container: 'chart',
      forceFit: true,
      height: window.innerHeight - 60,
      padding: [30, 80]
    });
    chart.source(data, {
      cut: {
        sync: true
      },
      mean: {
        sync: true,
        tickCount: 5
      }
    });
    chart.legend('cut', {
      position: 'top'
    });
    chart.axis('cut', {
      label: null,
      tickLine: null
    });
    chart.tooltip({
      crosshairs: false
    });
    chart.facet('tree', {
      fields: ['clarity'],
      line: {
        stroke: '#c0d0e0'
      },
      lineSmooth: true,
      // padding: 0,
      eachView: function eachView(view, facet) {
        var data = facet.data;
        var dv = new View();
        dv.source(data).transform({
          type: 'aggregate',
          fields: ['price'],
          operations: ['mean'],
          as: ['mean'],
          groupBy: ['cut']
        });
        view.source(dv);
        view.interval().position('cut*mean').color('cut');
      }
    });
    chart.render();
  }
}
</script>

<style lang="less">
  iframe {
    width: 100%;
    height: 90vh;
    border: none;
  }
</style>
