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
import CreateInstitute from '@/components/CreateInstitute/index'
import VueBreadcrumbs from 'vue-2-breadcrumbs';
import Test from '@/components/Test'
import AdminList from '@/components/AdminList'
import InstituteList from '@/components/InstituteList'
import TeacherList from '@/components/TeacherList'
import StudentList from '@/components/StudentList'
import QuestionBank from '@/components/QuestionBank'
import TestList from '@/components/TestList'

Vue.use(Router)
Vue.use(VueBreadcrumbs)

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
      meta: { AuthRequired: true , breadcrumb: 'Dashboard' },
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
          meta: { AuthRequired: true , breadcrumb: 'Create Admin' }
        },
        {
          path: 'CreateAdmin/:id',
          name: 'CreateAdmin',
          component: CreateAdmin,
          meta: { AuthRequired: true , breadcrumb: 'Create Admin' }
        },
        {
          path: 'CreateTest',
          name: 'CreateTest',
          component: CreateTest,
          meta: { AuthRequired: true  , breadcrumb: 'Create Test' }
        },
        {
          path: 'Masters',
          name: 'Masters',
          component: Masters,
          meta: { AuthRequired: true , breadcrumb: 'Masters'  }
        },
        {
          path: 'CreateQuestion',
          name: 'CreateQuestion',
          component: CreateQuestion,
          meta: { AuthRequired: true, breadcrumb: 'Create Question' }
        },
        {
          path: 'CreateInstitute',
          name: 'CreateInstitute',
          component: CreateInstitute,
          meta: { AuthRequired: true , breadcrumb: 'Create Institute' }
        },
        {
          path: 'CreateTeacher',
          name: 'CreateTeacher',
          component: CreateTeacher,
          meta: { AuthRequired: true, breadcrumb: 'Create Teacher' }
        },
        {
          path: 'CreateStudent',
          name: 'CreateStudent',
          component: CreateStudent,
          meta: { AuthRequired: true , breadcrumb: 'Create Student' }
        },
        {
          path: 'AssignTest',
          name: 'AssignTest',
          component: AssignTest,
          meta: { AuthRequired: true , breadcrumb: 'Assign Test' }
        },
        {
          path: 'StartTest',
          name: 'StartTest',
          component: StartTest,
          meta: { AuthRequired: true , breadcrumb: 'Start Test' }
        },
        {
          path: 'AdminList',
          name: 'AdminList',
          component: AdminList,
          meta: { AuthRequired: true , breadcrumb: 'Admin List' }
        },
        {
          path: 'InstituteList',
          name: 'InstituteList',
          component: InstituteList,
          meta: { AuthRequired: true , breadcrumb: 'Institute List' }
        },
        {
          path: 'TeacherList',
          name: 'TeacherList',
          component: TeacherList,
          meta: { AuthRequired: true , breadcrumb: 'Teacher List' }
        },
        {
          path: 'StudentList',
          name: 'StudentList',
          component: StudentList,
          meta: { AuthRequired: true , breadcrumb: 'Student List' }
        },
        {
          path: 'QuestionBank',
          name: 'QuestionBank',
          component: QuestionBank,
          meta: { AuthRequired: true , breadcrumb: 'Question Bank' }
        },
        {
          path: 'TestList',
          name: 'TestList',
          component: TestList,
          meta: { AuthRequired: true , breadcrumb: 'Test List' }
        }
      ]
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
      meta: { AuthRequired: true , breadcrumb: 'Register' }
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test
    }
  ]
})
