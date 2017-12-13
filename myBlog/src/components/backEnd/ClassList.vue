<template>
  <el-row>
    <el-row>
      <el-col :span="24">
        <el-button size="small" type="primary" @click="addClass">创建分类</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table align="center" :data="classifyLists" v-loading="listLoading" element-loading-text="拼命加载中">
          <el-table-column type="index" width="60"></el-table-column>
          <el-table-column prop="created_at" min-width="200" label="创建时间"></el-table-column>
          <el-table-column prop="classify" min-width="200" label="分类名称"></el-table-column>
          <el-table-column min-width="180" label="操作">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="editClassify(scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="remove(scope.row._id)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-col>
    </el-row>
    <!--弹窗-->
    <el-row>
      <el-col :span="24">
        <el-dialog :title="formTitle" :visible.sync="formVisible">
          <el-form :model="classifyInfo" label-width="120px" ref="classifyInfo" :rules="formRule">
            <el-form-item label="分类名称" prop="classify">
              <el-input v-model="classifyInfo.classify" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button @click="formVisible = false">取消</el-button>
            <el-button type="primary" @click="classSubmit" :loading="loadingFlag">{{btnText}}</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>

    <!--<el-row>-->
    <!--<el-col :span="24" class="page">-->
    <!--<el-pagination layout="prev, pager, next" @current-change="handle" :total="total" :page-size="limit"-->
    <!--style="float:right;"></el-pagination>-->
    <!--</el-col>-->
    <!--</el-row>-->
  </el-row>
</template>

<script>
  import axios from 'axios'
  import NProgress from 'nprogress'
  import api from '../../api'
  import { sub } from '../../assets/js/submit'

  export default {
    name: "class-list",
    data() {
      return {
        classifyLists: [],
        formVisible: false,
        formTitle: '',
        listLoading: false,
        loadingFlag: false,
        classifyInfo: {
          id: 0,
          classify: ''
        },
        formRule: {
          classify: [
            {required: true, message: '请输入分类名称', trigger: 'blur'}
          ]
        },
        btnText: '提交'
      }
    },
    mounted() {
      this.getLists();
    },
    methods: {
      getLists() {
        this.listLoading = true;
        NProgress.start();
        api.getClassify().then(result => {
          setTimeout(() => {
            this.listLoading = false;
            this.classifyLists = result.data.lists;
            NProgress.done();
          })
        })
      },
      addClass() {
        this.formVisible = true;
        this.formTitle = '新增';
        this.classifyInfo.classify = ''
      },
      editClassify(row) {
        this.formVisible = true;
        this.formTitle = '编辑';
        this.classifyInfo.classify = row.classify;
        this.classifyInfo.id = row._id;
      },
      remove(id) {
        this.$confirm('确定要删除吗？', '提醒', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'waring'
        }).then(() => {
          this.listLoading = true;
          NProgress.start();
          api.removeOneClassify({id})
            .then(({data: {code, message}}) => {
              this.listLoading = false;
              NProgress.done();

              if (code === 200) {
                this.$notify({
                  title: '成功',
                  message: "删除成功",
                  type: 'success'
                });
              } else if (code === 401) {
                this.$notify({
                  title: '失败',
                  message,
                  type: 'error'
                });
                setTimeout(() => {
                  this.$router.replace({path: '/login'})
                }, 500);
                return false;
              }
              this.getLists();
            })
        })
          .catch(err => {
          })
      },
      classSubmit() {
        this.$refs.classifyInfo.validate(valid => {
          if (valid) {
            if (this.formTitle === '新增') {
              api.createClassify({
                classify: this.classifyInfo.classify
              }).then(res => {
                sub(this, res)
              })
            } else {
              api.editClassify({
                id: this.classifyInfo.id,
                classify: this.classifyInfo.classify
              }).then(res => {
                sub(this, res)
              })
            }
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
