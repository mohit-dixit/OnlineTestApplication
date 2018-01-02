<template>
  <ul class="sidebar-menu">
    <!-- <li class="header">TOOLS</li> -->
    <router-link tag="li" class="pageLink" to="/Dashboard">
      <a>
        <i class="fa fa-desktop"></i>
        <span class="page">Dashboard</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/Dashboard/AdminList">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">
          Admins
        </span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/Dashboard/StudentList">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">
          Student Section
        </span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/Dashboard/TestList">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">
          Test Section
        </span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/Dashboard/TeacherList">
      <a>
        <i class="fa fa-cog"></i>
        <span class="page">Teacher Section</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/Dashboard/QuestionBank">
      <a>
        <i class="fa fa-book"></i>
        <span class="page">Question Section</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/Dashboard/Masters">
      <a>
        <i class="fa fa-hdd-o"></i>
        <span class="page">Master Section</span>
      </a>
    </router-link>
  </ul>
</template>
<script>
export default {
  name: 'SidebarName'
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
