<template>
  <div class="tag-wrap" v-loading="loading2" element-loading-text="加载中">
    <ul class="tags-list">
      <li v-for="(item, index) in items">
        <a class="tag-btn" :to="`/tags/${item._id}`" @click.prevent="gets(index, item.classify)" :class="{'active':index==selected}">{{item.classify}}</a>
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
        <footer>
          <router-link class="tags-readMore" :to="{path: `/article/${item._id}`}">阅读全文>></router-link>
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
        this.$store.dispatch('changeHeadline', classify)
      }
    }
  }
</script>

<style scoped>

</style>
