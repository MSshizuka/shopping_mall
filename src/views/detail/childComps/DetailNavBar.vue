<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles"  
             class="title-item"
             :class="{active: currentIndex === index}"
             @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>
  
<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name:	"",
    data() {
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    components:{
      NavBar
    },
    methods: {
      backClick () {
        this.$router.back()
      },
      titleClick (index) {
        this.currentIndex = index
        this.$emit('themeClick', index)
      }
    }
  }
</script>
  
<style scoped>
  .title {
    display: flex;
  }

  .title-item {
    flex: 1;
    font-size: 14px;
  }

  .back img {
    margin-top: 12px;
  }

  .active {
    color: var(--color-tint)
  }
</style>