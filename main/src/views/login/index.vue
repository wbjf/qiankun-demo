<template>
    <!-- <div><button @click="toIndex()">登录</button></div> -->
    <div class="login-page">
      <div class="container">
        <div class="left-bar">
          <div>
            <img src="../../assets/px_logo_icon.png" class="logo" />
          </div>
          <div>
            <span class="title">朋熙综合管理平台</span>
          </div>
          <img src="../../assets/chip_icon.png" class="chip-icon" />
        </div>
        <div class="form-container">
          <div class="login-title">登录</div>
          <el-form ref="form" :model="form">
            <el-form-item>
              <el-input v-model="loginForm.name" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="loginForm.pwd" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="loginForm.code" placeholder="验证码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="login-btn" type="primary" @click="toIndex()">登录</el-button>
            </el-form-item>
          </el-form>
          <div>
            <el-button type="text">注册</el-button>
            <el-button type="text">忘记密码</el-button>
          </div>
        </div>
      </div>
      <div class="footer">
        <span>Copyright © 上海朋熙半导体有限公司 | 2022-2032 | 沪ICP备12345678号-1</span>
      </div>
    </div>
</template>

<script>
import actions from '../../store'
export default {
  data () {
    return {
      loginForm: {
        name: '',
        pwd: '',
        code: ''
      }
    }
  },
  mounted () {
    console.log('login')
  },
  methods: {
    toIndex () {
      actions.setGlobalState({
        token: '111222333444555666'
      })
      this.$notify({
        title: '登录成功',
        type: 'success',
        duration: 1500
      })
      this.$router.push('/index/sub-vue')
    }
  }
}
</script>

<style scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  /* background: rgb(23, 160, 240); */
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('../../assets/bg.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.container {
  width: 800px;
  height: 520px;
  background: rgba(255,255,255,1);
  border-radius: 0 70px 0 70px;
  display: flex;
  align-items: center;
}
.left-bar {
  width: 400px;
  height: 100%;
  border-radius: 0 0 0 70px;
  text-align: center;
  background: rgb(101, 192, 245);
}
.logo {
  width: 100px;
  height: 100px;
  margin: 30px 0;
}
.chip-icon {
  width: 200px;
  margin-top: 60px;
}
.title {
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  letter-spacing: 2px;
}
.form-container {
  width: 400px;
  height: 100%;
  padding: 20px;
}
.login-title {
  text-align: center;
  margin: 50px 0 50px;
  color: #999;
}
.login-btn {
  width: 100%;
  margin-top: 40px;
}
.footer {
  text-align: center;
  position: fixed;
  bottom: 30px;
  color: rgb(196, 194, 194);
}
</style>
