import axios from "axios";
export default async function fetcher(...args) {
  const Axios = axios.create({
    baseURL: process.env.baseUrl,
    timeout: 10000,
  });
  Axios.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
      }
      return config;
    },
    (error) => Promise.reject(error),
    null,
    { synchronous: true }
  );

  try {
    const fetcher = await Axios(...args);
    return fetcher.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
