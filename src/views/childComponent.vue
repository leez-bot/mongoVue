<template>
  <div class="child-wrapper">
    <div class="child-component">我是一个子组件，这是我从父组件接收到的值：{{msg}}</div>
    <p>购物车({{totalPrice}}元)&nbsp;&nbsp;&nbsp;<button @click="clearShopCarList">清空购物车</button></p>
    <div class="child-item" v-for="(item, index) in shopCarList" :key="index">
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
    <button @click="goToFather">点我向父组件传参</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['shopCarList']),
    ...mapGetters(['totalPrice'])
  },
  props: [ 'msg' ],
  // watch: {
  //   'totalPrice' (newVal, oldVal) {
  //   }
  // },
  methods: {
    ...mapMutations(['increase', 'decrease', 'clearShopCarList']),
    getCount (id) {
      const index = this.shopCarList.findIndex(item => item.id === id)
      return this.shopCarList[index] ? this.shopCarList[index].count : 0
    },
    goToFather () {
      this.$emit('childRandom', Math.random() * 999)
    },
    parentHandleclick (value) {
      console.log('父组件调用子组件了：' + value)
    }
  }
}
</script>
