import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import logo from "../assets/empireo.jpg";
import buildingImage from "../assets/empireo-building.jpg";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Gold = "#B89E63";
const Black = "#121212";
const White = "#FFFFFF";

const StyledAppBar = styled(AppBar)({
  backgroundColor: Black,
  boxShadow: "none",
});

const LogoContainer = styled(Box)({
  width: 100,
  height: 100,
  backgroundImage: `url('https://www.transparenttextures.com/patterns/water.png')`,
  backgroundSize: "cover",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: 16,
});

const Logo = styled("img")({
  width: 80,
  height: 80,
});

const NavButton = styled(Button)({
  color: Gold,
  fontWeight: "bold",
  textTransform: "none",
  fontSize: "1rem",
  "&:hover": {
    backgroundColor: Gold,
    color: Black,
  },
});

const Hero = styled(Box)({
  backgroundImage: `url(${buildingImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start", // Alineación izquierda horizontal
  color: Gold,
  padding: "2rem 4rem",
  position: "relative",
  "::before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.6)",
    zIndex: 1,
  },
});

const HeroContent = styled(Box)({
  position: "relative",
  zIndex: 2,
  maxWidth: "700px",  // Limita ancho para que no ocupe toda la pantalla
  textAlign: "left",  // Alinea texto a la izquierda
});

const Footer = styled(Box)({
  backgroundColor: Black,
  color: Gold,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 2rem",
  fontSize: "0.875rem",
  userSelect: "none",
  borderTop: `1px solid ${Gold}`,
});

const GallerySection = styled(Box)({
  backgroundColor: "#0A0A0A",
  padding: "4rem 2rem",
  color: Gold,
});

export default function Empireo() {
  const [activeSection, setActiveSection] = useState("historia");
  const navigate = useNavigate();

  const showHistory = () => setActiveSection("historia");
  const showSocial = () => setActiveSection("social");

  const galleryImages = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb", // Naturaleza
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c", // Ciudad futurista
    "https://images.unsplash.com/photo-1485217988980-11786ced9454", // Montaña nevada
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", // Mar con cielo
  ];

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", position: "relative" }}>
      {/* NAV */}
      <StyledAppBar position="static">
        <Toolbar>
          <LogoContainer>
            <Logo src={logo} alt="Empireo logo" />
          </LogoContainer>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, color: Gold, fontWeight: "bold" }}
          >
            Empireo
          </Typography>
          <Stack direction="row" spacing={2}>
            <NavButton onClick={showHistory}>Historia</NavButton>
            <NavButton onClick={showSocial}>Síguenos</NavButton>
            <NavButton onClick={() => navigate("/login")}>Iniciar Sesión</NavButton>
            <NavButton onClick={() => navigate("/registro")}>Registrar</NavButton>
          </Stack>
        </Toolbar>
      </StyledAppBar>

      {/* HERO */}
      <Hero>
        <HeroContent>
          {activeSection === "historia" && (
            <>
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", color: Gold, mb: 2 }}
              >
                Empireo
              </Typography>
              <Typography variant="body1" sx={{ color: White, lineHeight: 1.8 }}>
                Fundada en 2021, Empireo se ha convertido en líder en soluciones avanzadas de almacenamiento
                de datos. Desde nuestra creación, nuestro objetivo ha sido ofrecer servicios innovadores que
                permiten a individuos y empresas proteger su información más valiosa con la máxima seguridad y
                confianza.
                <br />
                <br />
                En <b>Empireo</b>, entendemos que tus recuerdos no son solo imágenes, sino fragmentos valiosos de tu
                vida. Por eso hemos creado una plataforma donde puedes{" "}
                <b>guardar tus fotos con la máxima seguridad, privacidad y confianza</b>.
                <br />
                <br />
                Nuestra tecnología se basa en sistemas de cifrado avanzados y almacenamiento protegido, asegurando que{" "}
                <b>solo tú tengas acceso a tus archivos</b>. Ya sea que quieras conservar tus momentos familiares, tus
                viajes o tus creaciones artísticas, Empireo te ofrece un espacio personal y confiable en la nube.
                <br />
                <br />
                Con una interfaz intuitiva y acceso desde cualquier dispositivo, tendrás tus recuerdos siempre
                disponibles, sin preocuparte por pérdidas, robos o miradas no deseadas.
                <br />
                <br />
                <b>Empireo no es solo un sitio para guardar fotos; es un refugio digital para lo que más valoras.</b>
              </Typography>
            </>
          )}

          {activeSection === "social" && (
            <>
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", color: Gold, mb: 2 }}
              >
                Síguenos en Redes Sociales
              </Typography>
              <Stack direction="row" spacing={2}>
                <IconButton
                  href="https://facebook.com"
                  sx={{ color: Gold }}
                  target="_blank"
                  rel="noopener"
                >
                  <FacebookIcon fontSize="large" />
                </IconButton>
                <IconButton
                  href="https://twitter.com"
                  sx={{ color: Gold }}
                  target="_blank"
                  rel="noopener"
                >
                  <TwitterIcon fontSize="large" />
                </IconButton>
                <IconButton
                  href="https://instagram.com"
                  sx={{ color: Gold }}
                  target="_blank"
                  rel="noopener"
                >
                  <InstagramIcon fontSize="large" />
                </IconButton>
                <IconButton
                  href="https://linkedin.com"
                  sx={{ color: Gold }}
                  target="_blank"
                  rel="noopener"
                >
                  <LinkedInIcon fontSize="large" />
                </IconButton>
              </Stack>
            </>
          )}
        </HeroContent>
      </Hero>

      {/* GALERÍA */}
      {activeSection === "historia" && (
        <GallerySection>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 3,
            }}
          >
            {galleryImages.map((url, index) => (
              <Box
                key={index}
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: 3,
                  border: `1px solid ${Gold}`,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <img
                  src={`${url}?auto=format&fit=crop&w=800&q=80`}
                  alt={`Foto ${index + 1}`}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </Box>
            ))}
          </Box>
        </GallerySection>
      )}

      {/* FOOTER */}
      <Footer>
        <Typography variant="body2">
          Copyright © 2025 Empireo Inc. Todos los derechos reservados.
        </Typography>
        {activeSection === "social" && (
          <Box>
            <IconButton href="https://facebook.com" sx={{ color: Gold }}>
              <FacebookIcon />
            </IconButton>
            <IconButton href="https://twitter.com" sx={{ color: Gold }}>
              <TwitterIcon />
            </IconButton>
            <IconButton href="https://instagram.com" sx={{ color: Gold }}>
              <InstagramIcon />
            </IconButton>
            <IconButton href="https://linkedin.com" sx={{ color: Gold }}>
              <LinkedInIcon />
            </IconButton>
          </Box>
        )}
      </Footer>
    </Box>
  );
}

