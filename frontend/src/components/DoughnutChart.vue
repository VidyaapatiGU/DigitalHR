<style scoped>
.pie_chart {
  width: auto;
  height: 10vw;
}

@media (max-width: 576px) {
}

@media (min-width: 576px) {
  .pie_chart {
    width: auto;
    height: 25vw;
  }
}

@media (min-width: 768px) {
}

@media (min-width: 992px) {
}

@media (min-width: 1200px) {
}
</style>

<template>
  <div class="main source-400 pt-5 w-75">
    <div class="h-100 w-100">
      <canvas id="doughnutChart1"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import 'chartjs-plugin-annotation';

export default {
  name: 'DoughnutChart',
  props: {
    propsChartData: Object,
  },
  data() {
    return {
      chartData: {},
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Doughnut Chart',
          },
        },
      },
    };
  },

  created() {
    this.chartData = this.propsChartData;
  },

  mounted() {
    const pie = document.getElementById('doughnutChart1').getContext('2d');
    new Chart(pie, {
      type: 'doughnut',
      data: this.chartData,
      options: this.chartOptions,
    });
  },
};
</script>
