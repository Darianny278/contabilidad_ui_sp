import { fetchClient } from "../axios";

export default {
  async getTipoCuentas() {
    try {
      const res = await fetchClient().get(`/TipoCuenta`);
      return res.data.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async getTipoCuentaById(id) {
    try {
      return await fetchClient().get(`/TipoCuenta/${id}`);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async addTipoCuenta(tipoCuenta) {
    try {
      return await fetchClient().post(`/TipoCuenta`, tipoCuenta);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async updateTipoCuenta(tipoCuenta) {
    try {
      return await fetchClient().put(`/TipoCuenta/${tipoCuenta.id}`, tipoCuenta);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async removeTipoCuenta(id) {
    try {
      return await fetchClient().delete(`/TipoCuenta/${id}`);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
