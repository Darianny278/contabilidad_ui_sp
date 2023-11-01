import axios from "axios";

const fetchClient = () => {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: "https://contasys.azurewebsites.net/api",
  };

  // Create instance
  const instance = axios.create(defaultOptions);
  return instance;
};

export default fetchClient();