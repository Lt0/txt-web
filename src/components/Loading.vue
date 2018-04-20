<template>
  <div>
    <Spin fix>
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>Loading...</div>
    </Spin>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
      //msg: '正在加载'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
</style>
