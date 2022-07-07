import store from './store'

const microApps = [
  {
    name: 'sub-vue',
    entry: process.env.VUE_APP_SUB_VUE,
    activeRule: '/index/sub-vue',
    title: 'vue应用'
  },
  {
    name: 'sub-react',
    entry: process.env.VUE_APP_SUB_REACT,
    activeRule: '/index/sub-react',
    title: 'react应用'
  },
  {
    name: 'sub-html',
    entry: process.env.VUE_APP_SUB_HTML,
    activeRule: '/index/sub-html',
    title: 'html页面'
  }
]

const apps = microApps.map(item => {
  return {
    ...item,
    container: '#subapp-viewport', // 子应用挂载的div
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: store.getGlobalState // 下发getGlobalState方法
    }
  }
})

export default apps
