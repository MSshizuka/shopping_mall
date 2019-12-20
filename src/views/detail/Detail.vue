<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommends"/>
    </scroll>
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

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
  import {itemListenerMixin} from 'common/mixin'

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
      GoodsList
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
      }
    },
    mixins: [itemListenerMixin],
    destoryed() {
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    }
  } 
</script>
  
<style scoped>
  .detail {
    position: fixed;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px);
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>