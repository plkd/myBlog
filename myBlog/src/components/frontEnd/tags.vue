<template>
  <div class="tag-wrap" v-loading="loading2" element-loading-text="加载中">
    <ul class="tags-list">
      <li v-for="(item, index) in items">
        <a class="tag-btn" :to="`/tags/${item._id}`" @click.prevent="gets(index, item.classify)"
           :class="{'active':index==selected}">{{item.classify}}</a>
      </li>
    </ul>
    <transition-group name="list" tag="div">
      <article v-for="item in articleLists" v-if="show" :key="item._id">
        <header>
          <div>
            <router-link :to="{path:`/article/${item._id}`}" class="tags-title">
              {{item.title}}
            </router-link>
          </div>
          <div>
            <p class="tags-createdAt">{{item.created_at}}</p>
          </div>
        </header>
        <section v-html="item.contentToMark" class="tags-main"></section>
        <footer class="tags-readMore">
          <router-link  :to="{path: `/article/${item._id}`}">阅读全文>></router-link>
        </footer>
      </article>
    </transition-group>
  </div>
</template>

<script>
  import api from '../../api'
  import vfoot from './vfooter'

  export default {
    name: "tags",
    data() {
      return {
        items: [],
        articleLists: [],
        selected: 9,
        show: true,
        loading2: true
      }
    },
    methods: {
      gets(index, classify) {
        this.$store.dispatch('changeHeadline', classify);
        this.show = false;
        this.selected = index;
        this.getPage(classify)
      },
      getPage(classify) {
        api.getArticlesByClassify({classify})
          .then(({data: {code, articleLists}}) => {
            if (code === 200) {
              this.articleLists = articleLists
              setTimeout(() => {
                this.show = true;
              }, 200)
            }
          }).catch(err => {})
      }
    },
    mounted() {
      this.$store.dispatch('changeHeadline', '标签');
      api.getNoAuthClass().then(({data: {code, list}}) => {
        if (code === 200) {
          setTimeout(() => {
            this.loading2 = false;
            this.items = list;
            this.getPage()
          }, 200)
        }
      }).catch(err => {
      })
    }
  }
</script>

<style scoped lang="scss">
  .tag-wrap {
    width: 80%;
    max-width: 800px;
    margin: auto;
    padding: 2rem;
    font-size: 1.6rem;
  }

  .tags-title {
    font-size: 2.6rem;
  }

  .tags-createdAt{
    font-family: "Comic Sans MS", curslve, sans-serif;
    padding: 0.6rem 0;
    font-size: 1.8rem;
    color: #7f8c8d;
  }

  .tags-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 0;
    li {
      margin: 5px 10px;
    }
  }
  .tags-readMore{
    font-size: 2rem;
    color:#919191;
    font-weight: 600;
    text-align: right;
  }

  .tag-btn {
    color: rgba(0, 0, 0, 0.8);
    background: #f7f7f7;
    font-size: 1.8rem;
    padding: .6rem 1.5rem;
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    -ms-transition: all 0.4s;
    -o-transition: all 0.4s;
    transition: all 0.4s;
    cursor: pointer;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 8px;
    border: 1px solid #d2d2d2;
    &:hover{
      background: #555555;
      color: #fff;
    }
  }

  .active {
    background: #555555;
    color: #fff;
  }
</style>
