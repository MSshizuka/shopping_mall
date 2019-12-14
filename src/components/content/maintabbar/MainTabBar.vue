<template>
  <tab-bar>
      <tab-bar-item path="/home" textColor="#f55777">
        <img src="~assets/img/tabbar/home.svg" alt="" slot="item-ico">
        <img src="~assets/img/tabbar/home_active.svg" alt="" slot="item-ico-active">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" textColor="#f55777">
        <img src="~assets/img/tabbar/category.svg" alt="" slot="item-ico">
        <img src="~assets/img/tabbar/category_active.svg" alt="" slot="item-ico-active">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" textColor="#f55777">
        <img src="~assets/img/tabbar/cart.svg" alt="" slot="item-ico">
        <img src="~assets/img/tabbar/cart_active.svg" alt="" slot="item-ico-active">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" textColor="#f55777">
        <img src="~assets/img/tabbar/profile.svg" alt="" slot="item-ico">
        <img src="~assets/img/tabbar/profile_active.svg" alt="" slot="item-ico-active">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>
  
<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

  export default {
    name:	"",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>
  
<style scoped>
  
</style>