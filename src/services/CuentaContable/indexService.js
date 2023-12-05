import { fetchClient } from "../axios";

export default {
  async getCuentaContables() {
    try {
      const res = await fetchClient().get(`/CuentaContable`);
      return res.data.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async getCuentaContableById(id) {
    try {
      return await fetchClient().get(`/CuentaContable/${id}`);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async addCuentaContable(cuentaContable) {
    try {
      return await fetchClient().post(`/CuentaContable`, cuentaContable);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async updateCuentaContable(cuentaContable) {
    try {
      return await fetchClient().put(`/CuentaContable/${cuentaContable.id}`, cuentaContable);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async removeCuentaContable(id) {
    try {
      return await fetchClient().delete(`/CuentaContable/${id}`);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
