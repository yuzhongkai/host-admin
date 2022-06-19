import router from './router'
import store from './store'

// 白名单
const whiteList = ['/login']
/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  // 存在 token ，进入主页
  // 快捷访问
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否获取
      // 若不存在用户信息，则需要获取用户信息
      if (!store.getters.hasUserInfo) {
        // 触发获取用户信息的 action
        const { permission } = await store.dispatch('user/getUserInfo')
        // const filterRoutes = await store.dispatch(
        //   'permission/filterRoutes',
        //   permission.menus
        // )
        // filterRoutes.forEach((item) => {
        //   router.addRoute(item)
        // })
        // return next(to.path)

        // 处理用户权限，筛选出需要添加的权限
        await store
          .dispatch('permission/filterRoutes', permission.menus)
          .then((res) => {
            // 利用 addRoute 循环添加
            res.forEach((item) => {
              router.addRoute(item)
            })
            // 添加完动态路由之后，需要在进行一次主动跳转
            return next({ ...to, replace: true })
          })
      } else {
        next()
      }
    }
  } else {
    // 没有token的情况下，可以进入白名单
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
