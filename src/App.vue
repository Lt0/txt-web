<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

@font-face {
    font-family: 'dongqingheiti';
    src: url('/static/fonts/dongqingheiti.woff2');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'fangzhengheijianti';
    src: url('/static/fonts/fangzhengheijianti.woff2');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'fangzhengfangsongjianti';
    src: url('/static/fonts/fangzhengfangsongjianti.woff2');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'fangzhengshusongjianti';
    src: url('/static/fonts/fangzhengshusongjianti.woff2');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'siyuanheiti-Regular';
    src: url('/static/fonts/siyuanheiti-Regular.woff2');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'siyuanheiti-Thin';
    src: url('/static/fonts/siyuanheiti-Thin.woff2');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'siyuanheiti-Bold';
    src: url('/static/fonts/siyuanheiti-Bold.woff2');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'wenquanzhenghei';
    src: url('/static/fonts/wenquanzhenghei.woff2');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'wenquanweimihei';
    src: url('/static/fonts/wenquanweimihei.woff2');
    font-weight: normal;
    font-style: normal;
}


#app {
  
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.ivu-select-dropdown{
  max-height: 80vh !important;
}
</style>
