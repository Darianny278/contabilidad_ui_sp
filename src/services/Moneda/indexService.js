import http from "../axios";

export default {
  async getMonedas() {
    try {
      const res = await http.get(`/Moneda`);
      return res.data.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async getMonedaById(id) {
    try {
      return await http.get(`/Moneda/${id}`);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async addMoneda(moneda) {
    try {
      return await http.post(`/Moneda`, moneda);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async updateMoneda(moneda) {
    try {
      return await http.put(`/Moneda/${moneda.id}`, moneda);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async removeMoneda(id) {
    try {
      return await http.delete(`/Moneda/${id}`);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
