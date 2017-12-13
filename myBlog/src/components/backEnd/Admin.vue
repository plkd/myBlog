<template lang="html">
  <el-row class="panel">
    <el-row class="top">
      <el-col :span='23' class="panel-top" :push="1">
        <!-- push就是相对定位了 -->
        <!--  offset设置的是margin-lef-->
        <el-col :span="20" style='font-size:26px'>
          <span>AD<i style="color:#20a0ff">MIN</i></span>
        </el-col>
        <el-col :span='4' class='rightbar'>
          <el-dropdown >
              <span class="el-dropdown-link" style="color:#c0ccda;cursor: pointer;font-weight:700">
                更多操作<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="toHome">博客首页</el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-col>
    </el-row>
    <!-- 顶部导航结束 -->
    <el-row  class="panel-center">
      <el-col :span="5">
        <el-menu  theme="dark"  router :default-active="currentPath">
          <template v-for="(item,index) in $router.options.routes" v-if='!item.hidden'>
            <el-submenu :index="index+''">
              <template slot="title"><i :class="item.iconCls" ></i>{{item.name}}</template>
              <el-menu-item v-for="child in item.children" :index="item.path+'/'+child.path" :key="child.id" v-if="!child.hidden">{{child.name}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>
      <!-- 左侧导航结束 -->
      <el-col :span='19' class="panel-c-c">
        <el-row>
          <el-col :span='24' class="breadcrumb">
            <el-breadcrumb separator="/" style='float:right'>
              <!-- <el-breadcrumb-item :to="{path:'/admin/articleList'}">首页</el-breadcrumb-item> -->
              <el-breadcrumb-item :to="{path:'/admin/articleList'}">{{currentPathNameParent}}</el-breadcrumb-item>
              <el-breadcrumb-item>{{currentPathName}}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </el-row>
        <router-view></router-view>
      </el-col>
      <!--  面包屑导航结束-->
    </el-row>
  </el-row>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: "admin",
    data() {
      return {
        currentPath: '/admin/articleList',
        currentPathNameParent: '文章管理',
        currentPathName: '文章列表'
      }
    },
    methods: {
      toHome() {
        this.$router.push({path: '/'})
      },
      logout() {
        this.$confirm('确认退出吗？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('UserLogout')
        }).catch(() => {

        })
      }
    }
  }
</script>

<style scoped>

</style>
