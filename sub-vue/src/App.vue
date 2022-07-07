<template>
  <div id="app">
    <div class="content">
    <el-row style="width: 100%;height: 100%">
      <el-col :span="3" v-if="!isInQiankun">
        <el-menu
          :default-active="$route.path"
          router
          class="left-menu"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/about">
            <i class="el-icon-document"></i>
            <span slot="title">关于</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="isInQiankun ? 24 : 21">
        <router-view />
      </el-col>
    </el-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    // 通过global获取user的信息
    ...mapState('global', {
      user: state => state.user
    }),
    isInQiankun () {
      return window.__POWERED_BY_QIANKUN__
    }
  },
  methods: {
    // setGlobalState 是在 /common/src/store/global-register.js中定义的
    ...mapActions('global', ['setGlobalState']),
    gotoSubReact () {
      history.pushState(null, 'sub-react', '/sub-react')
    },
    changeUsername () {
      // 也可通过 store.commit('global/setGlobalState', { user: '李四' }) 进行操作
      this.setGlobalState({
        user: { name: '李四' + Math.round(Math.random() * 100) }
      })
    },
    openSubVue () {
      if (!this.isInQiankun) {
        alert('当前已经是单独运行的子应用')
        return
      }

      // window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ 是qiankun注入的子应用对应的地址，谨慎使用，生产环境建议将跳转地址维护在环境变量中
      window.open(window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__)
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.content, .left-menu {
  width: 100%;
  height: 100vh;
}

</style>
