<template>
  <v-container fluid class="pa-8">
    <h2 class="text-red">Asientos Contables</h2>

    <v-row justify="end">
      <v-btn color="success" class="mr-3" @click="dialog = true">Crear Asiento Contable</v-btn>

      <v-btn color="primary" class="ml-3 mb-3" @click="resetFilters">
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

    <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>Crear Asiento Contable</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Descripción" v-model="newAsiento.descripcion"></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-select
                label="Auxiliar"
                :items="auxiliares"
                item-text="descripcion"
                item-value="id"
                v-model="newAsiento.idAuxiliar"
              ></v-select>
            </v-col>

            <v-col cols="12">
              <v-select
                label="Moneda"
                :items="monedas"
                item-text="codigo_moneda"
                item-value="id"
                v-model="newAsiento.idMonedaWS"
              ></v-select>
            </v-col>

            <v-col cols="12" v-for="(cuenta, index) in newAsiento.cuentas" :key="index">
              <v-select
                label="Cuenta Contable"
                :items="cuentasContables"
                item-text="descripcion"
                item-value="id"
                v-model="cuenta.idCuentaContable"
              ></v-select>
              <v-text-field label="Monto" type="number" v-model="cuenta.monto"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
        <v-btn color="blue darken-1" text @click="createAsiento">Crear</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </v-container>
</template>

<script>
import asientosContablesService from "@/services/AsientosContables/indexService.js";
import auxiliaresService from '@/services/Auxiliares/indexService'
import monedasService from '@/services/Moneda/indexService.js'
import cuentaContableService from "@/services/CuentaContable/indexService.js";

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
      dialog: false,
      newAsiento: {
        descripcion: '',
        idAuxiliar: null,
        idMonedaWS: 0,
        cuentas: [
          { idCuentaContable: null, descripcion: '', tipoMovimiento: 'DB', monto: null },
          { idCuentaContable: null, descripcion: '', tipoMovimiento: 'CR', monto: null }
        ]
      },
      cuentasContables: [],
      monedas: []
    };
  },
  watch: {
    'newAsiento.cuentas': {
      handler: 'updateCuentaDescriptions',
      deep: true
    }
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
    await this.fetchMonedas();
    await this.fetchCuentasContables();
  },
  methods: {
    async createAsiento() {
      try {
        await asientosContablesService.addAsientosContables(this.newAsiento);
        this.fetchAsientosContables()
      } catch (error) {
        console.log(error);
      }
      this.dialog = false;
    },
    async fetchAsientosContables() {
      this.items = await asientosContablesService.getAsientosContables();
    },
    async fetchCuentasContables() {
      this.cuentasContables = await cuentaContableService.getCuentaContables();
    },
    async fetchAuxiliares() {
      this.auxiliares = await auxiliaresService.getAuxiliares();
    },
    async fetchMonedas() {
      this.monedas = await monedasService.getMonedasConTasaDeCambio()
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
    updateCuentaDescriptions(newCuentas, oldCuentas) {
      newCuentas.forEach((cuenta, index) => {
        const oldCuenta = oldCuentas[index];
        if (cuenta.idCuentaContable && (!oldCuenta || cuenta.idCuentaContable !== oldCuenta.idCuentaContable)) {
          const cuentaContableSeleccionada = this.cuentasContables.find(c => c.id === cuenta.idCuentaContable);
          if (cuentaContableSeleccionada) {
            this.$set(this.newAsiento.cuentas, index, {
              ...cuenta,
              descripcion: cuentaContableSeleccionada.descripcion
            });
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.text-red {
  color: #EF5350;
}
</style>
