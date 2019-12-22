<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-all"/>
      <span class="check-text">全选</span>
    </div>

    <div class="check-price">
      合计：{{totalPrice}}
    </div>

    <div class="check-calculate">
      去计算({{checkLenth}})
    </div>
  </div>
</template>
  
<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name:	"CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice () {
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((prev, next) => {
          return prev + next.price * next.count
        }, 0)
      },
      checkLenth () {
        return this.$store.state.cartList.filter(item => item.checked).length
      }
    }
  }
</script>
  
<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
    font-size: 14px;
  }

  .check-content {
    display: flex;
    width: 100px;
  }

  .check-all {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin: 10px;
  }

  .check-text {
    line-height: 42px;
  }

  .check-price {
    flex: 1;
  }

  .check-calculate {
    width: 100px;
    background-color: orangered;
    text-align: center;
  }
</style>