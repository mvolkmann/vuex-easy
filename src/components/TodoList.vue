<template>
  <div>
    <h2>To Do List</h2>
    <div>
      {{uncompletedCount}} of {{todos.length}} remaining
      <button
        @click="archiveCompleted"
      >Archive Completed</button>
    </div>
    <br>
    <form @submit.prevent>
      <input
        type="text"
        size="30"
        autofocus
        placeholder="enter new todo here"
        :value="todoText"
        @input="updateTodoText($event.target.value)"
      >
      <button :disabled="!todoText" @click="addTodo">Add</button>
    </form>
    <ul class="unstyled">
      <li :key="todo.id" v-for="todo in todos">
        <Todo
          :todo="todo"
          :onDeleteTodo="() => deleteTodo(todo.id)"
          :onToggleDone="() => toggleDone(todo)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable no-console */
import {mapGetters, mapState} from 'vuex';
import Todo from './Todo.vue';
import {createTodo} from '../util';

export default {
  name: 'TodoList',
  components: {Todo},
  computed: {
    ...mapGetters(['uncompletedCount']),
    ...mapState({
      todos: state => state.todos,
      todoText: state => state.todoText
    })
  },
  methods: {
    addTodo() {
      const todo = createTodo(this.$store.state.todoText);
      this.$store.commit('push', {path: 'todos', values: [todo]});
      this.$store.commit('set', {path: 'todoText', value: ''});
    },
    archiveCompleted() {
      this.$store.commit('filter', {path: 'todos', fn: t => !t.done});
    },
    deleteTodo(todoId) {
      this.$store.commit('filter', {path: 'todos', fn: t => t.id !== todoId});
    },
    toggleDone(todo) {
      const {id} = todo;
      this.$store.commit('map', {
        path: 'todos',
        fn: t => (t.id === id ? {...t, done: !t.done} : t)
      });
    },
    updateTodoText(text) {
      this.$store.commit('set', {path: 'todoText', value: text});
    }
  }
};
</script>
)
<style scoped>
button:disabled {
  background-color: gray;
  color: white;
}

ul.unstyled {
  list-style: none;
  margin-left: 0;
  padding-left: 0;
}
</style>
