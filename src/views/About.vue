<template>
  <div class="about">
    <div class="page-wrapper">
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
      <router-view />
    </div>
    <div class="chiken-wrapper">
      <div class="total-price">商品列表<button @click="doChildDo">点我调用子组件方法</button></div>
      <div class="chiken-item" v-for="(item, index) in chikenList" :key="index">
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
      <button @click="submitOrder">提交订单</button>
      <hr>
      <!-- 购物车子组件 -->
      <ChildComponent msg='hehe' :totalPrice="totalPrice" @childRandom="getChildValue" ref="mychild" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { handleResponse } from '../util/util.js'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import ChildComponent from './childComponent'

export default {
  data () {
    return {
      list: [],
      user: { name: '', age: '' },
      filter: { page: 1, pageSize: 10, sort: 1 },
      chikenList: [
        {
          id: 1, name: '叫了个炸鸡', count: 0, price: 5
        },
        {
          id: 2, name: '叫了个中翅', count: 0, price: 3
        },
        {
          id: 3, name: '叫了个童子鸡', count: 0, price: 8
        },
        {
          id: 4, name: '叫了个大鸡排', count: 0, price: 6
        },
        {
          id: 5, name: '叫了个大鸡腿', count: 0, price: 5
        },
        {
          id: 6, name: '叫了杯快乐水', count: 0, price: 2
        },
        {
          id: 7, name: '叫了个大盘鸡', count: 0, price: 999
        },
        {
          id: 8, name: '叫了个大切糕', count: 0, price: 99999
        }
      ],
      randomCount: ''
    }
  },
  computed: {
    ...mapState(['shopCarList']),
    ...mapGetters(['totalPrice'])
  },
  methods: {
    ...mapMutations(['increase', 'decrease']),
    ...mapActions(['submitOrderSync']),
    getCount (id) {
      const index = this.shopCarList.findIndex(item => item.id === id)
      return this.shopCarList[index] ? this.shopCarList[index].count : 0
    },
    getChildValue (value) {
      console.log('接收到从子组件传递过来的数据了：' + value)
    },
    doChildDo () {
      this.$refs.mychild.parentHandleclick('嘿嘿嘿')
    },
    submitOrder () {
      console.log('提交订单中...')
      this.submitOrderSync()
    },
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
  components: { ChildComponent },
  mounted () {
    this.getUsers()
  }
}
</script>

<style lang="scss" scoped>
  .about{
    display: flex;
    .page-wrapper{
      flex: 1;
    }
    .chiken-wrapper{
      flex: 1;
    }
  }
</style>
