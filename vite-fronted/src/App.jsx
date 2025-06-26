import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Empireo from "./components/Empireo";
import Registro from "./components/Registro";
import Nube from "./components/Nube";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Empireo />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/nube" element={<Nube />} />
      </Routes>
    </Router>
  );
}
