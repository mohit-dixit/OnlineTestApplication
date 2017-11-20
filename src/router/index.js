import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import DashboardContentPanel from '@/components/DashboardContentPanel'
import Register from '@/components/Register'
import CreateAdmin from '@/components/CreateAdmin'
import CreateTest from '@/components/CreateTest'
import Masters from '@/components/MasterPanel'
import CreateQuestion from '@/components/CreateQuestion'
import AssignTest from '@/components/AssignTest'
import StartTest from '@/components/StartTest'
import CreateTeacher from '@/components/CreateTeacher'
import CreateStudent from '@/components/CreateStudent'
import CreateInstitute from '@/components/CreateInstitute'
import VueBreadcrumbs from 'vue-2-breadcrumbs';
import Test from '@/components/Test'
import AdminList from '@/components/AdminList'
import InstituteList from '@/components/InstituteList'
import TeacherList from '@/components/TeacherList'
import StudentList from '@/components/StudentList'
import QuestionBank from '@/components/QuestionBank'
import TestList from '@/components/TestList'
import EditAdmin from '@/components/CreateAdmin'
import EditInstitute from '@/components/CreateInstitute'
import AdminConfiguration from '@/components/AdminConfiguration'
import CreateSubject from '@/components/CreateSubject'
import SubjectList from '@/components/SubjectList'
import CreateScale from '@/components/CreateScale'
import ScaleList from '@/components/ScaleList'
import MasterPanel from '@/components/MasterPanel'
import MasterSettings from '@/components/MasterSettings'
import EditTeacher from '@/components/CreateTeacher'
import EditStudent from '@/components/CreateStudent'

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
          path: 'EditAdmin/:id',
          name: 'EditAdmin',
          component: EditAdmin,
          props: true,
          meta: { AuthRequired: true , breadcrumb: 'Edit Admin' }
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
          component: MasterSettings,
          meta: { AuthRequired: true , breadcrumb: 'Masters'  },
          children: [
            {
              path: '',
              name: 'MastersDefault',
              component: MasterPanel,
              meta: { AuthRequired: true }
            },
            {
              path: 'CreateScale',
              name: 'CreateScale',
              component: CreateScale,
              meta: { AuthRequired: true, breadcrumb: 'Create Scale' }
            },
            {
              path: 'CreateSubject',
              name: 'CreateSubject',
              component: CreateSubject,
              meta: { AuthRequired: true, breadcrumb: 'Create Subject' }
            },
            {
              path: 'ScaleList',
              name: 'ScaleList',
              component: ScaleList,
              meta: { AuthRequired: true, breadcrumb: 'Scale List' }
            },
            {
              path: 'SubjectList',
              name: 'SubjectList',
              component: SubjectList,
              meta: { AuthRequired: true, breadcrumb: 'Subject List' }
            }
          ]
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
          path: 'EditInstitute/:id',
          name: 'EditInstitute',
          component: EditInstitute,
          props: true,
          meta: { AuthRequired: true , breadcrumb: 'Edit Institute' }
        },
        {
          path: 'CreateTeacher',
          name: 'CreateTeacher',
          component: CreateTeacher,
          meta: { AuthRequired: true, breadcrumb: 'Create Teacher' }
        },
        {
          path: 'EditTeacher/:id',
          name: 'EditTeacher',
          component: EditTeacher,
          props: true,
          meta: { AuthRequired: true , breadcrumb: 'Edit Teacher' }
        },
        {
          path: 'CreateStudent',
          name: 'CreateStudent',
          component: CreateStudent,
          meta: { AuthRequired: true , breadcrumb: 'Create Student' }
        },{
          path: 'EditStudent/:id',
          name: 'EditStudent',
          component: EditStudent,
          props: true,
          meta: { AuthRequired: true , breadcrumb: 'Edit Student' }
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
        },
        {
          path: 'AdminConfiguration',
          name: 'AdminConfiguration',
          component: AdminConfiguration,
          meta: { AuthRequired: true , breadcrumb: 'Admin Configuration' }
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