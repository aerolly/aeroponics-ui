<template>
  <div class="flex flex-col md:flex-row">
    <div class="flex flex-col w-full md:w-1/2 lg:w-1/2 xl:w-1/4">
      <System />
      <Event />
    </div>
    <div class="flex flex-col lg:flex-row w-full md:w-1/2 lg:w-1/2 xl:w-3/4">
      <Data
        class="xl:w-1/2"
        data-key="temperature"
        data-type="Temperature"
        unit="˚F"
      />
      <Data
        class="xl:w-1/2"
        data-key="pressure"
        data-type="Pressure"
        unit=" PSI"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'

import System from '../components/System.vue'
import Event from '../components/Event.vue'
import Data from '../components/Data.vue'

export default Vue.extend({
  components: {
    System,
    Event,
    Data,
  },
  mounted() {
    this.$api
      .get('/system')
      .then(({ data }) => this.$store.commit('system/initialize', data))

    this.socket = this.$nuxtSocket({
      channel: '/',
    })
    /* Listen for events: */
    this.socket.on('data', (msg, cb) => {
      this.$store.commit('system/update', {
        key: msg.key,
        type: msg.type,
        result: msg.result,
        time: dayjs.unix(msg.time).utc().format('HH:mm:ss'),
      })

      this.$store.commit('event/add', {
        key: msg.key,
        type: msg.type,
        result: msg.type === 'sensor' ? msg.result.toFixed(2) : msg.result,
        time: dayjs.unix(msg.time).utc().format('HH:mm:ss'),
      })
    })
  },
})
</script>

<style lang="scss">
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
// html {
//   @apply font-body;
// }

body {
  background-color: #222831;
  color: white;
  @apply p-5;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
