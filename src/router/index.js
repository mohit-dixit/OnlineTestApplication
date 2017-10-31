import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/index'
import Dashboard from '@/components/Dashboard/index'
import DashboardContentPanel from '@/components/DashboardContentPanel/index'
import Register from '@/components/Register/index'
import CreateAdmin from '@/components/CreateAdmin/index'
import CreateTest from '@/components/CreateTest/index'
import Masters from '@/components/Masters/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard,
      children: [
      	{
          path: '/',
          name: 'DashboardContentPanel',
          component: DashboardContentPanel,
          meta: { AuthRequired: true }
        },
        {
          path: 'CreateAdmin',
          name: 'CreateAdmin',
          component: CreateAdmin,
          meta: { AuthRequired: true }
        },
        {
          path: 'CreateTest',
          name: 'CreateTest',
          component: CreateTest,
          meta: { AuthRequired: true }
        },
        {
          path: 'Masters',
          name: 'Masters',
          component: Masters,
          meta: { AuthRequired: true }
        }
      ]
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    }
  ]
})
