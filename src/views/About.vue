<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p v-for="item in list" v-bind:key="item._id">
      {{ item.name }} : {{ item.age }}
    </p>
    <button @click="submit">提交</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    submit () {
      axios.post('/addUser').then(res => {
        console.log('添加成功了')
      })
    }
  },
  mounted () {
    axios.get('/users').then(res => {
      this.list = res.data.result.list
    })
  }
}
</script>
