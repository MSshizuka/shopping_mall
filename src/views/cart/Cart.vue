<template>
  <div class="cart">
      <nav-bar class="cart-nav-bar">
        <div slot="center">购物车({{getCartLength}})</div>
      </nav-bar>

      <cart-list/>

      <cart-bottom-bar/> 
  </div>
</template>
  
<script>
  import NavBar from 'components/common/navbar/NavBar'

  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  import {mapGetters} from 'vuex'

  export default {
    name:	"Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters([
        'getCartLength'
      ])
    }
  }
</script>
  
<style scoped>
  .cart {
    height: 100vh
  }

  .cart-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-size: 18px;
  }

  /* .cart-list {
    height: calc(100% - 44px - 49px)
  } */
</style>