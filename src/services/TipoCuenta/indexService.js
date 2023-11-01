import http from "../axios";

export default {
  async getTipoCuentas() {
    try {
      const res = await http.get(`/TipoCuenta`);
      return res.data.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async getTipoCuentaById(id) {
    try {
      return await http.get(`/TipoCuenta/${id}`);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async addTipoCuenta(tipoCuenta) {
    try {
      return await http.post(`/TipoCuenta`, tipoCuenta);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async updateTipoCuenta(tipoCuenta) {
    try {
      return await http.put(`/TipoCuenta/${tipoCuenta.id}`, tipoCuenta);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async removeTipoCuenta(id) {
    try {
      return await http.delete(`/TipoCuenta/${id}`);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
