<template>
  <div class="books">
    <ul class="books-wrapper">
      <li class="book-item" v-for="(book) in books" :key="book._id">
        <h2>{{ book.title }}</h2>
        <div class="content">{{ book.content }}</div>
      </li>
    </ul>
    <div class="brother-wrapper">
      <p>活动详情</p>
      <div class="brother-item" v-for="(item, index) in saleList" :key="index">
        <p class="chiken-name">
          <span v-text="item.name" />
          &nbsp;&nbsp;
          <span>{{getCount(item.id)}}个({{item.price}}元/个)</span>
          &nbsp;&nbsp;
          <button @click="decrease(item)" v-if="getCount(item.id) > 0">-</button>
          &nbsp;
          <button @click="increase(item)">+</button>
        </p>
      </div>
      <hr>
      <!-- 购物车子组件 -->
      <ChildComponent />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { handleResponse } from '../util/util.js'
// import { mapState, mapMutations } from 'vuex'
import ChildComponent from './childComponent'
import { shopMixin } from './shopMixin'
export default {
  mixins: [ shopMixin ],
  // 数据
  data () {
    return {
      books: [],
      saleList: [
        {
          id: 7, name: '叫了个大盘鸡', count: 0, price: 999
        },
        {
          id: 8, name: '叫了个大切糕', count: 0, price: 99999
        }
      ]
    }
  },
  // computed: {
  //   ...mapState(['shopCarList'])
  // },
  // 方法
  methods: {
    // ...mapMutations(['increase', 'decrease']),
    // getCount (id) {
    //   const index = this.shopCarList.findIndex(item => item.id === id)
    //   return this.shopCarList[index] ? this.shopCarList[index].count : 0
    // },
    getBooks () {
      axios.get('/books').then(res => {
        this.books = handleResponse(res).list
      })
    }
  },
  // 周期
  mounted () {
    this.getBooks()
  },
  components: { ChildComponent }
}
</script>

<style lang="scss" scoped>
  .books{
    display: flex;
    .books-wrapper{
      flex: 1
    }
    .brother-wrapper{
      flex: 1
    }
  }
</style>
