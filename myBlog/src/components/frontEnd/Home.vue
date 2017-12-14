<template>
  <div class="home-wrapper" v-loading="loading2" element-loading-text="加载中">
    <article v-for="item in items">
      <header>
        <div>
          <router-link :to="{path: `/article/${item._id}`}" class="home-title">
            {{item.title}}
          </router-link>
        </div>
        <div>
          <p class="home-createAt">{{item.created_at}}</p>
        </div>
      </header>
      <section class="home-main" v-html="item.contentToMark"></section>
      <footer>
        <router-link class="home-readMore" :to="{path: `/article/${item._id}`}">阅读全文</router-link>
      </footer>
    </article>
    <footer class="loadMore" v-if="loadMoreShow">
      <el-button type="primary" :loading="loadMoreFlag" @click="loadMore">{{loadMoreText}}</el-button>
    </footer>
  </div>
</template>

<script>
  import vhead from './vheader'
  import api from '../../api'
  import vfoot from './vfooter'

  export default {
    name: "home",
    data() {
      return {
        items: [],
        loading2: true,
        loadMoreFlag: false,
        loadMoreText: '加载更多',
        loadMoreShow: false,
        page: 1,
        limit: 10
      }
    },
    components: {
      vhead, vfoot
    },
    methods: {
      loadMore() {
        this.loadMoreText = '加载中';
        this.loadMoreFlag = true;
        this.page += 1;
        this.loadData(this.page, this.limit)
      },
      loadData(page, limit) {
        api.getArticleLists({page, limit})
          .then(({data: {code, articleLists, hasNext, hasPrev}}) => {
            if (code === 200) {
              setTimeout(() => {
                this.items = this.items.concat(articleLists);
                this.loading2 = false;
                if (hasNext) {
                  this.loadMoreShow = true;
                  this.loadMoreFlag = false;
                  this.loadMoreText = "加载更多";
                } else {
                  this.loadMoreShow = false
                }
              }, 200)
            }
          })
          .catch(err => {
          })
      }
    },
    mounted() {
      this.loadData(1, this.limit);
      this.$store.dispatch('changeHeadline', '主页');
    }
  }
</script>

<style scoped>
  h2,h4{
    margin:0;
  }
  .home-wrapper{
    margin:auto;
    list-style: none;
  }
  .home-wrapper article{
    padding-bottom: 1rem;
    border-bottom:1px solid #d2d2d2;
    margin-bottom: 2rem;
  }
  .home-title{
    display: block;
    font-size: 2.6rem;
    font-weight: 400;
    color:#404040;
    padding:.8rem 0;
  }
  .home-createAt{
    font-family: "Comic Sans MS", curslve, sans-serif;
    font-size: 1.6rem;
    color:#7f8c8d;
    margin: 0;
  }
  .home-main{
    font-size: 1.6rem;
    color:#34495e;
    line-height: 1.6em;
    /*padding:0.6rem 0;*/
  }
  footer{
    text-align: right;
  }
  .home-readMore{
    font-size: 2rem;
    color:#919191;
    font-weight: 600;
  }
  .loadMore {
    margin:4rem 0 0 0;
    display: flex;
    display: -webkit-flex;
  }
  .loadMore button {
    cursor: pointer;
    outline:none;
    padding:1rem;
    margin:auto;
    border-radius:.5rem;
    color:rgba(0, 0, 0, 1);
    border:1px solid #bfcbd9;
    background-color: #f7f7f7;
  }
  .home-title:hover{
    opacity: 0.5;
  }
  .home-readMore:hover{
    opacity: 0.6;
  }
</style>
