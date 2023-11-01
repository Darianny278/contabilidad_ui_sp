import http from "../axios";

export default {
  async getAuxiliares() {
    try {
      const res = await http.get(`/Auxiliares`);
      return res.data.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async getAuxiliarById(id) {
    try {
      return await http.get(`/Auxiliares/${id}`);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async addAuxiliar(auxiliar) {
    try {
      return await http.post(`/Auxiliares`, auxiliar);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async updateAuxiliar(auxiliar) {
    try {
      return await http.put(`/Auxiliares/${auxiliar.id}`, auxiliar);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async removeAuxiliar(id) {
    try {
      return await http.delete(`/Auxiliares/${id}`);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
