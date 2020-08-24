<template>
  <Card class="events overflow-y-scroll">
    <h3 class="secondary text-sm font-bold pb-2">
      Events
    </h3>
    <table>
      <tr v-for="event in events" :key="event.time">
        <td>
          {{ event.time }}
        </td>
        <td>
          {{ event.key }}
        </td>
        <td>
          {{ event.result }}
        </td>
      </tr>
    </table>
  </Card>
</template>

<script>
import Card from './Card'

export default {
  components: {
    Card,
  },
  // data() {
  //   return {
  //     events: [],
  //   }
  // },
  computed: {
    events() {
      return this.$store.state.event.events
    },
  },
  // methods: {
  //   handleEvent(event) {
  //     console.log(event)
  //     this.events = [...this.events, event]
  //   },
  // },
}
</script>

<style>
.events {
  height: 200px;
}
</style>
