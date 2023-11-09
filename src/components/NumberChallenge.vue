<script setup>
import { ref } from 'vue';
import GuessDisplayNew from './GuessDisplayNew.vue';
import TagList from './TagList.vue';
/*
class NumberStats {
    number_len // 当前猜测数字长度
    success_threshold // 猜测成功次数阈值
    failed_threshold // 猜测失败次数阈值

    success_times // 猜测成功次数
    failed_times // 猜测失败次数
}
*/

const number = ref()
const guessed_number = ref(0)
const guessed = ref(false);
const showCongradulation = ref(false);
const current_number_len = ref(7)
const tags = ref([])
const guess_begin = ref(false)
// 猜测成功后等待2秒
const timeout = 2000;
const tagHints = ref({});
var storedHints = JSON.parse(localStorage.getItem("tags"));
console.log("storedhints", storedHints);
if (storedHints != null) {
    console.log("storedHints is ", storedHints);
    console.log("Not null INITIAL: tagHints: ", tagHints, " value len= ", tagHints.value.length);
    tagHints.value = storedHints;
}
/*
const tagHints = ref([
    {"name": "pi", "value": "3.14159265"},
    {"name": "根2", "value": "1.41421356"},
    {"name": "根3", "value": "1.73205080"},
    {"name": "根5", "value": "2.236067977"},
])
*/
restart()
console.log("INITIAL: tagHints: ", tagHints, " value len= ", tagHints.value.length);

function check(event) {
  // alert(`Hello number=${number.value} and guessed=${guessed_number.value}!`)
  if (number.value == guessed_number.value) {
    showCongradulation.value = true;
    current_number_len.value += 1;
  } else {
    showCongradulation.value = false;
    current_number_len.value -= 1;
  }
  guessed.value = true;
  var changed = false;
  console.log("tags: ", tags, " value len= ", tags.value.length);
  for (let i = 0; i < tags.value.length; i++) {
    let item = tags.value[i];
    if (!tagHints.value.hasOwnProperty(item.value)) {
      tagHints.value[item.name] = item;
      changed = true;
    }
  }
  if (changed) {
    console.log("tagHints.value: ", tagHints, JSON.stringify(tagHints.value));
    localStorage.setItem("tags", JSON.stringify(tagHints.value));
  }
  tags.value.splice(0, tags.value.length);
  setTimeout(() => {
    restart();
  }, timeout);
}

function restart() {
    guess_begin.value = false;
    showCongradulation.value = false;
    number.value = random_number_string(current_number_len.value);
    tags.value.splice(0, tags.value.length);
    guessed.value = false;
    guessed_number.value = "";
}

function random_number_string(len) {
    var tmpStr = "";
    tmpStr += Math.floor(Math.random()*9 + 1);
    for (var i = 0; i < len - 1; i += 1) {
        tmpStr += Math.floor(Math.random()*10);
    }
    return tmpStr;
}

function deleteTag(tagName) {
    delete tagHints.value[tagName];    
    localStorage.setItem("tags", JSON.stringify(tagHints.value));
}

function add_tag(tag) {
  if (tags.value.length < 4) {
    tags.value.push(tag);
  }
  console.log("add tag: ", tag, " len= ", tags.value.length);
}
</script>

<template>
  <div class="container-lg text-center">
    <div class="row">
      <div class="col-4">
        <div class="row">
            <div class="col">
              <p>数字长度: </p>
            </div>
            <div class="col">
              <p class="btn btn-primary rounded-pill">{{ current_number_len }}</p>
            </div>
        </div>
        <div class="row" v-if="!guess_begin">
            <!-- <GuessDisplay :number="number" v-model="tags" @ready-guess="guess_begin=true;" /> -->
            <GuessDisplayNew :number="number" @ready-guess="guess_begin=true;" @add-tag="add_tag" />
        </div>
        <div v-if="guess_begin">
        <div class="row">
            <div class="col-2">
              <p>提示: </p>
            </div>
            <div class="col">
              <button class="btn btn-primary rounded-pill" v-for="item in tags" > {{ item.name }}</button>
            </div>
        </div>
        <input v-model="guessed_number" placeholder="edit me" /><button class="btn btn-primary rounded-pill" @click="check">确定</button>
        <!-- <p>你猜的数字: </p><p class="btn btn-primary rounded-pill">{{ guessed_number }}</p> -->
        <p class="btn btn-success" v-if="guessed && showCongradulation">恭喜你答对了！！！</p>
        <p class="btn btn-warning" v-if="guessed && !showCongradulation">很遗憾猜错了！！！</p>
        <!-- <p>{{ random_number_string(3) }}</p> -->
        </div>
      </div>
      <div class="col-3" id="tag-hints">
        <TagList :tagHints="tagHints" @delete-tag="deleteTag" @select-tag="(item) => {if (tags.length<4) {tags.push(item)}}"/>
      </div>
    </div>
  </div>
</template>
