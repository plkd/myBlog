<template>
  <div class="container">
    <el-form class="reg_form" :model="user" :rules="rules2" ref="user" label-position="left" label-width="0px">
      <h3 class="title">欢迎登录后台管理系统</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="user.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="user.checkPass" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button class='reg_button' type="primary" style="width:40%;" @click="handleSubmit">登录</el-button>
        <el-button class='login_button' type="primary" style="width:40%;" @click="toReg">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        logining: false,
        user: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur'}
          ]
        },
        errorMessage: false,
        loadingFlag: false
      }
    },
    methods: {
      toReg() {
        this.$router.push({path: '/reg'})
      },
      handleSubmit() {
        this.$refs.user.validate(valid => {
          if (valid) {
            this.$store.dispatch('UserLogin', this.user)
          } else {
            return false;
          }
        })
      },
      changeFlag() {
        this.errorMessage = false;
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-form-item{
    text-align: center;
  }
  .container{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0;
    min-width: 680px;
    background: url(../../assets/img/login-bg.jpg) no-repeat center /cover;
  }
  .title{
    text-align: center;
    font-size: 2rem;
  }
  .reg_form{
    width: 350px;
    margin: 160px auto 0 auto;
    border: 2px solid #8492A6;
    padding: 25px;
    border-radius: 5px;
    background: rgba(255,255,255,.3);
  }
</style>
