import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";
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

const preguntasSeguridad = [
  "¿Cuál es el nombre de tu primera mascota?",
  "¿Cuál es el nombre de tu ciudad natal?",
  "¿Cuál es tu comida favorita?",
  "¿Cuál es el nombre de tu escuela primaria?",
];

//const VITE_backendURL = `${VITE_backendURL}`;

export default function Registro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");

  const [checkTerminos, setCheckTerminos] = useState(false);
  const [checkPrivacidad, setCheckPrivacidad] = useState(false);
  const [checkPromociones, setCheckPromociones] = useState(false);

  const [errorRepassword, setErrorRepassword] = useState(false);
  const [errorRespuesta, setErrorRespuesta] = useState(false);
  const [errorPregunta, setErrorPregunta] = useState(false);
  const [errorTerminos, setErrorTerminos] = useState(false);
  const [errorPrivacidad, setErrorPrivacidad] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errores
    setErrorRepassword(false);
    setErrorPregunta(false);
    setErrorRespuesta(false);
    setErrorTerminos(false);
    setErrorPrivacidad(false);
    setMensajeError("");

    let valid = true;

    if (password !== repassword) {
      setErrorRepassword(true);
      valid = false;
    }
    if (!pregunta) {
      setErrorPregunta(true);
      valid = false;
    }
    if (!respuesta.trim()) {
      setErrorRespuesta(true);
      valid = false;
    }
    if (!checkTerminos) {
      setErrorTerminos(true);
      valid = false;
    }
    if (!checkPrivacidad) {
      setErrorPrivacidad(true);
      valid = false;
    }

    if (!valid) return;

    const payload = {
      name,
      email,
      password,
      pregunta,
      respuesta,
      checkTerminos,
      checkPrivacidad,
      checkPromociones,
    };

    try {
      const res = await fetch(`${VITE_backendURL}/api/registro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error al registrar usuario");
      }

      alert("✅ Usuario registrado con éxito");

      // Limpiar formulario
      setName("");
      setEmail("");
      setPassword("");
      setRepassword("");
      setPregunta("");
      setRespuesta("");
      setCheckTerminos(false);
      setCheckPrivacidad(false);
      setCheckPromociones(false);
    } catch (error) {
      setMensajeError(error.message);
    }
  };

  return (
    <StyledContainer>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: Gold, fontWeight: "bold" }}
      >
        Registro
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Nombre completo"
          variant="filled"
          fullWidth
          margin="normal"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          InputProps={{ style: { backgroundColor: "#333", color: White } }}
          InputLabelProps={{ style: { color: Gold } }}
        />
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
        <TextField
          label="Confirmar Contraseña"
          variant="filled"
          fullWidth
          margin="normal"
          type="password"
          required
          value={repassword}
          onChange={(e) => setRepassword(e.target.value)}
          error={errorRepassword}
          helperText={errorRepassword ? "Las contraseñas no coinciden" : ""}
          InputProps={{ style: { backgroundColor: "#333", color: White } }}
          InputLabelProps={{ style: { color: Gold } }}
        />

        <TextField
          select
          label="Pregunta de seguridad"
          variant="filled"
          fullWidth
          margin="normal"
          required
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          error={errorPregunta}
          helperText={errorPregunta ? "Seleccione una pregunta" : ""}
          InputProps={{ style: { backgroundColor: "#333", color: White } }}
          InputLabelProps={{ style: { color: Gold } }}
        >
          <MenuItem value="">
            <em>Selecciona una pregunta</em>
          </MenuItem>
          {preguntasSeguridad.map((p, i) => (
            <MenuItem key={i} value={p}>
              {p}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Respuesta"
          variant="filled"
          fullWidth
          margin="normal"
          required
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
          error={errorRespuesta}
          helperText={errorRespuesta ? "Ingrese una respuesta" : ""}
          InputProps={{ style: { backgroundColor: "#333", color: White } }}
          InputLabelProps={{ style: { color: Gold } }}
        />

        <Box sx={{ mt: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkTerminos}
                onChange={(e) => setCheckTerminos(e.target.checked)}
                sx={{ color: Gold, "&.Mui-checked": { color: Gold } }}
              />
            }
            label={
              <Typography sx={{ color: White, fontSize: "0.9rem" }}>
                He leído los{" "}
                <a href="/terminos" target="_blank" rel="noopener noreferrer" style={{ color: Gold }}>
                  términos del servicio Empireo
                </a>{" "}
                y los acepto
              </Typography>
            }
          />
          {errorTerminos && (
            <FormHelperText error sx={{ ml: 3 }}>
              Debes aceptar los términos del servicio
            </FormHelperText>
          )}

          <FormControlLabel
            control={
              <Checkbox
                checked={checkPrivacidad}
                onChange={(e) => setCheckPrivacidad(e.target.checked)}
                sx={{ color: Gold, "&.Mui-checked": { color: Gold } }}
              />
            }
            label={
              <Typography sx={{ color: White, fontSize: "0.9rem" }}>
                He leído la{" "}
                <a href="/privacidad" target="_blank" rel="noopener noreferrer" style={{ color: Gold }}>
                  política de privacidad de Empireo
                </a>{" "}
                y la acepto
              </Typography>
            }
          />
          {errorPrivacidad && (
            <FormHelperText error sx={{ ml: 3 }}>
              Debes aceptar la política de privacidad
            </FormHelperText>
          )}

          <FormControlLabel
            control={
              <Checkbox
                checked={checkPromociones}
                onChange={(e) => setCheckPromociones(e.target.checked)}
                sx={{ color: Gold, "&.Mui-checked": { color: Gold } }}
              />
            }
            label={
              <Typography sx={{ color: White, fontSize: "0.9rem" }}>
                He leído y acepto recibir correos con información promocional (opcional)
              </Typography>
            }
          />
        </Box>

        {mensajeError && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {mensajeError}
          </Typography>
        )}

        <StyledButton type="submit" fullWidth>
          Crear cuenta
        </StyledButton>
      </Box>
    </StyledContainer>
  );
}
