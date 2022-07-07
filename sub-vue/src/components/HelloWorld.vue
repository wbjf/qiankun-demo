<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <p>当前处于<code>{{ isInQiankun ? 'qiankun' : '独立运行'}}</code>环境</p>
      <p>用户信息：<code> {{ JSON.stringify(user) }}</code></p>
      <p>登录token：<code>{{token}}</code></p>
    </div>
    <div class="btns">
      <template v-if="isInQiankun">
        <el-button @click="gotoSubReact">从当前vue子应用内跳转到react子应用</el-button>
        <el-button @click="openSubVue">独立打开当前vue子应用</el-button>
        <el-button @click="openMainPage">打开主应用页面一</el-button>
      </template>
      <el-button @click="changeUsername">改变全局的用户名称</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    // 通过global获取user的信息
    ...mapState('global', {
      user: state => state.user,
      token: state => state.token
    }),
    // 判断是否是qiankun环境
    isInQiankun () {
      return window.__POWERED_BY_QIANKUN__
    }
  },
  methods: {
    // setGlobalState 是在 /common/src/store/global-register.js中定义的
    ...mapActions('global', ['setGlobalState']),
    gotoSubReact () {
      history.pushState(null, 'sub-react', '/index/sub-react')
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
    },
    openMainPage () {
      history.pushState(null, '', '/test1')
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
