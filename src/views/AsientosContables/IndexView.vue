<template>
  <v-container fluid class="pa-8">
    <h2 class="text-red">Asientos Contables</h2>

    <v-row justify="end">
      <v-btn color="primary" class="mb-3" @click="resetFilters">
        Restablecer Filtros
      </v-btn>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateRangeText"
              label="Rango de Fechas"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dateRange"
            range
            @input="updateDateRange"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12" sm="6">
        <v-select
          v-model="selectedAuxiliar"
          :items="auxiliares"
          item-text="descripcion"
          item-value="id"
          label="Seleccione un Auxiliar"
          return-object
          clearable
        ></v-select>
      </v-col>
    </v-row>

    <v-data-table :headers="headers" :items="filteredItems" hide-default-footer :items-per-page="-1">
      <template v-slot:item.auxiliarId="{item}">
        {{ getAuxiliarNombre(item.auxiliarId) }}
      </template>
      <template v-slot:item.fecha="{item}">
        {{ formatDate(item.fecha) }}
      </template>

    </v-data-table>
  </v-container>
</template>

<script>
import asientosContablesService from "@/services/AsientosContables/indexService.js";
import auxiliaresService from '@/services/Auxiliares/indexService'

export default {
  data() {
    return {
      dialog: false,
      items: [],
      auxiliares: [],
      selectedAuxiliar: null,
      dateRange: [],
      dateRangeText: '',
      menu: false,
      headers: [
        { text: "Auxiliar", value: "auxiliarId" },
        { text: "Descripcion", value: "descripcion" },
        { text: "Fecha", value: "fecha" },
        { text: "Estado", value: "estado" },
      ],
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        const matchesAuxiliar = this.selectedAuxiliar ? item.auxiliarId === this.selectedAuxiliar.id : true;
        let matchesDateRange = true;

        if (this.dateRange.length === 2) {
          const startDate = new Date(this.dateRange[0]);
          const endDate = new Date(this.dateRange[1]);
          const itemDate = new Date(item.fecha);

          startDate.setUTCHours(0, 0, 0, 0);
          endDate.setUTCHours(23, 59, 59, 999);
          itemDate.setUTCHours(0, 0, 0, 0);

          matchesDateRange = itemDate >= startDate && itemDate <= endDate;
        }

        return matchesAuxiliar && matchesDateRange;
      });
    }
  },
  async created() {
    await this.fetchAsientosContables();
    await this.fetchAuxiliares();
  },
  methods: {
    async fetchAsientosContables() {
      this.items = await asientosContablesService.getAsientosContables();
    },
    async fetchAuxiliares() {
      this.auxiliares = await auxiliaresService.getAuxiliares();
    },
    getAuxiliarNombre(auxiliarId) {
      const auxiliar = this.auxiliares.find(tc => tc.id === auxiliarId);
      return auxiliar ? auxiliar.descripcion : 'Desconocido';
    },
    updateDateRange(value) {
      if (value.length === 2) {
        this.dateRange = [];
        this.dateRange = value;
        this.dateRangeText = `${value[0]} - ${value[1]}`;
        this.menu = false
      }
    },
    formatDate(value) {
      const date = new Date(value);
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return date.toLocaleDateString(undefined, options);
    },
    resetFilters() {
      this.selectedAuxiliar = null;
      this.dateRange = [];
      this.dateRangeText = '';
      this.fetchAsientosContables();
    },
  },
};
</script>

<style lang="scss" scoped>
.text-red {
  color: #EF5350;
}
</style>
