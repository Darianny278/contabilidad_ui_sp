import { fetchClient } from "../axios";

export default {
  async getAsientosContables() {
    try {
      const res = await fetchClient().get(`/AsientosContables`);
      return res.data.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async addAsientosContables(asiento) {
    try {
      return await fetchClient().post(`/AsientosContables/InsertarAsientoContable`, asiento);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
}
