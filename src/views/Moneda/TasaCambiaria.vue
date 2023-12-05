<template>
  <v-container class="pa-8" fluid>
    <v-btn
      class="custom-btn mb-8 mt-5"
      color="#EF5350"
      @click="dialog = true"
    >Calcular tasa
    </v-btn
    >

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Calcular Tasa Cambiaria</v-card-title>

        <p class="px-7">La moneda base es peso dominicano</p>
        <v-card-text>
          <v-select
            v-model="selectedTasa"
            :items="items"
            item-text="codigo_moneda"
            item-value="tasa"
            label="Seleccione Moneda"
          ></v-select>
          <v-text-field
            v-model="monto"
            label="Monto"
            type="number"
          ></v-text-field>
          <div class="text--secondary" v-if="total > 0">Total: {{ total }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn class="error" @click="dialog = false">Cancelar</v-btn>
          <v-btn class="info" @click="calcularTasa">Calcular tasa</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table :headers="headers" :items="items" :items-per-page="-1" hide-default-footer>
    </v-data-table>
  </v-container>
</template>

<script>
import monedasService from '@/services/Moneda/indexService.js'

export default {
  data() {
    return {
      dialog: false,
      items: [],
      total: 0,
      selectedTasa: null,
      monto: 0,
      headers: [
        { text: 'Código ISO', value: 'codigo_moneda' },
        { text: 'Tasa', value: 'tasa' },
      ],
    }
  },
  async created() {
    await this.fetchMonedas()
  },
  methods: {
    async fetchMonedas() {
      this.items = await monedasService.getMonedasConTasaDeCambio()
    },
    calcularTasa() {
      if (this.selectedTasa && this.monto) {
        this.total = this.selectedTasa * this.monto;
      } else {
        this.total = 0;
      }
    }
  },
}
</script>
