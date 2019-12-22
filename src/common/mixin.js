import {debounce} from 'common/utils'
import {Back_Position} from 'common/const'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data () {
    return {
      itemImgListener: null
    }
  },
  mounted () {
    const refresh = debounce(this.$refs.scroll.refresh, 100)

    this.itemImgListener = () => {     
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    // console.log('混入')
  },
}

export const backTopMixin = {
  
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick () {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    showBackTop (position) {
      this.isShowBackTop = position.y < -Back_Position 
    },
  }
}