<template>
  <div class="card">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Card',
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
