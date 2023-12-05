<template>
  <v-container fluid class="pa-8">
    <v-btn
      class="custom-btn mb-8 mt-5"
      color="#AB47BC"
      @click="openCreateDialog"
      >Crear Nueva Cuenta Contable</v-btn
    >

    <v-dialog v-model="dialog" max-width="500px">
      <v-card class="pa-5">
        <v-card-title>
          <span>{{ currentAction }} Cuenta Contable</span>
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="currentItem.descripcion"
            label="Descripción"
          ></v-text-field>
          <v-select
            :items="tipoCuentas"
            item-text="descripcion"
            item-value="id"
            v-model="currentItem.tipoId"
            label="Tipo de Cuenta"
          ></v-select>
          <v-select
            :items="items"
            item-text="descripcion"
            item-value="id"
            v-model="currentItem.cuentaMayorId"
            label="Cuenta Mayor"
            clearable
          ></v-select>
          <v-switch v-model="currentItem.estado" label="Estado"></v-switch>
          <v-radio-group v-model="currentItem.permiteMov" label="Permite movimientos">
            <v-radio label="Sí" value="S"></v-radio>
            <v-radio label="No" value="N"></v-radio>
          </v-radio-group>
          <v-text-field
            v-model="currentItem.nivel"
            label="Nivel"
            type="number"
          ></v-text-field>
          <v-text-field
            v-model="currentItem.balance"
            label="Balance"
            type="number"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn class="error" @click="closeDialog">Cancelar</v-btn>
          <v-btn class="info" @click="saveItem">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items="items"
      hide-default-footer
      :items-per-page="-1"
    >
      <template v-slot:item.tipoId="{item}">
        {{ getTipoCuentaNombre(item.tipoId) }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn icon color="info" @click="openEditDialog(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="error" @click="deleteItem(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import cuentaContableService from "@/services/CuentaContable/indexService.js";
import tipoCuentaService from "@/services/TipoCuenta/indexService.js";

export default {
  data() {
    return {
      dialog: false,
      items: [],
      currentItem: {
        cuentaMayorId: null,
        cuentaMayor: null,
        tipo: null,
        inverseCuentaMayor: [],
      },
      currentAction: "Crear",
      tipoCuentas: [],
      headers: [
        { text: "Descripcion", value: "descripcion" },
        { text: "Tipo de Cuenta", value: "tipoId" },
        { text: "Balance", value: "balance" },
        { text: "Estado", value: "estado" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  async created() {
    await this.fetchCuentaContables();
    await this.fetchTipoCuentas();
  },
  methods: {
    async fetchCuentaContables() {
      this.items = await cuentaContableService.getCuentaContables();
    },
    async fetchTipoCuentas() {
      this.tipoCuentas = await tipoCuentaService.getTipoCuentas();
    },
    async getLastId() {
      const lastItem = this.items[this.items.length - 1];
      return lastItem ? lastItem.id + 1 : 1;
    },
    getTipoCuentaNombre(tipoId) {
      const tipo = this.tipoCuentas.find(tc => tc.id === tipoId);
      return tipo ? tipo.descripcion : 'Desconocido';
    },
    openCreateDialog() {
      this.currentAction = "Crear";
      this.currentItem = {
        cuentaMayorId: null,
        cuentaMayor: null,
        tipo: null,
        inverseCuentaMayor: [],
      };
      this.dialog = true;
    },
    openEditDialog(item) {
      this.currentAction = "Editar";
      this.currentItem = { ...item };
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    async saveItem() {
      if (this.currentAction === "Crear") {
        this.currentItem.id = await this.getLastId();
        await cuentaContableService.addCuentaContable(this.currentItem);
      } else {
        await cuentaContableService.updateCuentaContable(this.currentItem);
      }
      this.fetchCuentaContables();
      this.dialog = false;
    },
    async deleteItem(item) {
      await cuentaContableService.removeCuentaContable(item.id);
      this.fetchCuentaContables();
    },
  },
};
</script>
