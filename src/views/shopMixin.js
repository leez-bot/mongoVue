import { mapState, mapMutations } from 'vuex'
export const shopMixin = {
  data () {
    return {
      query: '',
      refreshDelay: 100
    }
  },
  computed: {
    ...mapState(['shopCarList'])
  },
  // 方法
  methods: {
    ...mapMutations(['increase', 'decrease']),
    getCount (id) {
      const index = this.shopCarList.findIndex(item => item.id === id)
      return this.shopCarList[index] ? this.shopCarList[index].count : 0
    }
  }
}
