<template>
  <span>
    <select v-model="select" @change="handleSelect">
      <option value="" disabled>Mode</option>
      <option value="1">ON</option>
      <option value="0">OFF</option>
    </select>
    <span
      v-if="status === 1"
      class="rounded border-solid border border-green-500 px-2 bg-green-500 transition-all duration-300 ease-in-out"
      >ON</span
    >
    <span
      v-if="status === 0"
      class="rounded border-solid border border-red-500 px-2 bg-red-500 transition-all duration-300 ease-in-out"
      >OFF</span
    >
  </span>
</template>

<script lang="ts">
import Vue from 'vue'

/** Listen to websocket, set value from that */
export default Vue.extend({
  name: 'Select',
  props: {
    dataKey: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'command',
    },
  },
  data() {
    return {
      value: '',
      select: '',
    }
  },
  computed: {
    status() {
      return this.$store.state.system[this.dataKey]
    },
  },
  methods: {
    handleSelect() {
      if (this.type === 'command') {
        this.$api
          .post('/command', {
            command: 'controller',
            options: {
              key: this.dataKey,
              action: Number(this.select),
            },
          })
          .then((d) => console.log(d))
          .catch((d) => console.log(d))
      } else if (this.type === 'system') {
        this.$api.post('/system', {
          key: this.dataKey,
          value: this.select,
        })
      }

      this.value = this.select
      this.select = ''
    },
  },
})
</script>

<style>
.card {
  position: relative;
  background-color: #393e46;
  top: 0;
  transition: top ease 0.3s;
  @apply p-5;
}

.card:hover {
  top: -2px;
}
</style>
