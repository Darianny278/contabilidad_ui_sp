import { fetchClient, fetchExternalClient } from "../axios";

export default {
  async getMonedas() {
    try {
      const res = await fetchClient().get(`/Moneda`);
      return res.data.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async getMonedaById(id) {
    try {
      return await fetchClient().get(`/Moneda/${id}`);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async addMoneda(moneda) {
    try {
      return await fetchClient().post(`/Moneda`, moneda);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async updateMoneda(moneda) {
    try {
      return await fetchClient().put(`/Moneda/${moneda.id}`, moneda);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async removeMoneda(id) {
    try {
      return await fetchClient().delete(`/Moneda/${id}`);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async getMonedasConTasaDeCambio() {
    try {
      const res = await fetchExternalClient().get(`/tasacambiaria`);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
}
