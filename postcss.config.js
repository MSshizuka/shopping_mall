module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, //视窗的宽度，对应设计稿宽度(750)
      viewportHeight: 667, //高度
      unitPrecision: 5, //指定 px 转换成视窗单位值得小数位数
      viewportUnit: 'vw', //转换成得视窗单位
      selectorBlackList: ['tab-bar','tab-bar-item'],//不需要转换得组件
      minPixelValue: 1, //小于等于1px不转换
      mediaQuery: false, //是否允许在媒体查询中转换px
      exclude: [/TabBar/]
    },
  }
}

//1.在js中使用正则
//2.exclude中存放得元素必须时正则表达式
//3.按照排除的文件写对应的正则