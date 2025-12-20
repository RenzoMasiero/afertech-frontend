import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080", // CAMBIÁ si tu backend usa otro puerto
});
