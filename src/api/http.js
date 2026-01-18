import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

/* ===== REQUEST INTERCEPTOR ===== */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ===== RESPONSE INTERCEPTOR ===== */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 → sesión inválida
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("authToken");
      window.location.reload();
      return Promise.reject(error);
    }

    // 🔴 CANAL ÚNICO DE ERROR AL UI
    const data = error.response?.data;

    let message = "Ocurrió un error inesperado";
    let details = [];

    if (typeof data === "string") {
      message = data;
    } else if (data && typeof data === "object") {
      message = data.message || message;
      details = Array.isArray(data.details) ? data.details : [];
    }

    window.dispatchEvent(
      new CustomEvent("global-api-error", {
        detail: {
          message,
          details,
        },
      })
    );

    return Promise.reject(error);
  }
);

export { api };
