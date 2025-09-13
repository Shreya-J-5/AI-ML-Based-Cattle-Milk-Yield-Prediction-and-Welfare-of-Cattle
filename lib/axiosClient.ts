import axios from "axios";

const axiosClient = axios.create({
  baseURL: "example api client server", // replace with hosted API base URL
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
