<template>
  <Card>
    <div class="flex flex-row">
      <h2 class="text-5xl font-bold">
        <span v-if="value"> {{ value }}{{ unit }} </span>
        <span v-else>-</span>
      </h2>
      <!-- <div class="percent-difference"></div> -->
    </div>
    <p class="-mt-2">{{ dataType }}</p>
    <br />
    <div>
      <apexchart ref="chart" :options="options" :series="series"></apexchart>
    </div>
  </Card>
</template>

<script lang="ts">
import Vue from 'vue'
import Card from '../components/Card.vue'

export default Vue.extend({
  name: 'Data',
  components: {
    Card,
  },
  props: {
    dataType: {
      type: String,
      required: true,
    },
    dataKey: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      options: {
        chart: {
          id: 'vuechart-example',
          background: '#393e46',
          dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            blur: 3,
            opacity: 0.5,
          },
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000,
            },
          },
        },
        stroke: {
          curve: 'stepline',
        },
        xaxis: {
          categories: [],
        },
        theme: {
          mode: 'dark',
          palette: 'palette1',
          monochrome: {
            enabled: false,
            color: '#255aee',
            shadeTo: 'light',
            shadeIntensity: 0.65,
          },
        },
        dataLabels: {
          enabled: true,
        },
      },
      series: [
        {
          name: this.dataKey,
          data: [],
        },
      ],
    }
  },
  computed: {
    value() {
      return typeof this.$store.state.system[this.dataKey] === 'number'
        ? this.$store.state.system[this.dataKey].toFixed(2)
        : this.$store.state.system[this.dataKey]
    },
  },
  watch: {
    value(v) {
      console.log(this.series)
      if (
        this.series &&
        typeof this.$store.state.system[this.dataKey] === 'number'
      ) {
        this.options.xaxis.categories.push(new Date(Date.now()).toISOString())
        this.series[0].data.push(v)

        this.$refs.chart.updateSeries(
          [
            {
              data: this.series[0].data,
            },
          ],
          true
        )

        this.$refs.chart.updateOptions({
          xaxis: {
            categories: this.options.xaxis.categories,
          },
        })
      }
    },
  },
})
</script>

<style lang="scss">
table {
  border-spacing: 10px 0;
  border-collapse: separate;
}

tr td:first-child {
  @apply font-bold;
  color: #b7b7b7;
}

select {
  background-color: #393e46;
  margin-left: -4px;
}

.percent-difference {
  @apply pl-3;
  @apply text-lg;
  line-height: 5;
  color: #81efb4;
}
</style>
