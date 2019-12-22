<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
      <ul class="bar-right">
        <div class="cart" @click="addToCart">加入购物车</div>
        <div class="buy">购买</div>
      </ul>
    </div>
  </div>
</template>
  
<script>
  export default {
    name:	"",
    methods: {
      addToCart () {
        this.$emit('addToCart')
      }
    }
  }
</script>
  
<style scoped>
  .bottom-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 49px;
    line-height: 49px;
    background-color: #fff;
    display: flex;
    text-align: center;
  }

  .bar-item {
    flex: 1;
    display: flex;
  }

  .bar-item>div {
    flex: 1;
  }

  .bar-left .text {
    font-size: 13px;
  }

  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 6px auto -14px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }

  .bar-left .service {
    background-position: 0 -53px;
  }

  .bar-left .shop {
    background-position: 0 -98px;
  }

  .bar-right {
    display: flex;
    width: 170px;
    font-size: 15px;
    color: #fff;
  }

  .bar-right .cart {
    flex: 1;
    background-color: #ffe817;
    color: #333
  }

  .bar-right .buy {
    flex: 1;
    background-color: #f69;
  }

</style>