<template>
  <div>
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"/>
  </div>
</template>
  
<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'

  import {getDetail} from 'network/detail'

  export default {
    name:	"",
    data() {
      return {
        iid: null,
        topImages: []
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper
    },   
    created () {
      this.iid = this.$route.params.iid
      
      getDetail(this.iid).then(res => {
        console.log(res);
        this.topImages = res.result.itemInfo.topImages;
      })
    }
  } 
</script>
  
<style scoped>
  
</style>