<template>
  <Card>
    <div class="flex flex-row">
      <h2 class="text-5xl font-bold">
        <span v-if="value"> {{ value }}{{ unit }} </span>
        <span v-else>-</span>
      </h2>
      <div class="percent-difference"></div>
    </div>
    <p class="-mt-5">{{ dataType }}</p>
    <div></div>
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
  computed: {
    value() {
      return this.$store.state.system[this.dataKey]
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

input {
  background-color: #393e46;
  white-space: nowrap;
  width: 30px;
}

.percent-difference {
  @apply pl-3;
  @apply text-lg;
  line-height: 5;
  color: #81efb4;
}
</style>
