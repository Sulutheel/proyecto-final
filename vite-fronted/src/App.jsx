import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Empireo from "./components/Empireo";
import Login from "./components/Login";
import Registro from "./components/Registro";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Empireo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </Router>
  );
}
