<script>
  import { Bar } from "vue-chartjs";
  export default {
    name: "ChartLaporanMutu.vue",
    mixins: [Bar],
    props: {
      data: {
        type: Array
      },
      bulan: {
        type: Array
      }
    },
    mounted() {
      // Overwriting base render method with actual data.
      let self = this;
      self.makeChart();
    },
    methods: {
      makeChart() {
        let self = this;
        console.log(self.data);
        let datasets = [];
        let who = ["Dokter", "Perawat"];
        let j = 0;
        if (self.data.length) {
          self.data.forEach(function(data) {
            const letters = "0123456789ABCDEF";
            let color = "#";
            for (var i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            datasets.push({
              label: who[j],
              backgroundColor: color,
              barThickness: 50,
              data: data
            });
            j = j + 1;
          });
        }
        console.log(datasets);
        let chartData = {
          labels: self.bulan,
          datasets: datasets
        };

        let options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  max: 100,
                  min: 0
                }
              }
            ]
          }
        };

        self.renderChart(chartData, options);
      }
    },
    watch: {
      data: function() {
        let self = this;
        self.makeChart();
      }
    }
  };
</script>

<style scoped></style>
