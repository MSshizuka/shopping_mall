<template>
  <div class="goods-list">
    <goods-list-item v-for="item in goods" :item="item"/>
  </div>
</template>
  
<script>
  import GoodsListItem from './GoodsListItem'

  export default {
    name:	"",
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>
  
<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;  
  }


</style>