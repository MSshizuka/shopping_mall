<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <tab-control :titles="['流行','精选','新款']" 
                  @tabClick="tabClick" 
                  ref="tabControl1"
                  class="tab-control"
                  v-show="isShowTabControl"/>
    <scroll class="content" 
            ref="scroll" 
            @scroll="contentScroll" 
            :probe-type="3"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行','精选','新款']" @tabClick="tabClick" ref="tabControl2"/>
      <goods-list :goods="showgoods"/>  
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>
  
<script>
//子组件相关
import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView';
import FeatureView from './childComps/FeatureView';
//公共组件相关
import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl';
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
// import BackTop from 'components/content/backTop/BackTop'

//功能方法相关
import {getHomeMultidata, getHomeGoods} from 'network/home';
import {itemListenerMixin, backTopMixin} from 'common/mixin'



export default {
  name: "",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list:[]},
        'new': {page: 0, list:[]},
        'sell': {page: 0, list:[]}
      },
      currentType: 'pop',
      // isShowBackTop: false,
      isShowTabControl: false,
      contentOffsetTop: 0,
      scrollY: 0,
      
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  computed: {
    showgoods () {
      return this.goods[this.currentType].list
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop
  },
  created() {
    this.getHomeMultidata();

    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  methods: {
    //事件监听相关
    tabClick (index) {
      switch(index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'sell';
          break;
        case 2:
          this.currentType = 'new';
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    // backClick () {
    //   this.$refs.scroll.scrollTo(0, 0, 500)
    // },

    contentScroll (position) {
      this.isShowTabControl = (-position.y) > this.contentOffsetTop
      this.showBackTop(position)
    },
    loadMore () {
      this.getHomeGoods(this.currentType)
    },

    swiperImageLoad () {
      this.contentOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    //网络请求相关
    getHomeMultidata () {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods (type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page++
        this.$refs.scroll.finish()
      })
    }
  },
  activated () {
    // console.log(this.scrollY)
    this.$refs.scroll.refresh() 
    this.$refs.scroll.scrollTo(0, this.scrollY, 0)  
    this.$refs.scroll.refresh() 
  },
  deactivated () {
    this.scrollY = this.$refs.scroll.getScrollY();

    this.$bus.$off('itemImageLoad', this.itemImgListener)
  }
};
</script>
  
<style scoped>
#home {
  width: 100%;
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
  /* position: fixed;
  z-index: 10;
  left: 0;
  right: 0;
  top: 0; */
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* 
.content {
  height: 100%;
  overflow: hidden; 
} */

.tab-control {
  position: relative;
  background-color: #fff;
  z-index: 9;
}

</style>