// src/pages/LoginPage.jsx

import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("INVALID_CREDENTIALS");
      }

      const data = await response.json();

      if (!data.token) {
        throw new Error("TOKEN_NOT_RECEIVED");
      }

      // 🔹 Guardamos token
      localStorage.setItem("authToken", data.token);

      // 🔹 AVISAMOS A APP QUE EL LOGIN FUE OK
      onLoginSuccess();

    } catch (error) {
      setErrorMessage("Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 360 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Gestión Total
        </Typography>

        <Typography variant="subtitle1" align="center" sx={{ mb: 3 }}>
          Iniciar sesión
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errorMessage && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {errorMessage}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
