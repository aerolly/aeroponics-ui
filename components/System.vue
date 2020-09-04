<template>
  <Card>
    <h2 class="text-5xl font-bold pb-2">System</h2>
    <div>
      <table>
        <tr>
          <td>Auto Mode</td>
          <td>
            <Select data-key="autoMode" type="system" />
          </td>
        </tr>
        <tr>
          <td>Pump</td>
          <td>
            <Select data-key="system-pump" />
          </td>
        </tr>
        <tr>
          <td>Lower Solenoid</td>
          <td>
            <Select data-key="lowerBed-solenoid" />
          </td>
        </tr>
        <tr>
          <td>Upper Solenoid</td>
          <td>
            <Select data-key="upperBed-solenoid" />
          </td>
        </tr>
        <tr>
          <td>Spray Duration</td>
          <td>
            <Input data-key="sprayDuration" unit="s" />
          </td>
        </tr>
        <tr>
          <td>Spray Interval</td>
          <td>
            <Input data-key="sprayInterval" unit="m" />
          </td>
        </tr>
        <tr>
          <td>Forecast</td>
          <td>-</td>
        </tr>
      </table>
    </div>
  </Card>
</template>

<script lang="ts">
import Vue from 'vue'
import Card from '../components/Card.vue'
import Select from '../components/Select.vue'

export default Vue.extend({
  name: 'System',
  components: {
    Card,
    Select,
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
</style>
