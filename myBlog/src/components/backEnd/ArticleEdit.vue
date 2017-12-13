<template>
  <el-row>
    <el-col :span="24">
      <el-form ref="articleEdit" :model="article" :rules="editRules" v-loading="listLoading">
        <el-row style="margin-top: 20px">
          <el-col :span="10" :push="1">
            <el-form-item label="文章标题" label-width="90px" prop="title">
              <el-input v-model="article.title" placeholder="请在此处输入标题" style="width:260px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :push="3">
            <el-form-item label="所属分类" label-width="90px" prop="classify">
              <el-select v-model="article.classify" placeholder="请选择分类">
                <el-option v-for="item in classifyList" :label="item.classify" :value="item.classify"
                           :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-row style="margin-top: 20px;">
            <el-col :span="12">
              <!--编辑区-->
              <el-form-item class="show" prop="content">
                <el-input type="textarea" v-model="article.content" :rows="25" placeholder="请在此处编辑文章"></el-input>
              </el-form-item>
            </el-col>
            <!--展示区-->
            <el-col :span="12">
              <div v-html="markedToHtml"
                   style="background: #fff;margin: 0 0 0 20px;height: 560px; overflow-y: auto"></div>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" style="float:right;" size="small" @click="editArticle" :loading="load">
              {{btnText}}
            </el-button>
            <el-button type="primary" style="float:right; margin-right: 20px;" size="small" @click="cancel"
                       :loading="load">取消
            </el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  import NProgress from 'nprogress'
  import 'highlight.js/styles/atom-one-dark.css'
  import marked from 'marked'
  import hlt from 'highlight.js'
  import api from '../../api'

  export default {
    name: "article-edit",
    data() {
      return {
        article: {
          classify: '',
          title: '',
          content: ''
        },
        classifyList: [],
        editRules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请输入内容', trigger: 'blur'}
          ],
          classify: [
            {required: true, message: '请选择分类', trigger: 'change'}
          ]
        },
        load: false,
        btnText: '立即发布',
        listLoading: false
      }
    },
    computed: {
      markedToHtml() {
        marked.setOptions({
          highlight: code => {
            return hlt.highlightAuto(code).value;
          }
        });
        return marked(this.article.content)
      }
    },
    methods: {
      editArticle() {
        this.$refs.articleEdit.validate(valid => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {})
              .then(() => {
                NProgress.start();
                this.load = true;
                this.btnText = '提价中...';
                api.updateArticle({
                  contentToMark: this.markedToHtml,
                  ...this.article
                }).then(res => {
                  this.btnText = '立即更新';
                  this.load = false;
                  if (res.data.code === 200) {
                    this.$notify({
                      title: '成功',
                      message: '更新成功',
                      type: 'success'
                    });
                    NProgress.done();
                    setTimeout(() => {
                      this.$router.push('/admin/articleList')
                    })
                  }
                })
                  .catch(err => {
                  })
              })
              .catch(err => {
              })
          }
        })
      },
      init() {
        this.listLoading = true;
        NProgress.start();
        setTimeout(() => {
          this.listLoading = false;
          NProgress.done();
          api.getOneArticle({id: this.$route.params.postId})
            .then(({data: {code, post: {_id, classify, title, content}}}) => {
              if (code === 200) {
                this.article.id = _id;
                this.article.classify = classify;
                this.article.title = classify;
                this.article.content = content;
              }
            });
          api.getClassify().then(({data: {code, lists}}) => {
            if (code === 200) {
              this.classifyList = lists;
            }
          })
        }, 500)
      },
      cancel() {
        this.$router.push({path: '/admin/articleList'})
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style scoped>

</style>
