<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-ico"></slot></div>
    <div v-else><slot name="item-ico-active"></slot></div>
    <div :style="fontColor"><slot name="item-text"></slot></div>
  </div>
</template>
  
<script>
  export default {
    name:	"",
    props: {
      path: String,
      textColor: {
        type: String,
        default: 'green'
      }
    },
    methods: {
      itemClick () {
        // console.log(this.$router)
        this.$router.push(this.path);
      }
    },
    computed: {
      isActive () {
        return this.$route.path.includes(this.path)
      },
      fontColor () {
        return this.isActive ? 'color:' + this.textColor : {}
      }
    }
  }
</script>
  
<style scoped>
  .tab-bar-item {
    flex: 1;
  }

  .tab-bar-item img {
    width: 22px;
    height: 22px;
    vertical-align: middle;
    margin: 4px 0 3px;
  }
</style>