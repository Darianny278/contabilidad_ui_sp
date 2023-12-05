import { fetchClient } from "../axios";

export default {
  async getAuxiliares() {
    try {
      const res = await fetchClient().get(`/Auxiliares`);
      return res.data.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async getAuxiliarById(id) {
    try {
      return await fetchClient().get(`/Auxiliares/${id}`);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async addAuxiliar(auxiliar) {
    try {
      return await fetchClient().post(`/Auxiliares`, auxiliar);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async updateAuxiliar(auxiliar) {
    try {
      return await fetchClient().put(`/Auxiliares/${auxiliar.id}`, auxiliar);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async removeAuxiliar(id) {
    try {
      return await fetchClient().delete(`/Auxiliares/${id}`);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
