<template>
    <v-container fluid>
      <v-row>
        <v-col v-for="card in cards" :key="card.title" cols="12" md="3"  class="d-flex justify-center mt-10">
          <v-card
            :to="card.route"
            class="d-flex flex-column align-center justify-center"
            :style="{ height: '400px', width: '400px', backgroundColor: card.color }"
          >
            <v-card-title class="text-center" style="color: white;">{{ card.title }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cards: [
          {
            title: "Auxiliares",
            route: "/auxiliares",
            color: "#FFA726"
          },
          {
            title: "Moneda",
            route: "/monedas",
            color: "#EF5350"
          },
          {
            title: "Tipo Cuenta",
            route: "/tipoCuenta",
            color: "#42A5F5"
          },
          {
            title: "Cuenta Contable",
            route: "/cuentaContable",
            color: "#AB47BC"
          }
        ]
      };
    }
  };
  </script>
  