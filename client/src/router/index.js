import { createRouter, createWebHistory } from 'vue-router'
import TaskView from '../views/TaskView.vue'
import Navbar from '../components/Navbar.vue'
import LoginPage from '../views/LoginPage.vue'
import CreateTicket from '../views/CreateTicket.vue'
import RegisterPage from '../views/RegisterPage.vue'
import CompanyLogin from '../views/CompanyLogin.vue'
import UserList from '../views/UserList.vue'
import InviteUser from '../views/InviteUser.vue'
import CompletedTask from '../views/CompletedTask.vue'
import TicketList from '../views/TicketList.vue'
import UnactiveAccount from '../views/UnactiveAccount.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Navbar,
      children: [
        {
          path: 'tasks',
          name: 'tasks',
          component: TaskView
        },
        {
          path: 'completedtask',
          name: 'completedtask',
          component: CompletedTask
        },
        {
          path: 'createticket',
          name: 'createticket',
          component: CreateTicket
        },
        {
          path: 'users',
          name: 'users',
          component: UserList
        },
        {
          path: 'invite',
          name: 'invite',
          component: InviteUser
        },
        {
          path: 'ticketlist',
          name: 'ticketlist',
          component: TicketList
        },
        {
          path: 'unactive',
          name: 'unactive',
          component: UnactiveAccount
        }
      ],
      beforeEnter(to, from){
        if(!localStorage.getItem('access_token')){
          return '/login'
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/companylogin',
      name: 'companylogin',
      component: CompanyLogin
    }
  ]
})

export default router
