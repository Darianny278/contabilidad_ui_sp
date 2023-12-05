import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home.vue'
import AuxiliaresView from '../views/Auxiliares/indexView.vue'
import MonedasView from '../views/Moneda/indexView.vue'
import TipoCuentaView from '../views/TipoCuenta/indexView.vue'
import CuentaContableView from '../views/CuentaContable/indexView.vue'
import TasaCambiaria from '@/views/Moneda/TasaCambiaria.vue'
import AsientosContablesView from '@/views/AsientosContables/IndexView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/auxiliares',
    name: 'auxiliares',
    component: AuxiliaresView
  },
  {
    path: '/monedas',
    name: 'monedas',
    component: MonedasView
  },
  {
    path: '/tipoCuenta',
    name: 'tipoCuenta',
    component: TipoCuentaView
  },
  {
    path: '/cuentaContable',
    name: 'cuentaContable',
    component: CuentaContableView
  },
  {
    path: '/asientosContables',
    name: 'asientosContables',
    component: AsientosContablesView
  },
  {
    path: '/tasaCambiaria',
    name: 'tasaCambiaria',
    component: TasaCambiaria
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
