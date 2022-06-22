<template>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light" style="background-color: orange !important">
      <div class="container">
        <h2>iProject</h2>
        <div class="me-auto"></div>
        <ul class="navbar-nav mx-2 mb-2 mb-lg-0">
          <li class="nav-item" v-if="role==='company'">
            <router-link to="/users" class="nav-link text-white">User List</router-link>
          </li>
          <li class="nav-item" v-if="role==='company'">
            <router-link to="/invite" class="nav-link text-white">Invite User</router-link>
          </li>
          <li class="nav-item" v-if="role==='staff'">
            <router-link to="/createticket" class="nav-link text-white">Create Ticket</router-link>
          </li>
          <li class="nav-item" v-if="role==='staff'">
            <router-link to="/ticketlist" class="nav-link text-white">Ticket List</router-link>
          </li>
          <li class="nav-item" v-if="role==='admin'">
            <router-link to="/tasks" class="nav-link text-white">Task List</router-link>
          </li>
          <li class="nav-item" v-if="role==='admin'">
            <router-link to="/completedtask" class="nav-link text-white">Completed Task</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" aria-current="page" href="#" @click.prevent="signout()">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
    <!-- End Navbar -->

    <RouterView />
</template>

<script>
    export default {
      data(){
        return {
          role: localStorage.getItem('role')
        }
      },
      methods: {
          signout(){
              localStorage.clear()
              this.$router.push('/login')
          }
      }
    }
</script>