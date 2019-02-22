<template>
  <div class="books">
    <ul class="books-wrapper">
      <li class="book-item" v-for="(book) in books" :key="book._id">
        <h2>{{ book.title }}</h2>
        <div class="content">{{ book.content }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { handleResponse } from '../util/util.js'
export default {
  // 数据
  data () {
    return {
      books: []
    }
  },
  // 方法
  methods: {
    getBooks () {
      axios.get('/books').then(res => {
        this.books = handleResponse(res).list
      })
    }
  },
  // 周期
  mounted () {
    this.getBooks()
  }
}
</script>

<style lang="sass" scoped>

</style>
