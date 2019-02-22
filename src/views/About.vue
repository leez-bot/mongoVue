<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>
      <button @click="toggleSort">更改排序方式</button>
    </p>
    <p v-for="item in list" v-bind:key="item._id" @click="deleteItem(item._id)">
      {{ item.name }} : {{ item.age }}
    </p>
    <p>
      每页条数：
      <input type="number" name="" id="" v-model="filter.pageSize">
    </p>
    <button @click="getUsers">查询</button>
    <p>姓名：<input type="text" v-model="user.name"></p>
    <p>年龄：<input type="number" v-model="user.age"></p>
    <button @click="submit">提交</button>
  </div>
</template>

<script>
import axios from 'axios'
import { handleResponse } from '../util/util.js'
export default {
  data () {
    return {
      list: [],
      user: {
        name: '',
        age: ''
      },
      filter: {
        page: 1,
        pageSize: 10,
        sort: 1
      }
    }
  },
  methods: {
    changeSize (num) {
      this.filter.pageSize = num
      this.getUsers()
    },
    toggleSort () {
      if (this.filter.sort === 1) {
        this.filter.sort = -1
      } else {
        this.filter.sort = 1
      }
      this.getUsers()
    },
    getUsers () {
      axios.get('/users', {
        params: this.filter
      }).then(res => {
        this.list = handleResponse(res).list
      })
    },
    submit () {
      const user = {
        ...this.user,
        age: Number(this.user.age)
      }
      axios.post('/users/addUser', user).then(res => {
        this.getUsers()
      })
    },
    deleteItem (id) {
      axios.post('users/deleteUser', {
        id
      }).then(res => {
        this.getUsers()
      })
    }
  },
  mounted () {
    this.getUsers()
  }
}
</script>
