<template>
  <v-container fluid class="pa-8">
    <v-btn
      class="custom-btn mb-8 mt-5"
      color="#FFA726"
      @click="openCreateDialog"
      >Crear Nuevo Auxiliar</v-btn
    >

    <v-dialog v-model="dialog" max-width="500px">
      <v-card class="pa-5">
        <v-card-title>
          <span>{{ currentAction }} Auxiliar</span>
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
import auxiliaresService from "@/services/Auxiliares/indexService.js";

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
    await this.fetchAuxiliares();
  },
  methods: {
    async fetchAuxiliares() {
      this.items = await auxiliaresService.getAuxiliares();
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
        await auxiliaresService.addAuxiliar(this.currentItem);
      } else {
        await auxiliaresService.updateAuxiliar(this.currentItem);
      }
      this.fetchAuxiliares();
      this.dialog = false;
    },
    async deleteItem(item) {
      await auxiliaresService.removeAuxiliar(item.id);
      this.fetchAuxiliares();
    },
  },
};
</script>

<style>
/* Botones */
.custom-btn {
  color: #ffffff !important;
  border-radius: 8px;
  padding: 10px 20px;
}

.custom-btn:hover {
  transform: scale(1.05);
}

.custom-btn:active {
  transform: scale(0.95);
}

.cancel-btn {
  background-color: #d9d9d9;
  color: #4a4a4a;
  border-radius: 8px;
  padding: 10px 20px;
  transition: transform 0.2s;
}

.cancel-btn:hover {
  transform: scale(1.05);
}

.cancel-btn:active {
  transform: scale(0.95);
}

/* Tabla */
.v-data-table {
  width: 100%;
  border-collapse: collapse !important;
}

.v-data-table > thead {
  background-color: #f7f7f7 !important;
}

.v-data-table > tbody > tr:nth-of-type(odd) {
  background-color: #f9f9f9 !important;
}

.v-data-table > tbody > tr > td {
  padding: 15px !important;
  border: 1px solid #e7e7e7 !important;
}

.lilac {
  background-color: #9c8aa5 !important;
  color: #ffffff !important;
  border-radius: 50% !important;
  transition: transform 0.2s !important;
}

.lilac:hover {
  transform: scale(1.1) !important;
}

.beige {
  background-color: #f5f5dc !important;
  color: #4a4a4a !important;
  border-radius: 50% !important;
  transition: transform 0.2s !important;
}

.beige:hover {
  transform: scale(1.1) !important;
}
</style>
