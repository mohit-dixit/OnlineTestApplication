import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/index'
import Dashboard from '@/components/Dashboard/index'
import DashboardContentPanel from '@/components/DashboardContentPanel/index'
import Register from '@/components/Register/index'
import CreateAdmin from '@/components/CreateAdmin/index'
import CreateTest from '@/components/CreateTest/index'
import Masters from '@/components/Masters/index'
import CreateQuestion from '@/components/CreateQuestion/index'
import AssignTest from '@/components/AssignTest/index'
import StartTest from '@/components/StartTest/index'
import CreateTeacher from '@/components/CreateTeacher/index'
import CreateStudent from '@/components/CreateStudent/index'

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
      meta: { AuthRequired: true },
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
          path: 'CreateAdmin/:id',
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
        },
        {
          path: 'CreateQuestion',
          name: 'CreateQuestion',
          component: CreateQuestion,
          meta: { AuthRequired: true }
        }
      ]
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
      meta: { AuthRequired: true }
    },
    {
      path: '/AssignTest',
      name: 'AssignTest',
      component: AssignTest,
      meta: { AuthRequired: true }
    },
    {
      path: '/StartTest',
      name: 'StartTest',
      component: StartTest,
      meta: { AuthRequired: true }
    },
    {
      path: '/CreateTeacher',
      name: 'CreateTeacher',
      component: CreateTeacher,
      meta: { AuthRequired: true }
    },
    {
      path: '/CreateStudent',
      name: 'CreateStudent',
      component: CreateStudent,
      meta: { AuthRequired: true }
    }
  ]
})
