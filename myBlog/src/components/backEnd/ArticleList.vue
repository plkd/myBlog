<template>
  <el-row>
    <el-row>
      <el-col :span="24">
        <el-button size="small" type="primary" @click="createArticle">创建文章</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table align="center" :data="articleLists" v-loading="listLoading" element-loading-text="拼命加载中">
          <el-table-column type="index" width="60"></el-table-column>
          <el-table-column prop="created_at" min-width="200" label="创建时间"></el-table-column>
          <el-table-column prop="classify" min-width="150" label="所属分类"></el-table-column>
          <el-table-column prop="title" min-width="180" label="文章标题"></el-table-column>
          <el-table-column min-width="180" label="操作">
            <template slot-scope="scope">
              <el-button size="small" @click="read(scope.row._id)">查看</el-button>
              <el-button size="small" type="primary" @click="editArticle(scope.row._id)">编辑</el-button>
              <el-button size="small" type="danger" @click="remove(scope.row._id)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24" class="page">
        <el-pagination layout="prev, pager, next" @current-change="handle" :total="total" :page-size="limit"
                       style="float:right;"></el-pagination>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
  import axios from 'axios'
  import NProgress from 'nprogress'
  import api from '../../api'

  export default {
    name: "article-list",
    data() {
      return {
        articleLists: [],
        total: 0,
        page: 1,
        limit: 10,
        listLoading: false
      }
    },
    methods: {
      handle(val) {
        this.page = val;
        this.getLists();
      },
      getLists() {
        this.listLoading = true
        api.getArticleList({
          page: this.page,
          limit: this.limit
        }).then(({data: {articleLists, total}}) => {
          setTimeout(() => {
            this.listLoading = false;
            this.articleLists = articleLists;
            this.total = total;
          }, 500)
        })
      },
      read(id) {
        this.$router.push({path: `/article/${id}`})
      },
      remove(id) {
        this.$confirm('确认要删除吗?', '提醒', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'waring'
        }).then(() => {
          this.listLoading = true;
          NProgress.start();
          api.removeOneArticle({id}).then(() => {
            this.listLoading = false;
            NProgress.done();
            this.$notify({
              title: '成功',
              message: "删除成功",
              type: 'success'
            });
            this.getLists();
          })
        }).catch(err => {
          throw new Error(err.toString())
        })
      },
      createArticle() {
        this.$router.push({ path: '/admin/articleCreate'})
      },
      editArticle(id) {
        this.$router.push({ path: `/admin/articleEdit/${id}`})
      }
    },
    mounted() {
      this.getLists();
    }
  }
</script>

<style scoped>

</style>
