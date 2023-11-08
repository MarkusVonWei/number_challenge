<script setup>
const props = defineProps(['tagHints'])
defineEmits(['deleteTag', 'selectTag'])
</script>

<template>
  <div class="row text-center">
    <p>常用的TAG</p>
  </div>
  <div class="row" v-for="(item, key) in tagHints">
    <!-- <span v-for="item in tagHints"> -->
        <div class="col-6"><button class="btn btn-primary rounded-pill" @click="$emit('selectTag', item)">{{ item.name }}</button></div>
        <div class="col-4">{{ item.value }}</div>
        <div class="col-2"><button class="btn btn-outline-danger rounded-pill" @click="$emit('deleteTag', key)">X</button></div>
    <!-- </span> -->
  </div>
</template>