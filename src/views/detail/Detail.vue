<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @themeClick="themeClick" ref="detailNav"/>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>
  
<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
  import {itemListenerMixin, backTopMixin} from 'common/mixin'

  export default {
    name:	"Detail",
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeOffset: [],
        currentIndex: null
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailCommentInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      Scroll,
      GoodsList,
      DetailBottomBar
    },   
    created () {
      //1.获取iid
      this.iid = this.$route.params.iid
      
      //2.请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result;
        this.topImages = res.result.itemInfo.topImages;

        //创建商品信息对象
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //创建店铺信息对象
        this.shop = new Shop(data.shopInfo)

        //保存商品的详情诗句
        this.detailInfo = data.detailInfo;
        
        //获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //获取评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      //3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    methods: {
      imageLoad () {
        this.$refs.scroll.refresh()

        this.themeOffset = []
        this.themeOffset.push(0)
        this.themeOffset.push(this.$refs.params.$el.offsetTop * 1 - 44)
        this.themeOffset.push(this.$refs.comment.$el.offsetTop * 1 - 44)
        this.themeOffset.push(this.$refs.recommend.$el.offsetTop * 1 - 44)
        this.themeOffset.push(Number.MAX_VALUE)
        // console.log(this.themeOffset)
      },

      themeClick (index) {
        // console.log(index)
        this.$refs.scroll.scrollTo(0, -this.themeOffset[index], 500)
      },

      contentScroll (position) {
        const length = this.themeOffset.length - 1
        let positionY = -position.y
        for(let i = 0; i < length; i++) {
          if(this.currentIndex !== i && (positionY >= this.themeOffset[i] &&positionY < this.themeOffset[i + 1] + 47)) {
            this.currentIndex = i;
            this.$refs.detailNav.currentIndex = this.currentIndex
          }
        }

        // if (positionY < this.themeOffset[1]) {
        //   this.currentIndex = 0;
        // } else if (positionY < this.themeOffset[2]) {
        //   this.currentIndex = 1;
        // } else if (positionY < this.themeOffset[3]) {
        //   this.currentIndex = 2;
        // } else {
        //   this.currentIndex = 3;
        // }
        // this.$refs.detailNav.currentIndex = this.currentIndex

        this.showBackTop (position)
      },
      addToCart () {
        //获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0],
        product.title = this.goods.title,
        product.desc = this.goods.desc,
        product.price = this.goods.realPrice
        product.iid = this.iid

        //将商品添加到购物车里
        this.$store.dispatch('addCart', product)
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    destoryed() {
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    }
  } 
</script>
  
<style scoped>
  .detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>