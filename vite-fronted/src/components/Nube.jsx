import { useState } from "react";
import { styled } from "@mui/system";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import logo from "../assets/empireo.jpg";
import {
  FaXbox,
  FaPlaystation,
  FaSteam,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";

const Gold = "#B89E63";
const Black = "#121212";

const Container = styled(Box)({
  minHeight: "100vh",
  backgroundColor: Black,
  color: Gold,
  padding: "2rem",
  fontFamily: "'Roboto', sans-serif",
});

const Header = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: "2rem",
});

const LogoImg = styled("img")({
  width: 80,
  height: 80,
  borderRadius: "50%",
  marginRight: "1rem",
  boxShadow: `0 0 15px ${Gold}`,
});

const SectionTitle = styled(Typography)({
  fontWeight: "bold",
  fontSize: "1.8rem",
  marginBottom: "1rem",
  textShadow: `0 0 10px ${Gold}`,
});

const GalleryGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
  gap: "1rem",
});

const ImageCard = styled(Box)({
  position: "relative",
  borderRadius: 12,
  overflow: "hidden",
  boxShadow: `0 0 10px ${Gold}`,
  cursor: "pointer",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.07)",
    boxShadow: `0 0 20px ${Gold}`,
  },
});

const StyledImg = styled("img")({
  width: "100%",
  height: "auto",
  display: "block",
});

const PlatformIconContainer = styled(Box)({
  position: "absolute",
  top: 8,
  right: 8,
  width: 36,
  height: 36,
  borderRadius: "50%",
  backgroundColor: Gold,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 0 8px rgba(184, 158, 99, 0.8)",
  color: Black,
  fontSize: 20,
});

const AddPhotoButton = styled(Button)({
  marginTop: "2rem",
  backgroundColor: Gold,
  color: Black,
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#a67d34",
  },
});

const ModalBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: Black,
  borderRadius: 8,
  boxShadow: 24,
  padding: "2rem",
  color: Gold,
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export default function Nube() {
  const [fotos, setFotos] = useState([
  { url: "https://picsum.photos/id/1011/400/300", categoria: "paisajes" },
  { url: "https://picsum.photos/id/1025/400/300", categoria: "mascotas" },
  { url: "https://picsum.photos/id/1033/400/300", categoria: "redes", plataforma: "instagram" },
  { url: "https://picsum.photos/id/1042/400/300", categoria: "redes", plataforma: "facebook" },
  { url: "https://picsum.photos/id/1050/400/300", categoria: "paisajes" },
  { url: "https://picsum.photos/id/1062/400/300", categoria: "mascotas" },
  { url: "https://picsum.photos/id/1074/400/300", categoria: "redes", plataforma: "instagram" },
  { url: "https://picsum.photos/id/1084/400/300", categoria: "redes", plataforma: "facebook" },
]);



  const [modalOpen, setModalOpen] = useState(false);
  const [claveModalOpen, setClaveModalOpen] = useState(false); // Modal para pedir clave
  const [crearClaveModalOpen, setCrearClaveModalOpen] = useState(false); // Modal para crear clave si no existe

  // Nueva foto
  const [newFotoUrl, setNewFotoUrl] = useState("");
  const [newFotoCategoria, setNewFotoCategoria] = useState("paisajes");
  const [newFotoPlataforma, setNewFotoPlataforma] = useState("xbox");
  const [newFotoFile, setNewFotoFile] = useState(null);
  const [newFotoPreview, setNewFotoPreview] = useState(null);

  // Clave de seguridad
  const [claveSeguridad, setClaveSeguridad] = useState(() => {
    // Intentamos cargar la clave de localStorage
    return localStorage.getItem("claveSeguridad") || "";
  });
  const [claveIngresada, setClaveIngresada] = useState("");

  // Estado para saber si estamos intentando subir foto o ver foto
  const [accionActual, setAccionActual] = useState(null); // 'subir' o 'ver'
  const [fotoSeleccionada, setFotoSeleccionada] = useState(null); // foto para ver si la clave es correcta

  const iconMap = {
    xbox: <FaXbox />,
    playstation: <FaPlaystation />,
    steam: <FaSteam />,
    instagram: <FaInstagram />,
    facebook: <FaFacebookF />,
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewFotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewFotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setNewFotoUrl(""); // limpiar url si hay archivo
    }
  };

  // Función para abrir modal para agregar foto, primero pide clave si existe
  const abrirModalAgregarFoto = () => {
    if (!claveSeguridad) {
      // No hay clave creada, pedir crear clave primero
      setCrearClaveModalOpen(true);
    } else {
      setAccionActual("subir");
      setClaveIngresada("");
      setClaveModalOpen(true);
    }
  };

  // Función para abrir foto (extraer) pidiendo clave
  const abrirFoto = (foto) => {
    if (!claveSeguridad) {
      alert("Primero debe crear una clave de seguridad para acceder a las fotos.");
      setCrearClaveModalOpen(true);
    } else {
      setFotoSeleccionada(foto);
      setAccionActual("ver");
      setClaveIngresada("");
      setClaveModalOpen(true);
    }
  };

  // Validar clave ingresada para acción actual
  const validarClave = () => {
    if (claveIngresada === claveSeguridad) {
      setClaveModalOpen(false);
      if (accionActual === "subir") {
        setModalOpen(true);
      } else if (accionActual === "ver") {
        alert("Acceso concedido a la foto."); 
        // Aquí podrías implementar vista ampliada o lo que desees
      }
    } else {
      alert("Clave incorrecta");
    }
  };

  // Guardar clave creada
  const guardarClave = () => {
    if (!claveIngresada) {
      alert("La clave no puede estar vacía");
      return;
    }
    setClaveSeguridad(claveIngresada);
    localStorage.setItem("claveSeguridad", claveIngresada);
    setCrearClaveModalOpen(false);
    alert("Clave de seguridad creada exitosamente");
  };

  const handleAgregarFoto = () => {
    let url = newFotoUrl;
    if (newFotoFile) {
      url = newFotoPreview;
    }
    if (!url) {
      alert("Debes ingresar URL o subir una foto desde tu ordenador.");
      return;
    }
    const nuevaFoto = { url, categoria: newFotoCategoria };
    if (newFotoCategoria === "juegos" || newFotoCategoria === "redes") {
      nuevaFoto.plataforma = newFotoPlataforma;
    }
    setFotos([...fotos, nuevaFoto]);
    setNewFotoUrl("");
    setNewFotoFile(null);
    setNewFotoPreview(null);
    setNewFotoCategoria("paisajes");
    setNewFotoPlataforma("xbox");
    setModalOpen(false);
  };

  return (
    <Container>
      <Header>
        <LogoImg src={logo} alt="Logo Empireo" />
        <Typography variant="h3" sx={{ color: Gold, fontWeight: "bold" }}>
         
        </Typography>
      </Header>

      <GalleryGrid>
        {fotos.map(({ url, categoria, plataforma }, i) => (
          <ImageCard key={i} onClick={() => abrirFoto({ url, categoria, plataforma })}>
            <StyledImg src={url} alt={`foto-${i}`} />
            {(categoria === "juegos" || categoria === "redes") && plataforma && (
              <PlatformIconContainer>{iconMap[plataforma]}</PlatformIconContainer>
            )}
          </ImageCard>
        ))}
      </GalleryGrid>

      <AddPhotoButton onClick={abrirModalAgregarFoto}>Agregar Foto</AddPhotoButton>

      {/* Modal para agregar foto */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalBox>
          <Typography variant="h6" sx={{ color: Gold, fontWeight: "bold" }}>
            Agregar Nueva Foto
          </Typography>

          <TextField
            label="URL de la foto"
            variant="filled"
            size="small"
            value={newFotoUrl}
            onChange={(e) => {
              setNewFotoUrl(e.target.value);
              setNewFotoFile(null);
              setNewFotoPreview(null);
            }}
            fullWidth
            sx={{ input: { color: Gold } }}
          />

          <Box>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ color: Gold, marginTop: "10px" }}
            />
            {newFotoPreview && (
              <Box mt={1} sx={{ maxHeight: 100, overflow: "hidden" }}>
                <img
                  src={newFotoPreview}
                  alt="preview"
                  style={{ width: "100%", borderRadius: 8 }}
                />
              </Box>
            )}
          </Box>

          <FormControl fullWidth>
            <InputLabel sx={{ color: Gold }}>Categoría</InputLabel>
            <Select
              value={newFotoCategoria}
              label="Categoría"
              onChange={(e) => setNewFotoCategoria(e.target.value)}
              sx={{ color: Gold }}
            >
              <MenuItem value="paisajes">Paisajes</MenuItem>
              <MenuItem value="mascotas">Mascotas</MenuItem>
              <MenuItem value="juegos">Juegos</MenuItem>
              <MenuItem value="redes">Redes Sociales</MenuItem>
            </Select>
          </FormControl>

          {(newFotoCategoria === "juegos" || newFotoCategoria === "redes") && (
            <FormControl fullWidth>
              <InputLabel sx={{ color: Gold }}>Plataforma / Red</InputLabel>
              <Select
                value={newFotoPlataforma}
                label="Plataforma / Red"
                onChange={(e) => setNewFotoPlataforma(e.target.value)}
                sx={{ color: Gold }}
              >
                {newFotoCategoria === "juegos" && (
                  <>
                    <MenuItem value="xbox">Xbox</MenuItem>
                    <MenuItem value="playstation">PlayStation</MenuItem>
                    <MenuItem value="steam">Steam</MenuItem>
                  </>
                )}
                {newFotoCategoria === "redes" && (
                  <>
                    <MenuItem value="instagram">Instagram</MenuItem>
                    <MenuItem value="facebook">Facebook</MenuItem>
                  </>
                )}
              </Select>
            </FormControl>
          )}

          <Button
            variant="contained"
            onClick={handleAgregarFoto}
            sx={{ mt: 1, backgroundColor: Gold, color: Black, fontWeight: "bold" }}
          >
            Agregar Foto
          </Button>
        </ModalBox>
      </Modal>

      {/* Modal para pedir clave */}
      <Modal open={claveModalOpen} onClose={() => setClaveModalOpen(false)}>
        <ModalBox>
          <Typography variant="h6" sx={{ color: Gold, fontWeight: "bold" }}>
            Ingresa la clave de seguridad
          </Typography>
          <TextField
            type="password"
            variant="filled"
            size="small"
            value={claveIngresada}
            onChange={(e) => setClaveIngresada(e.target.value)}
            fullWidth
            sx={{ input: { color: Gold } }}
          />
          <Button
            variant="contained"
            onClick={validarClave}
            sx={{ mt: 1, backgroundColor: Gold, color: Black, fontWeight: "bold" }}
          >
            Validar
          </Button>
        </ModalBox>
      </Modal>

      {/* Modal para crear clave */}
      <Modal open={crearClaveModalOpen} onClose={() => setCrearClaveModalOpen(false)}>
        <ModalBox>
          <Typography variant="h6" sx={{ color: Gold, fontWeight: "bold" }}>
            Crea una clave de seguridad
          </Typography>
          <TextField
            type="password"
            variant="filled"
            size="small"
            placeholder="Nueva clave"
            value={claveIngresada}
            onChange={(e) => setClaveIngresada(e.target.value)}
            fullWidth
            sx={{ input: { color: Gold } }}
          />
          <Button
            variant="contained"
            onClick={guardarClave}
            sx={{ mt: 1, backgroundColor: Gold, color: Black, fontWeight: "bold" }}
          >
            Guardar clave
          </Button>
        </ModalBox>
      </Modal>
    </Container>
  );
}
