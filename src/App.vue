<template>
  <div id="app">
    <TodoList/>
    <!--Test :name="name"/-->
    <button @click="changeName">Change</button>
  </div>
</template>

<script>
/* eslint-disable no-console */
//import Test from './components/Test.vue';
import TodoList from './components/TodoList.vue';
import store from './store';

export default {
  name: 'app',
  components: {
    TodoList
    //Test
  },
  data: () => {
    return {name: 'start'};
  },
  methods: {
    changeName() {
      this.name = 'T' + Date.now();
    }
  },
  store
};
</script>

<style>
#app {
  font-family: sans-serif;
  padding-left: 10px;
}
</style>
