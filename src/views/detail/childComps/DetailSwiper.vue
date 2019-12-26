<template>
    <swiper class="detail-item">
      <swiper-item v-for="item in topImages">
        <img :src="item" alt="" preview="detail-banner">
      </swiper-item>
    </swiper>
</template>
  
<script>
  import {Swiper, SwiperItem} from 'components/common/swiper/index'

  export default {
    name:	"",
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
  }
</script>
  
<style scoped>
  .detail-item {
    height: 300px;
    overflow: hidden;
  }

  
</style>