<template>
  <div class="todo-container">
    <section class="todoapp">
      <header class="header">
        <h1>{{ title }}</h1>
        <label>
          <input class="new-todo" placeholder="What needs to be done?" autofocus @keyup.enter="createTodo">
        </label>
      </header>
      
      <!-- This section should be hidden by default and shown when there are todos -->
      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <!-- These are here just to show the structure of the list items -->
          <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
          <li v-for="(item,index) in filteredItems" :key="index"
              :class="{ completed: item.isDone, editing: editing === item}">
            <div class="view">
              <label>
                <input class="toggle" type="checkbox" @change="check(item)" v-model="item.isDone">
              </label>
              <label @dblclick="startEditing(item)">{{ item.title }}</label>
              <button class="destroy" @click="destroyTodo(item)"></button>
            </div>
            <label>
              <input class="edit"
                     @keyup.esc="cancelEditing"
                     @keyup.enter="finishEditing"
                     @blur="finishEditing"
                     :value="item.title">
            </label>
          </li>
        </ul>
      </section>
      <!-- This footer should hidden by default and shown when there are todos -->
      <footer class="footer">
        <!-- This should be `0 items left` by default -->
        <span class="todo-count"><strong>{{ countItemLeft }}</strong> item left</span>
        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
          <li>
            <a @click="filter='all'" :class="{selected: filter === 'all'}">All</a>
          </li>
          <li>
            <a @click="filter='active'" :class="{selected: filter === 'active'}">Active</a>
          </li>
          <li>
            <a @click="filter='completed'" :class="{selected: filter === 'completed'}">Completed</a>
          </li>
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button v-if="countCompleted > 0" @click="destroyCompleted" class="clear-completed">Clear completed</button>
      </footer>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <!-- Remove the below line ↓ -->
      <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
      <!-- Change this out with your name and url ↓ -->
      <p>Created by <a href="http://todomvc.com">you</a></p>
      <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
    <b-button @click="logout">Logout</b-button>
  </div>
</template>

<script>
  import firebase from 'firebase';
  
  export default {
    name: 'todo',
    data() {
      return {
        title: 'MUIC!',
        items: [
          {title: 'Loading...', isDone: false}
        ],
        editing: null,
        filter: 'all',
        todoRef: null,
      }
    },
    mounted() {
      const db = firebase.database();
      const uid = firebase.auth().currentUser.uid;
      this.todoRef = db.ref(`todos/${uid}`);
      this.todoRef.on('value', (snapshot) => {
        this.items = [];
        snapshot.forEach((item) => {
          const t = item.val();
          t['key'] = item.key;
          this.items.push(t);
        })
      })
    },
    methods: {
      createTodo(event) {
        const text = event.target;
        this.todoRef.push({title: text.value, isDone: false});
        text.value = '';
      },
      startEditing(todo) {
        this.editing = todo;
      },
      finishEditing(event) {
        if (!this.editing) {
          return;
        }
        const text = event.target;
        this.editing.title = text.value;
        this.todoRef.child(this.editing.key).update({
          title: text.value
        });
        this.editing = null;
      },
      cancelEditing() {
        this.editing = null;
      },
      destroyTodo(todo) {
        this.todoRef.child(todo.key).remove()
      },
      check(item) {
        this.todoRef.child(item.key).update({
          isDone: item.isDone
        })
      },
      destroyCompleted() {
        return this.items.reduce((a, item) => {
          if (item.isDone) {
            this.destroyTodo(item)
          }
        }, 0)
      },
      async logout() {
        try {
          await firebase.auth().signOut();
          await this.$router.replace('/login')
        } catch (error) {
          //Do nothing
        }
      },
    },
    computed: {
      countItemLeft() {
        return this.items.reduce((a, item) => {
          if (item.isDone) return a;
          else return a + 1
        }, 0)
      },
      filteredItems() {
        return this.items.filter((item) => {
          if (this.filter === 'all') return true;
          else if (this.filter === 'active' && !item.isDone) return true;
          else if (this.filter === 'completed' && item.isDone) return true;
          return false
        })
      },
      countCompleted() {
        return this.items.length - this.countItemLeft;
      }
    }
  }
</script>

<style scoped>
  .todo-container {
    width: 500px;
    margin: auto;
    padding: 20px;
  }
  
  .footer {
    height: 40px;
  }
</style>