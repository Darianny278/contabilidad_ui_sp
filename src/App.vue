<template>
  <v-app>
    <v-app-bar
      app
      color="green"
      dark
    >
      <div class="d-flex align-center">
        <h2 class="pl-4">Contabilidad</h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        text
        :to="{name: 'tasaCambiaria'}"
      >
        <v-icon>mdi-currency-usd</v-icon>
        <span class="ml-2">Tasa cambiaria</span>
      </v-btn>

      <v-btn
        to="/"
        class="ml-3"
        text
      >
        <v-icon>mdi-home</v-icon>
        <span class="ml-2">Go to Home</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>
