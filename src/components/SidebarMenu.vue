<template>
  <ul class="sidebar-menu">
    <!-- <li class="header">TOOLS</li> -->
    <router-link tag="li" class="pageLink" to="/Dashboard">
      <a>
        <i class="fa fa-desktop"></i>
        <span class="page">Dashboard</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/Dashboard/AdminList" v-if="isUserSuperAdmin || isUserAdmin">
      <a>
        <i class="fa fa-user"></i>
        <span class="page">
          Admins
        </span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/Dashboard/InstituteList" v-if='isUserSuperAdmin'>
      <a>
        <i class="fa fa-university"></i>
        <span class="page">
          Institutes
        </span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/Dashboard/StudentList" v-if='isUserAdmin'>
      <a>
        <i class="fa fa-users"></i>
        <span class="page">
          Student Section
        </span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/Dashboard/TeacherList" v-if='isUserAdmin'>
      <a>
        <i class="fa fa-cog"></i>
        <span class="page">Teacher Section</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/Dashboard/QuestionBank" v-if="isUserTeacher || isUserAdmin">
      <a>
        <i class="fa fa-question"></i>
        <span class="page">Question Section</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/Dashboard/TestList" v-if="isUserTeacher || isUserAdmin">
      <a>
        <i class="fa fa-book"></i>
        <span class="page">
          Test Section
        </span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/Dashboard/Masters" v-if='isUserAdmin'>
      <a>
        <i class="fa fa-lock"></i>
        <span class="page">Master Section</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/Dashboard/AdminConfiguration" v-if='isUserAdmin'>
      <a>
        <i class="fa fa-cogs"></i>
        <span class="page">Configuration</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/Dashboard/Uploads" v-if='isUserAdmin'>
      <a>
        <i class="fa fa-upload"></i>
        <span class="page">Uploads</span>
      </a>
    </router-link>
     <router-link tag="li" class="pageLink" to="/Dashboard/AssignTest" v-if='isUserTeacher'>
      <a>
        <i class="fa fa-tasks"></i>
        <span class="page">Assign Test</span>
      </a>
    </router-link>
     <router-link tag="li" class="pageLink" to="/Dashboard/Reporting">
      <a>
        <i class="fa fa-bar-chart"></i>
        <span class="page">Reporting</span>
      </a>
    </router-link>
  </ul>
</template>
<script>

export default {
  name: 'SidebarName',
  data() {
    this.isUserSuperAdmin = false;
    this.isUserAdmin = false;
    this.isUserTeacher = false;
    this.isUserStudent = false;
    return {

    }
  },
  methods: {
    getShowHideOptions: function () {
      let loginRole = localStorage.getItem('loginRole');
      switch (loginRole) {
        case '1': this.isUserSuperAdmin = true; break;
        case '2': this.isUserAdmin = true; break;
        case '3': this.isUserTeacher = true; break;
        case '4': this.isUserStudent = true; break;
        default : null;
      }
    }
  },
  created: function() {
    this.getShowHideOptions();
  }
}
</script>
<style>
  /* override default */
  .sidebar-menu {
    text-align: left;
  }
  .sidebar-menu>li>a {
    padding: 12px 15px 12px 15px;
  }

  .sidebar-menu li.active>a>.fa-angle-left, .sidebar-menu li.active>a>.pull-right-container>.fa-angle-left {
    animation-name: rotate;
    animation-duration: .2s;
    animation-fill-mode: forwards;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-90deg);
    }
  }
</style>
