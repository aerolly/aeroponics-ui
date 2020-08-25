<template>
  <Card>
    <p class="secondary text-sm font-bold">{{ dataType }} [{{ lastData }}]</p>
    <div class="flex flex-row">
      <h2 class="text-5xl font-bold">
        <span v-if="value && typeof value === 'number'">
          {{ value.toFixed(2) }}{{ unit }}
        </span>
        <span v-else>-</span>
      </h2>
      <div
        :class="`percent-difference font-bold ${
          percentDifference >= 0 ? 'text-green-500' : 'text-red-500'
        }`"
      >
        <span v-if="percentDifference >= 0">
          <svg
            id="Arrow_long_up"
            class="w-5 inline"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 20 20"
            enable-background="new 0 0 20 20"
            xml:space="preserve"
          >
            <path fill="#81efb4" d="M10,0.75L15.5,6H12v13H8V6H4.5L10,0.75z" />
          </svg>
        </span>
        <span v-else>
          <svg
            id="Arrow_long_down"
            class="w-5 inline"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 20 20"
            enable-background="new 0 0 20 20"
            xml:space="preserve"
          >
            <path fill="#f56565" d="M10,19.25L4.5,14H8V1h4v13h3.5L10,19.25z" />
          </svg>
        </span>
        {{ Math.abs(percentDifference).toFixed(2) }}
        %
      </div>
    </div>
    <p class="text-xs text-gray-200 -mt-5"></p>
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
      lastDate: '-',
      previousValue: 0,
      percentDifference: 0,
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
        markers: {
          size: 5,
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
      return this.$store.state.system[this.dataKey]
    },
    time() {
      return this.$store.state.system.time
    },
  },
  watch: {
    value(v) {
      if (this.value && this.time && typeof this.value === 'number') {
        this.lastData = this.time
        this.options.xaxis.categories.push(this.time)
        this.series[0].data.push(v.toFixed(2))

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

        if (v !== this.previousValue) {
          this.percentDifference =
            ((v - this.previousValue) / ((v + this.previousValue) / 2)) * 100
        } else {
          this.percentDifference = 0
        }

        this.previousValue = v
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
}

.secondary {
  color: #b7b7b7;
}
</style>
