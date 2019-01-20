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
import {createTodo} from './util';
import {createStore} from './vuex-easy/';

const initialState = {
  colors: {
    blue: false,
    green: false,
    red: false
  },
  like: true,
  todoText: '',
  todos: []
};
const store = createStore(initialState);

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
  mounted() {
    this.$store.commit('push', {
      path: 'todos',
      values: [createTodo('learn Vue', true), createTodo('build a Vue app')]
    });
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
