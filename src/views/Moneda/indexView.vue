<template>
  <v-container fluid class="pa-8">
    <v-btn
      class="custom-btn mb-8 mt-5"
      color="#EF5350"
      @click="openCreateDialog"
      >Crear Nueva Moneda</v-btn
    >

    <v-dialog v-model="dialog" max-width="500px">
      <v-card class="pa-5">
        <v-card-title>
          <span>{{ currentAction }} Moneda</span>
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="currentItem.codigoIso"
            label="Código ISO"
          ></v-text-field>
          <v-text-field
            v-model="currentItem.descripcion"
            label="Descripción"
          ></v-text-field>
          <v-text-field
            v-model="currentItem.tasaCambio"
            label="Tasa de Cambio"
            type="number"
          ></v-text-field>
          <v-switch v-model="currentItem.estado" label="Estado"></v-switch>
        </v-card-text>

        <v-card-actions>
          <v-btn class="error" @click="closeDialog">Cancelar</v-btn>
          <v-btn class="info" @click="saveItem">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table :headers="headers" :items="items" hide-default-footer :items-per-page="-1">
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
import monedasService from "@/services/Moneda/indexService.js";

export default {
  data() {
    return {
      dialog: false,
      items: [],
      currentItem: {},
      currentAction: "Crear",
      headers: [
        { text: "Código ISO", value: "codigoIso" },
        { text: "Descripcion", value: "descripcion" },
        { text: "Tasa de Cambio", value: "tasaCambio" },
        { text: "Estado", value: "estado" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  async created() {
    await this.fetchMonedas();
  },
  methods: {
    async fetchMonedas() {
      this.items = await monedasService.getMonedas();
    },
    async getLastId() {
      const lastItem = this.items[this.items.length - 1];
      return lastItem ? lastItem.id + 1 : 1;
    },
    openCreateDialog() {
      this.currentAction = "Crear";
      this.currentItem = {};
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
        await monedasService.addMoneda(this.currentItem);
      } else {
        await monedasService.updateMoneda(this.currentItem);
      }
      this.fetchMonedas();
      this.dialog = false;
    },
    async deleteItem(item) {
      await monedasService.removeMoneda(item.id);
      this.fetchMonedas();
    },
  },
};
</script>
