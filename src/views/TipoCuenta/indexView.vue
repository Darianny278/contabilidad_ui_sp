<template>
  <v-container fluid class="pa-8">
    <v-btn
      class="custom-btn mb-8 mt-5"
      color="#42A5F5"
      @click="openCreateDialog"
      >Crear Nuevo Tipo de Cuenta</v-btn
    >

    <v-dialog v-model="dialog" max-width="500px">
      <v-card class="pa-5">
        <v-card-title>
          <span>{{ currentAction }} Tipo de Cuenta</span>
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="currentItem.descripcion"
            label="Descripción"
          ></v-text-field>
          <v-switch v-model="currentItem.estado" label="Estado"></v-switch>
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
import tipoCuentaService from "@/services/TipoCuenta/indexService.js";

export default {
  data() {
    return {
      dialog: false,
      items: [],
      currentItem: {},
      currentAction: "Crear",
      headers: [
        { text: "Descripcion", value: "descripcion" },
        { text: "Estado", value: "estado" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  async created() {
    await this.fetchTipoCuentas();
  },
  methods: {
    async fetchTipoCuentas() {
      this.items = await tipoCuentaService.getTipoCuentas();
    },
    async getLastId() {
      const lastItem = this.items[this.items.length - 1];
      return lastItem ? lastItem.id + 1 : 1;
    },
    openCreateDialog() {
      this.currentAction = "Crear";
      this.currentItem = { origen: "DB", cuentaContables: [] };
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
        await tipoCuentaService.addTipoCuenta(this.currentItem);
      } else {
        await tipoCuentaService.updateTipoCuenta(this.currentItem);
      }
      this.fetchTipoCuentas();
      this.dialog = false;
    },
    async deleteItem(item) {
      await tipoCuentaService.removeTipoCuenta(item.id);
      this.fetchTipoCuentas();
    },
  },
};
</script>
