import { useState } from "react";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import { styled } from "@mui/system";

const Gold = "#B89E63";
const Black = "#1E1E1E";
const White = "#FFFFFF";

const StyledContainer = styled(Container)({
  backgroundColor: Black,
  color: White,
  borderRadius: 8,
  padding: "2rem",
  marginTop: "4rem",
  maxWidth: 400,
  boxShadow: `0 0 10px ${Gold}`,
});

const StyledButton = styled(Button)({
  backgroundColor: Gold,
  color: Black,
  fontWeight: "bold",
  marginTop: "1rem",
  "&:hover": {
    backgroundColor: "#9B7D43",
  },
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de login
    alert(`Iniciando sesión con:\nEmail: ${email}\nPassword: ${password}`);
  };

  return (
    <StyledContainer>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: Gold, fontWeight: "bold" }}>
        Iniciar Sesión
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Correo electrónico"
          variant="filled"
          fullWidth
          margin="normal"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{ style: { backgroundColor: "#333", color: White } }}
          InputLabelProps={{ style: { color: Gold } }}
        />
        <TextField
          label="Contraseña"
          variant="filled"
          fullWidth
          margin="normal"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{ style: { backgroundColor: "#333", color: White } }}
          InputLabelProps={{ style: { color: Gold } }}
        />
        <StyledButton type="submit" fullWidth>
          Entrar
        </StyledButton>
      </Box>
    </StyledContainer>
  );
}
