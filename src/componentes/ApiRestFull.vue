<template>

  <section class="src-componentes-api-rest-full">
      <div class="jumbotron">
        <h2>Componente Api Rest Full</h2>
        <hr>

        <!-- <pre>{{ usuarios }}</pre> -->

        <h3>Vue form</h3>

            <button class="btn btn-success mr-3" @click="getUsuarios()">Obtener usuarios</button>
        <hr>

        <vue-form :state="formState" @submit.prevent="enviar(formData.nombre, formData.edad, formData.email)">
            <!-- Campo nombre -->
            
            <validate tag="div">
                <label for="nombre">Nombre</label>
                  <input 
                  type="text" 
                  id="nombre" 
                  name="nombre"
                  class="form-control"
                  autocomplete="off"
                  v-model.trim="formData.nombre"
                  required
                  :minlength="nombreLengthMin"
                  :maxlength="nombreLengthMax"
                  no-espacios
                >
                <!-- Carteles de validación de campo -->
                
                <field-messages name="nombre" show="$dirty">
                <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
                <div slot="no-espacios" class="alert alert-danger mt-1">
                  No se permiten espacios intermedios en este campo
                </div>
                <div slot="minlength" class="alert alert-danger mt-1">
                  Se deben ingresar como mínimo {{nombreLengthMin}} caracteres
                </div>
                <div v-if="formData.nombre.length == nombreLengthMax" class="alert alert-danger mt-1">
                  Máximo de caracteres ({{nombreLengthMax}}) alcanzados
                </div>
              </field-messages>
            </validate>
            <br>

            <!-- Campo edad -->
              <validate tag="div">
              <label for="edad">edad</label>
              <input 
                type="number" 
                id="edad" 
                class="form-control"
                name="edad"
                autocomplete="off"
                v-model.number="formData.edad"
                required
                :min="edadMin"
                :max="edadMax"
              >
              <!-- Carteles de validación de campo -->
              <field-messages name="edad" show="$dirty">
                <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
                <div slot="min" class="alert alert-danger mt-1">La edad mínima es de {{edadMin}} años</div>
                <div slot="max" class="alert alert-danger mt-1">La edad máxima es de {{edadMax}} años</div>
              </field-messages>
            </validate>
            <br>

            <!-- Campo email -->
          <validate tag="div">
            <label for="email">email</label>
            <input 
              type="email" 
              id="email" 
              class="form-control"
              name="email"
              autocomplete="off"
              v-model.trim="formData.email"
              required
            >
            <!-- Carteles de validación de campo -->
            <field-messages name="email" show="$dirty">
              <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
              <div slot="email" class="alert alert-danger mt-1">Email no válido</div>
            </field-messages>
          </validate>
          <br>
        <button class="btn btn-success my-4" :disabled="formState.$invalid" type="submit">Enviar</button>
        </vue-form>
       <hr>





        <div class="media alert alert-info mt-3" v-for="(usuario,index) in usuarios" :key="index">
          <div class="media-body ml-4">
            <h4><u>Usuario {{ index+1 }} - ID: {{usuario.id}}</u></h4>
            <br>
            <p>Nombre: <b>{{usuario.nombre}}</b></p>
            <p>Edad: <i>{{usuario.edad}}</i></p>
            <p>Mail: {{usuario.email}}</p>

            <button class="btn btn-danger mr-3" @click="deleteUsuario(usuario.id)">DELETE</button>

          </div>
        </div>

      </div>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'src-componentes-api-rest-full',
    props: [],

