import http from "../axios";

export default {
  async getCuentaContables() {
    try {
      const res = await http.get(`/CuentaContable`);
      return res.data.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async getCuentaContableById(id) {
    try {
      return await http.get(`/CuentaContable/${id}`);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async addCuentaContable(cuentaContable) {
    try {
      return await http.post(`/CuentaContable`, cuentaContable);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async updateCuentaContable(cuentaContable) {
    try {
      return await http.put(`/CuentaContable/${cuentaContable.id}`, cuentaContable);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async removeCuentaContable(id) {
    try {
      return await http.delete(`/CuentaContable/${id}`);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
