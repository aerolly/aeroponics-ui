<template>
  <Card>
    <h2 class="text-5xl font-bold pb-2">Genesis</h2>
    <div>
      <table>
        <tr>
          <td>Auto Mode</td>
          <td>
            <Select data-key="autoMode" type="system" />
          </td>
        </tr>
        <tr v-for="controller in controllers" :key="controller.CurrentDeviceID">
          <td>{{ controller.ModuleName }}-{{ controller.DeviceTypeName }}</td>
          <td>
            <Select
              :data-key="`${controller.NodeName}-${controller.ModuleName}-${controller.DeviceTypeName}`"
            />
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
  data() {
    return {
      controllers: [],
    }
  },
  mounted() {
    this.$api.get('/controller').then(({ data }) => {
      this.controllers = JSON.parse(data)
    })
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