//}

    /* --------------------------------------------------------------- */
    /*          CICLO DE VIDA DE LOS COMPONENTES DE VUE                */
    /* --------------------------------------------------------------- */
    /*  https://v3.vuejs.org/api/options-lifecycle-hooks.html#updated  */
    /* --------------------------------------------------------------- */

    /* --------------------------------------------------------------- */
    //Instanciación del componente
     beforeCreate() {
      console.log('ApiRestFull -> beforeCreate')
    },
    created() {
      console.log('ApiRestFull -> created')
    },
    /* --------------------------------------------------------------- */
    //Montaje del componente en la vista
    beforeMount() {
      console.log('ApiRestFull -> beforeMount')
    },
    mounted() {
      console.log('ApiRestFull -> mounted')
      this.getUsuarios()

    },
    /* --------------------------------------------------------------- */
    //Actualización de la vista del componente
   beforeUpdate() {
      console.log('ApiRestFull -> beforeUpdate')
    },
    updated() {
      console.log('ApiRestFull -> updated')
    },
    /* --------------------------------------------------------------- */
    //Destrucción del componente
    beforeDestroy() {
      console.log('ApiRestFull -> beforeDestroy')
    },
    destroyed() {
      console.log('ApiRestFull -> destroyed')

      clearInterval(this.refInterval)
    }, 
    /* --------------------------------------------------------------- */

    data () {
      return {
      urlUsuarios : 'https://60ab09cc5a4de40017cc93e5.mockapi.io/usuarios/',
      usuarios : [],
      refInterval : null,
      nombreLengthMin : 5,
      nombreLengthMax: 15,
      formData : this.getInicialData(),
      edadMin: 18,
      edadMax: 120,
      formState: {},
      }
    },
    methods: {
      getInicialData() {
      return {
        nombre: '',
        edad: '',
        email: ''

      }
    },
      enviar(n, e, m) { 
        console.log({...this.formData})
        this.postUsuario(n, e, m)
        this.formData = this.getInicialData()
        this.formState._reset()
        
    },

      convertirFmtFyh(fyh) {
        return new Date(fyh).toLocaleString()
      },

      /* --------------------------------------- */
      /*             API REST -> GET             */
      /* --------------------------------------- */
      async getUsuarios() {
        console.log('getUsuarios')
        try {
          let respuesta = await this.axios(this.urlUsuarios)
          console.log('AXIOS GET',respuesta.data)
          this.usuarios = respuesta.data
        }
        catch(error) {
          console.log(error)
        }
      },
      /* --------------------------------------- */
      /*            API REST -> POST             */
      /* --------------------------------------- */
      async postUsuario(n, e, m) {
        console.log('postUsuario')

         let usuario = {
           nombre: n,
           edad: e,
           email: m
         }

        try {
          let respuesta = await this.axios.post(this.urlUsuarios, usuario, {'content-type':'application/json'})
          console.log('AXIOS POST',respuesta.data)

          //this.getUsuarios()

          
          this.usuarios.push(usuario)
        }
        catch(error) {
          console.log(error)
        }

      },
      /* --------------------------------------- */
      /*            API REST -> PUT              */
      /* --------------------------------------- */
      async putUsuario(id) {
        console.log('putUsuario',id)

       /* let usuario = {
          nombre: "María",
          foto: "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/9_avatar-128.png",
          descripcion: "Usuaria del sistema B",
          coordenadas: [
          "7890",
          "0987"
          ],
          comentarios: "Estoy muy bien!",
          direccion: "CABA 456"          
        }

        try {
          let respuesta = await this.axios.put(this.urlUsuarios+id, usuario, {'content-type':'application/json'})
          console.log('AXIOS PUT',respuesta.data)

          //this.getUsuarios()
          let user = respuesta.data

          //this.getUsuarios()

          //https://www.w3schools.com/jsref/jsref_splice.asp
          let indice = this.usuarios.findIndex(usuario => usuario.id == user.id)
          this.usuarios.splice(indice,1,user)
        }
        catch(error) {
          console.log(error)
        }*/

      },
      /* --------------------------------------- */
      /*           API REST -> DELETE            */
      /* --------------------------------------- */
      async deleteUsuario(id) {
        console.log('deleteUsuario',id)

        try {
          let respuesta = await this.axios.delete(this.urlUsuarios+id)
          console.log('AXIOS DELETE',respuesta.data)
          let user = respuesta.data

          //this.getUsuarios()

          //https://www.w3schools.com/jsref/jsref_splice.asp
          let indice = this.usuarios.findIndex(usuario => usuario.id == user.id)
          this.usuarios.splice(indice,1)          
        }
        catch(error) {
          console.log(error)
        }        
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-componentes-api-rest-full {

  }

  .jumbotron {
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#f9c667+0,f79621+100;Orange+3D+%234 */
    background: rgb(249,198,103); /* Old browsers */
    background: -moz-linear-gradient(left,  rgba(249,198,103,1) 0%, rgba(247,150,33,1) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left,  rgba(249,198,103,1) 0%,rgba(247,150,33,1) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right,  rgba(249,198,103,1) 0%,rgba(247,150,33,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f9c667', endColorstr='#f79621',GradientType=1 ); /* IE6-9 */

    color: rgb(63, 13, 13);
  }

  hr {
    background-color: rgb(255, 255, 255);
  }
  pre {
    color: rgb(0, 0, 0);
}

</style>
