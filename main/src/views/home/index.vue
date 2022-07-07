<template>
  <div class="layout-wrapper">
    <div class="layout-header">
      <div class="logo">
        <img src="../../assets/px_logo_icon.png" />
        <span class="title">朋熙微前端</span>
      </div>
      <span>{{state.token}}</span>
      <!-- <ul class="sub-apps">
        <li v-for="item in microApps" :class="{active: item.activeRule === current}" :key="item.name" @click="goto(item)">{{ item.title }}</li>
      </ul> -->
      <div class="userinfo">
        欢迎，{{state.user.name}}
        <el-button type="text" @click="logout">退出</el-button>
      </div>
    </div>
    <div class="layout-body">
      <div class="menu">
        <el-menu
          :default-active="$route.path"
          router
          class="menu"
          background-color="#3A4268"
          text-color="#fff"
          active-text-color="#fff">
          <el-submenu index="/test1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>主应用</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/test1">页面一</el-menu-item>
              <el-menu-item index="/test2">页面二</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="/index/sub-vue/">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>vue应用</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/sub-vue/">home页</el-menu-item>
              <el-menu-item index="/index/sub-vue/about">about页</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/index/sub-react">
            <i class="el-icon-menu"></i>
            <span slot="title">react应用</span>
          </el-menu-item>
          <el-menu-item index="/index/sub-html">
            <i class="el-icon-menu"></i>
            <span slot="title">原生html页面</span>
          </el-menu-item>
        </el-menu>
      </div>
      <!-- <test1></test1> -->
      <div id="subapp-viewport" class="container"></div>
    </div>
  </div>
</template>

<script>
import NProgress from 'nprogress'
import microApps from '../../micro-app'
import store from '@/store'
import { start } from 'qiankun'
// import test1 from '../test1'
export default {
  name: 'Home',
  data () {
    return {
      isLoading: true,
      microApps,
      current: '/sub-vue/'
    }
  },
  computed: {
    state () {
      // 如果只需要取某个命名空间下的state，比如 user ，可以加上参数
      // return store.getGlobalState('user')

      // 返回所有的state则不需添加参数
      return store.getGlobalState()
    }
  },
  watch: {
    isLoading (val) {
      if (val) {
        NProgress.start()
      } else {
        this.$nextTick(() => {
          NProgress.done()
        })
      }
    }
  },
  // components: { test1 },
  methods: {
    goto (item) {
      history.pushState(null, item.activeRule, item.activeRule)
      // this.current = item.name
    },
    bindCurrent () {
      const path = window.location.pathname
      if (this.microApps.findIndex(item => item.activeRule === path) >= 0) {
        this.current = path
      }
    },
    listenRouterChange () {
      const _wr = function (type) {
        const orig = history[type]
        return function () {
          const rv = orig.apply(this, arguments)
          const e = new Event(type)
          e.arguments = arguments
          window.dispatchEvent(e)
          return rv
        }
      }
      history.pushState = _wr('pushState')

      window.addEventListener('pushState', this.bindCurrent)
      window.addEventListener('popstate', this.bindCurrent)

      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('pushState', this.bindCurrent)
        window.removeEventListener('popstate', this.bindCurrent)
      })
    },
    logout () {
      this.$router.push('/login')
    }
  },
  created () {
    this.bindCurrent()
    NProgress.start()
  },
  mounted () {
    if (!window.qiankunStarted) {
      window.qiankunStarted = true
      start()
    }
    this.listenRouterChange()
  }
}
</script>

<style lang="scss">
html, body{
  margin: 0 !important;
  padding: 0;
}
.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}
  .layout-wrapper{
    .layout-header{
      height: 80px;
      width: 100%;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      line-height: 80px;
      position: relative;
      background: #3A4268;
     .logo {
        float: left;
        margin: 0 10px;
        height: 80px;
        display: flex;
        align-items: center;
        img {
          width: 60px;
        }
        .title {
          color: #fff;
          font-weight: bold;
          font-size: 18px;
          letter-spacing: 4px;
        }
      }
      .sub-apps {
        list-style: none;
        margin: 0;
        li{
          list-style: none;
          display: inline-block;
          padding: 0 20px;
          cursor: pointer;
          color: #FFF;
          &.active{
            color: #42b983;
            text-decoration: underline;
          }
        }
      }
      .userinfo{
        position: absolute;
        right: 100px;
        top: 0;
        color: #fff;
      }
    }
  }
  .layout-body {
    width: 100%;
    height: calc(100vh - 80px);
    display: flex;
    align-items: center;
  }
  .menu {
    width: 200px;
    height: 100%;
  }
  .container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
