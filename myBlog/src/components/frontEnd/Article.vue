<template>
  <article v-loading="loading2" element-loading-text="加载中" class="article-wrap article">
    <header>
      <div class="home-title">{{oneArticle.title}}</div>
      <div>
        <p class="home-creatAt">{{oneArticle.created_at}}</p>
      </div>
    </header>
    <section v-html="oneArticle.contentToMark" class="home-main"></section>
  </article>
</template>

<script>
  import api from '../../api'

  export default {
    name: "article",
    data() {
      return {
        oneArticle: {},
        loading2: true
      }
    },
    created() {
      api.getOneArticleNoAuth({id: this.$route.params.id})
        .then(({data: {code, post}}) => {
          if (code === 200) {
            setTimeout(() => {
              this.loading2 = false;
              this.oneArticle = post;
            })
          }
        })
    }
  }
</script>

<style scoped>
  article{
    margin: auto;
    width: 80%;
    max-width: 800px;
    padding: 2rem;
  }
  .home-title{
    font-size: 3rem;
    font-weight: 400;
    color:#404040;
    padding:1rem 0;
  }
  .home-creatAt{
    font-family: "Comic Sans MS", curslve, sans-serif;
    padding:0.6rem 0;
    font-size: 1.8rem;
    color:#7f8c8d;
    /*background: red;*/
    margin:0;
  }
  .home-main{
    font-size: 1.6rem;
    line-height: 1.6em;
  }

  @media screen and (max-width: 786px) {
    article{
      padding: .5rem 0;
    }
  }
</style>
