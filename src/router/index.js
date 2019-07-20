import Vue from 'vue'
import Router from 'vue-router'
// import { getPermission } from '@/utils/auth'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/

// 用户拥有权限
// const permissions = getPermission()
// console.log(getPermission())

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '彩车位 ',
    hidden: true,
    children: [{
      path: 'dashboard',
      name: '彩车位',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'UserSetting',
    alwaysShow: true,
    meta: { title: 'OA用户管理', icon: 'user' },
    hidden: false,
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: () => import('@/views/user/list'),
        meta: { title: 'OA用户列表', icon: '' }
      },

      {
        path: 'detail/:id',
        name: 'UserListDetail',
        component: () => import('@/views/user/detail'),
        meta: { title: 'OA详情', icon: '' },
        hidden: true
      },
      {
        path: 'role/:id',
        name: 'UserRoleDispatch',
        component: () => import('@/views/user/role-dispatch'),
        meta: { title: '分配角色', icon: '' },
        hidden: true
      },
      {
        path: 'project/:id',
        name: 'UserRoleDispatch',
        component: () => import('@/views/user/project-dispatch'),
        meta: { title: '分配项目', icon: '' },
        hidden: true
      }
      
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/list',
    name: 'PermissionSetting',
    alwaysShow: true,
    meta: { title: '权限管理', icon: 'permission' },
    hidden: false,
    children: [
      {
        path: 'list',
        name: 'PermissionList',
        component: () => import('@/views/permission/list-permission'),
        meta: { title: '权限列表', icon: '' }
      },
      {
        path: 'role/list',
        name: 'RoleList',
        component: () => import('@/views/permission/list-role'),
        meta: { title: '角色列表', icon: '' }
      },
      {
        path: 'role/:id/dispatch',
        name: 'RoleDispatch',
        component: () => import('@/views/permission/role-dispatch'),
        meta: { title: '分配权限', icon: '' },
        hidden: true
      }
      
    ]
  },

  {
    path: '/project',
    component: Layout,
    redirect: '/project/list',
    name: 'ProjectSetting',
    alwaysShow: true,
    meta: { title: '车位资产管理', icon: 'example' },
    hidden: false,
    children: [
      {
        path: 'list',
        name: 'Project',
        component: () => import('@/views/project/list'),
        meta: { title: '项目管理', icon: '' }
      },
      {
        path: 'list/:id',
        component: () => import('@/views/project/detail'),
        name: 'ProjectDetail',
        meta: { title: '项目详情', icon: 'edit' },
        hidden: true
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/project/addedit'),
        name: 'UpdateProject',
        meta: { title: '编辑项目', icon: 'edit' },
        hidden: true
      },
      {
        path: 'parking/list/:id',
        component: () => import('@/views/parking/parking'),
        name: 'Parking',
        meta: { title: '车位列表', icon: 'edit' },
        hidden: true
      },
      {
        path: 'parking/detail/:id',
        component: () => import('@/views/parking/detail'),
        name: 'ParkingDetail',
        meta: { title: '车位详情', icon: 'edit' },
        hidden: true
      },
      {
        path: 'parking/edit/:id',
        component: () => import('@/views/parking/addedit'),
        name: 'ParkingEdit',
        meta: { title: '车位编辑', icon: 'edit' },
        hidden: true
      },
      {
        path: 'parking/sale/open/:id',
        component: () => import('@/views/parking/saleOpen'),
        name: 'ParkingSaleOpen',
        meta: { title: '车位批量修改', icon: 'edit' },
        hidden: true
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: 'OrderSetting',
    alwaysShow: true,
    meta: { title: '用户订单管理', icon: 'order' },
    hidden: false,
    children: [
      {
        path: 'customer',
        name: 'CustomerList',
        component: () => import('@/views/order/customer'),
        meta: { title: '用户信息管理', icon: '' }
      },
      {
        path: 'list',
        name: 'OrderList',
        component: () => import('@/views/order/list'),
        meta: { title: '订单列表', icon: '' }
      },

      {
        path: 'detail/:id',
        name: 'OrderListDetail',
        component: () => import('@/views/order/detail'),
        meta: { title: '订单详情', icon: '' },
        hidden: true
      },
      {
        path: 'stagesPayment',
        name: 'stagesPayment',
        component: () => import('@/views/order/stagesPayment'),
        meta: { title: '分期扣款订单', icon: '' }
      }
      
    ]
  },

  {
    path: '/count',
    component: Layout,
    redirect: '/count/parking',
    name: 'count',
    alwaysShow: true,
    meta: { title: '统计管理', icon: 'count' },
    hidden: false,
    children: [
      // {
      //   path: 'parking',
      //   name: 'countParking',
      //   component: () => import('@/views/count/parking'),
      //   meta: { title: '车位销售统计', icon: '' }
      // },
      {
        path: 'order',
        name: 'countOrder',
        component: () => import('@/views/count/order'),
        meta: { title: '销售统计', icon: '' }
      },
      {
        path: 'sales',
        name: 'salsePlan',
        component: () => import('@/views/count/sales-plan'),
        meta: { title: '销售计划', icon: '' }
      },
      {
        path: 'visit/list',
        name: 'oaVisit',
        component: () => import('@/views/count/visit'),
        meta: { title: '员工拜访记录', icon: '' }
      },
      {
        path: 'visit/count',
        name: 'oaVisitCount',
        component: () => import('@/views/count/visit-count'),
        meta: { title: '拜访记录统计', icon: '' }
      },
      {
        path: 'parking/review',
        name: 'parkingReview',
        component: () => import('@/views/count/parking-review'),
        meta: { title: '车位资产录入', icon: '' }
      }
      
    ]
  },

  {
    path: '/profit',
    component: Layout,
    redirect: '/profit/list',
    name: 'ProfitrSetting',
    alwaysShow: true,
    meta: { title: '奖励分配', icon: 'profit' },
    hidden: false,
    children: [
      {
        path: 'list',
        name: 'ProfitList',
        component: () => import('@/views/profit/list'),
        meta: { title: '奖励发放列表', icon: '' }
      },

      {
        path: 'list/detail/:id',
        name: 'ProfitDetailList',
        component: () => import('@/views/profit/detail'),
        meta: { title: '奖励发放明细', icon: '' },
        hidden: true
      }
      
    ]
  },

  {
    path: '/house',
    component: Layout,
    redirect: '/house/proprietor',
    name: 'houssSetting',
    alwaysShow: true,
    meta: { title: '彩住宅', icon: 'house1' },
    hidden: false,
    children: [
      {
        path: 'proprietor',
        name: 'proprietorList',
        component: () => import('@/views/house/list-proprietor'),
        meta: { title: '业主信息', icon: '' }
      },{
        path: 'booking',
        name: 'bookingList',
        component: () => import('@/views/house/bookingList'),
        meta: { title: '预约列表', icon: '' }
      },
      // gengzhong增加的
      {
        path: 'banner',
        name: 'bannerList',
        component: () => import('@/views/house/bannerList'),
        meta: { title: 'banner添加', icon: '' }
      },
      // gengzhong增加的
      {
        path: 'tuijianbooking',
        name: 'tuijianbookingList',
        component: () => import('@/views/house/tuijianbookingList'),
        meta: { title: '推荐列表', icon: '' }
      }
      
    ]
  },

  {
    path: '/building',
    component: Layout,
    redirect: '/building/list',
    name: 'building',
    alwaysShow: true,
    meta: { title: '楼盘模块', icon: 'building' },
    hidden: false,
    children: [
      {
        path: 'list',
        name: 'buildingList',
        component: () => import('@/views/building/list'),
        meta: { title: '楼盘管理', icon: '' }
      },

      {
        path: 'house/add/:id',
        name: 'houseAdd',
        component: () => import('@/views/building/house-add'),
        meta: { title: '新建户型', icon: '' },
        hidden: true
      },

      {
        path: 'house/edit/:id',
        name: 'houseEdit',
        component: () => import('@/views/building/house-edit'),
        meta: { title: '编辑户型', icon: '' },
        hidden: true
      },

      {
        path: 'house/:id',
        name: 'houseList',
        component: () => import('@/views/building/house'),
        meta: { title: '户型管理', icon: '' },
        hidden: true
      },

      {
        path: 'add',
        name: 'buildingAdd',
        component: () => import('@/views/building/add'),
        meta: { title: '楼盘添加', icon: '' },
        hidden: true
      },

      {
        path: 'edit/:id',
        name: 'buildingEdit',
        component: () => import('@/views/building/edit'),
        meta: { title: '楼盘编辑', icon: '' },
        hidden: true
      },
      // 开始增加了我的路由--huanggengzhong
      {
        path: 'my-edit',
        name: 'my-router1',
        component: () =>
          import ('@/views/building/my-edit'),
        meta: {
          title: '项目操作',
          icon: ''
        },
        hidden: true,
        children: [{
            path: "my-edit1",
            name: "my-router1-1",
            component: () =>
              import ('@/views/building/my-edit1'),
            meta: {
              title: '项目操作'
            },
            hidden: true,
          },
          {
            path: "my-edit2",
            name: "my-router1-2",
            component: () =>
              import ('@/views/building/my-edit2'),
            meta: {
              title: '购房荐房福利'
            },
            hidden: true,
          },
          {
            path: "my-edit3",
            name: "my-router1-3",
            component: () =>
              import ('@/views/building/my-edit3'),
            meta: {
              title: '项目相册',
              icon: ''
            },
            hidden: true,
          },
          {
            path: "my-edit4",
            name: "my-router1-4",
            component: () =>
              import ('@/views/building/my-edit4'),
            meta: {
              title: '项目详情',
              icon: ''
            },
            hidden: true,
          },
          {
            path: "my-edit5",
            name: "my-router1-5",
            component: () =>
              import ('@/views/building/my-edit5'),
            meta: {
              title: '对接设置',
              icon: ''
            },
            hidden: true,
          },
        ]
      },
      //结束增加了我的路由--huanggengzhong
      {
        path: 'detail/:id',
        name: 'buildingDetail',
        component: () => import('@/views/building/detail'),
        meta: { title: '楼盘详情', icon: '' },
        hidden: true
      },

      {
        path: 'booking/:id',
        name: 'buildingBooking',
        component: () => import('@/views/building/booking'),
        meta: { title: '预约记录', icon: '' },
        hidden: true
      },

      {
        path: 'recommend/:id',
        name: 'buildingRecommend',
        component: () => import('@/views/building/recommend'),
        meta: { title: '推荐记录', icon: '' },
        hidden: true
      }
      
    ]
  },

  {
    path: '/task',
    component: Layout,
    redirect: '/task/list',
    name: 'task',
    alwaysShow: true,
    meta: { title: '任务进度', icon: 'task' },
    hidden: false,
    children: [
      {
        path: 'list',
        name: 'taskList',
        component: () => import('@/views/task/list'),
        meta: { title: '任务列表', icon: '' },
      },

      {
        path: 'add',
        name: 'taskAdd',
        component: () => import('@/views/task/add'),
        meta: { title: '任务新建', icon: '' },
        hidden: true
      },

      {
        path: 'edit/:id',
        name: 'taskEdit',
        component: () => import('@/views/task/edit'),
        meta: { title: '任务编辑', icon: '' },
        hidden: true
      },

      {
        path: 'type/list',
        name: 'taskTypeList',
        component: () => import('@/views/task/typeList'),
        meta: { title: '任务类型列表', icon: '' }
      }
      
    ]
  },

  {
    path: '/ad',
    component: Layout,
    redirect: '/ad/sms',
    name: 'adSmsSetting',
    alwaysShow: true,
    meta: { title: '消息管理', icon: 'sms' },
    hidden: false,
    children: [
      {
        path: 'sms',
        name: 'adSms',
        component: () => import('@/views/ad/sms'),
        meta: { title: '消息任务', icon: '' }
      },
      {
        path: 'sms/detail/:id',
        name: 'adSmsDetail',
        component: () => import('@/views/ad/sms_detail'),
        meta: { title: '消息发送详情', icon: '' },
        hidden: true
      },
      {
        path: 'sms/info/:id',
        name: 'adSmsInfo',
        component: () => import('@/views/ad/sms_info'),
        meta: { title: '编辑消息任务', icon: '' },
        hidden: true
      },
      {
        path: 'sms/record',
        name: 'smsRecord',
        component: () => import('@/views/ad/sms_record'),
        meta: { title: '业务短信记录', icon: '' },
      }
    ]
  },
  {
    path: '/log',
    component: Layout,
    redirect: '/oa/action',
    name: 'logSetting',
    alwaysShow: true,
    meta: { title: '日志管理', icon: 'log1' },
    hidden: false,
    children: [
      {
        path: 'oa/action',
        name: 'oaAction',
        component: () => import('@/views/log/oaAction'),
        meta: { title: '操作日志', icon: '' }
      },
      
    ]
  },
  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/no-reason',
    name: 'logSetting',
    alwaysShow: true,
    meta: { title: '活动模块', icon: 'activity' },
    hidden: false,
    children: [
      {
        path: 'no-reason',
        name: 'noReason',
        component: () => import('@/views/activity/noReason'),
        meta: { title: '无理由退', icon: '' }
      },
      {
        path: 'enterList',
        name: 'enterList',
        component: () => import('@/views/activity/enterList'),
        meta: { title: '柬埔寨地产投资项目报名列表', icon: '' }
      },
      {
        path: 'recommendList',
        name: 'recommendList',
        component: () => import('@/views/activity/recommendList'),
        meta: { title: '柬埔寨地产投资项目推荐列表', icon: '' }
      },
      {
        path: 'couponTemplate',
        name: 'couponTemplate',
        component: () => import('@/views/activity/couponTemplate'),
        meta: { title: '优惠券模板', icon: '' }
      },
      {
        path: 'couponList',
        name: 'couponList',
        component: () => import('@/views/activity/couponList'),
        meta: { title: '优惠券列表', icon: '' }
      },
      {
        path: 'test1',
        name: 'test1',
        component: () => import('@/views/activity/test'),
        meta: { title: '测试', icon: '' },
        hidden: true
      },
      
    ]
  },
  {
    path: '/mealticket',
    component: Layout,
    redirect: '/mealticket/mealticketList',
    name: 'mealticketSetting',
    alwaysShow: true,
    meta: { title: '饭票发放', icon: 'mealticket' },
    hidden: false,
    children: [
      {
        path: 'mealticketList',
        name: 'mealticketList',
        component: () => import('@/views/mealticket/mealticketList'),
        meta: { title: '饭票自动发放列表', icon: '' }
      },{
        path: 'accounts',
        name: 'accounts',
        component: () => import('@/views/mealticket/accounts'),
        meta: { title: '转账', icon: '' }
      },
      {
        path: 'mealticketDetail/:id',
        name: 'mealticketDetail',
        component: () => import('@/views/mealticket/mealticketDetail'),
        meta: { title: '发放计划详情', icon: '' },
        hidden: true
      },{
        path: 'mealticketExamine/:id',
        name: 'mealticketExamine',
        component: () => import('@/views/mealticket/mealticketExamine'),
        meta: { title: '审核', icon: '' },
        hidden: true
      }
    ]
  },
  {
    path: '/fpb',
    component: Layout,
    redirect: '/fpb/fpbList',
    name: 'fpbSetting',
    alwaysShow: true,
    meta: { title: '饭票宝', icon: 'fpb' },
    hidden: false,
    children: [
      {
        path: 'fpbList',
        name: 'fpbList',
        component: () => import('@/views/fpb/fpbList'),
        meta: { title: '饭票宝订单列表', icon: '' }
      }
    ]
  },


  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
