//需要权限验证的路由
export const appRouter = {
  path: '/',
  name: 'root',
  component: () => import('../views'),
  redirect: '/home',
  children: [
    {
      path: 'home',
      name: 'home',
      icon: 'home',
      label: '首页',
      component: () => import('../views/home'),
    },
    {
      path: 'alarm',
      name: 'alarm',
      icon: 'ios-bell',
      label: '告警管理',
      redirect: '/alarm/alarmList',
      component: () => import('../views/alarm'),
      children: [
        {
          path: 'alarmList',
          name: 'alarmList',
          icon: 'ios-bell',
          label: '告警流水',
          component: () => import('../views/alarm/AlarmList.vue')
        },
        {
          path: 'alarmList2',
          name: 'alarmList2',
          icon: 'ios-bell',
          label: '告警流水2',
          component: () => import('../views/alarm/AlarmList.vue'),
          children: [
            {
              path: 'alarmList3',
              name: 'alarmList3',
              icon: 'ios-bell',
              label: '告警流水3',
              component: () => import('../views/alarm/AlarmList.vue'),
            },
            {
              path: 'alarmList4',
              name: 'alarmList4',
              icon: 'ios-bell',
              label: '告警流水4',
              component: () => import('../views/alarm/AlarmSetting.vue'),
            }
          ]
        },
      ]
    },
  ]
}

//不需要权限验证的通用路由
export const commonRouters = [
  {
    path: '/login',
    name: 'login',
    label: '登录',
    component: () => import('../views/login')
  },
  {
    path: '/403',
    name: 'error-403',
    label: '403权限不足',
    component: () => import('../views/error/403.vue')
  },
  {
    path: '/500',
    name: 'error-500',
    label: '500-服务端错误',
    component: () => import('../views/error/500.vue')
  },
  {
    path: '/*',
    name: 'error-404',
    label: '404-页面不存在',
    component: () => import('../views/error/404.vue')
  },
]

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  appRouter,
  ...commonRouters,
];
