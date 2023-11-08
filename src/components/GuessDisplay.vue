<script setup>
import { ref } from 'vue'
const props = defineProps(['number', 'modelValue'])
const emit = defineEmits(['update:modelValue', 'ready-guess'])
const maxLength = 4;
//const tags = ref([])
const tag = ref("");
const tvalue = ref(0.0);
var storedTags = JSON.parse(localStorage.getItem("tags"));
if (storedTags == null) {
    storedTags = [];
}
for (let key in storedTags) {
    console.log("storedTags="+ key + " "+ JSON.stringify(storedTags[key]));
}
// tags.value.push("e.g.Tag");

function addTag(event) {
    console.log("tags.length=" + props.modelValue + " maxLength is" + maxLength);
    if (props.modelValue.length < maxLength) {
        props.modelValue.push({name: tag.value, value: tvalue.value});
        // storedTags.push({"name": tag.value, "value": tvalue.value});
        /*
        if (!storedTags.hasOwnProperty(tag.value)) {
            storedTags[tag.value] = {"name": tag.value, "value": tvalue.value};
        }
        localStorage.setItem("tags", JSON.stringify(storedTags));
        */
        tvalue.value = 0;
    }
    // TODO: 告诉父函数
}
</script>

<template>
  <div>
    <div class="row">
        <!-- <div class="col"><p>需要记住的数字:</p><div> -->
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
          <button class="btn btn-primary rounded-pill" v-for="item in modelValue" @click="modelValue.splice(modelValue.indexOf(item), 1)"> {{ item.name }}</button>
        </div>
    </div>
    <br />
    <div class="row">
        <button class="btn btn-primary rounded-pill" @click="$emit('ready-guess')">开始答题</button>
    </div>
  </div>
</template>