<template>
  <div  v-loading="loading2" element-loading-text="加载中">
    <div v-if="shows" class="about">
      <h2>prismo</h2>
      <p>一个有强迫症的前端患者</p>
      <p><a href="https://github.com/elva2596" target="_blank">Github</a>&nbsp;&nbsp;<a
        href="https://juejin.im/timeline">掘金</a>&nbsp;&nbsp;<a href="http://www.jianshu.com/u/556ae9b7eaf5">简书</a></p>
      <h2>关于网站</h2>
      <p>本站服务端采用 express + mongoDB 搭建, 客户端采用Vue2全家桶</p>
      <p>主要功能包括: 后台登录, 注册, 管理, 标签, 文章, 支持markdown语法编辑, 支持代码高亮</p>
      <p>主要技术栈: express, mongoolass, vue2, vue2-router, vuex, axios, es6, element ui</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "about",
    data() {
      return {
        shows: false,
        loading2: true
      }
    },
    mounted() {
      this.$store.dispatch('changeHeadline', '关于');
      setTimeout(() => {
        this.$store.dispatch('showProgress', 100);
        this.loading2 = false;
        this.shows = true;
      })
    }
  }
</script>

<style lang="scss" scoped>
  .about{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 80%;
    max-width: 800px;
    margin: auto;
    h2{
      font-weight: 400;
      font-size: 3rem;
    }
    p{
      font-size: 1.6rem;
    }
    a{
      color: #4078c0;
      display: inline-block;
      padding: 0.2rem 0.4rem;
      font-size: 1.6rem;
    }
  }
</style>
