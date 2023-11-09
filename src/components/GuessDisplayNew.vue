<script setup>
import { ref } from 'vue'
const props = defineProps(['number'])
const emit = defineEmits(['ready-guess', 'add-tag'])
const maxLength = 4;
const tags = ref([]);
const tag = ref("");
const tvalue = ref(0.0);

function addTag(event) {
  var item = {name: tag.value, value: tvalue.value};
  tvalue.value = 0;
  tags.value.push(item);
  // TODO: 告诉父函数
  // callback(item)
  // emit('add-tag', item);
}

function commit() {
  for (var i = 0; i < tags.value.length; i +=1 ) {
    emit('add-tag', tags.value[i]);
  }
  emit('ready-guess');
}
</script>

<template>
  <div>
    <div class="row">
        <div class="col"><p>需要记住的数字:</p></div>
        <div class="col"><p class="btn btn-primary rounded-pill">{{ number }}</p></div>
    </div>

    <div class="row">
      <div class="col-6">
        <input v-model="tag" placeholder="添加TAG" />
        <div class="row">
          <div class="col-2"><p>值</p></div>
          <div class="col-10"><input v-model="tvalue" placeholder="默认值"/></div>
        </div>
      </div>
      <div class="col-6">
        <button class="btn btn-primary rounded-pill" @click="addTag">添加</button>
      </div>
    </div>
    <br />
    <div class="row">
        <div class="col">
          <button class="btn btn-primary rounded-pill" v-for="item in tags" @click="tags.splice(tags.indexOf(item), 1)"> {{ item.name }}</button>
        </div>
    </div>
    <br />
    <div class="row">
        <button class="btn btn-primary rounded-pill" @click="commit">开始答题</button>
    </div>
  </div>
</template>
