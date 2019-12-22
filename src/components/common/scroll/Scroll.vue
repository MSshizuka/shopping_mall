<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
  
<script>
  import BScroll from 'better-scroll'
  export default {
    name:	"",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      } 
    },
    data() {
      return {
        scroll: null,
      }
    },
    mounted() {
      //创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      }),

      //监听滚动事件
      this.scroll.on('scroll', position => {
        this.$emit('scroll', position)
      })

      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finish () {
        this.scroll.finishPullUp()
      },
      refresh () {
        // console.log('---')
        this.scroll && this.scroll.refresh()
      },
      getScrollY () {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>
  
<style scoped>
</style>