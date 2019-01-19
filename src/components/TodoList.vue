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
      <!-- <input
        type="text"
        size="30"
        autofocus
        placeholder="enter new todo here"
        :value="todoText"
        @input="setTodoText($event.target.value)"
      >-->
      <Input size="30" autofocus placeholder="enter new todo here" path="todoText"/>
      <button :disabled="!todoText" @click="addTodo">Add</button>
    </form>
    <ul class="unstyled">
      <li :key="todo.id" v-for="(todo, index) in todos">
        <Todo
          :todo="todo"
          :onDeleteTodo="() => deleteTodo(todo.id)"
          :onToggleDone="() => toggleDone(index)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable no-console */
import {mapGetters, mapState} from 'vuex';
import {Input, vxe} from '../vuex-easy/';
import Todo from './Todo.vue';
import {createTodo} from '../util';

export default {
  name: 'TodoList',
  components: {Input, Todo},
  computed: {
    ...mapGetters(['uncompletedCount']),
    ...mapState({
      todos: state => state.todos,
      todoText: state => state.todoText
    })
  },
  methods: {
    addTodo() {
      console.log(
        'TodoList.vue addTodo: this.$store.state =',
        this.$store.state
      );
      const todo = createTodo(this.todoText);
      vxe.push('todos', todo);
      vxe.set('todoText', '');
    },
    archiveCompleted() {
      vxe.filter('todos', todo => !todo.done);
    },
    deleteTodo(todoId) {
      vxe.filter('todos', todo => todo.id !== todoId);
    },
    setTodoText(text) {
      vxe.set('todoText', text);
    },
    toggleDone(index) {
      vxe.toggle(`todos.${index}.done`);
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
