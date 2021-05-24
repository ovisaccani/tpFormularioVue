<template>
  <div id="app" class="container-fluid mt-3">
    <div class="jumbotron">
      <h1>Bienvenidos a Vue.js CLI</h1>
      <br>

      <Navbar />
      <router-view></router-view>

      <!-- <Binding />
      <Estructura />
      <Atributos />
      <Contadores /> -->

    </div>
  </div>
</template>

<script>
/* import Binding from './componentes/Binding.vue'
import Estructura from './componentes/Estructura.vue'
import Atributos from './componentes/Atributos.vue'
import Contadores from './componentes/Contadores.vue' */
import Navbar from './componentes/Navbar.vue'


export default {
  name: 'App',
  components: {
    /* Binding,
    Estructura,
    Atributos,
    Contadores, */
    Navbar
  }
}
</script>

<style>
  #app {
  }

  h1 {
    color: blue;
  }

  .jumbotron {
    padding-top: 48px !important;
    padding-bottom: 48px !important;
  }
</style>
