import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigacija from "./komponente/Navigacija";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Pocetna from "./stranice/Pocetna";
import ONama from "./stranice/ONama";
import Destinacije from "./stranice/Destinacije";
import Aranzmani from "./stranice/Aranzmani";
import Kontakt from "./stranice/Kontakt";
import Rezervacije from "./stranice/Rezervacije";
import Admin from "./stranice/Admin";
import Registracija from "./stranice/Registracija";
import Login from "./stranice/Login";
import {Container} from "react-bootstrap";
import Footer from "./komponente/Footer";

function App() {
  return (
    <>
        <BrowserRouter>
            <Navigacija />
            <Container className="main">
                <Routes>
                    <Route path="/" element={<Pocetna />} />
                    <Route path="/o-nama" element={<ONama />} />
                    <Route path="/destinacije" element={<Destinacije />} />
                    <Route path="/aranzmani" element={<Aranzmani />} />
                    <Route path="/kontakt" element={<Kontakt />} />
                    <Route path="/rezervacije" element={<Rezervacije />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/register" element={<Registracija />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Container>
            <Footer />
        </BrowserRouter>

    </>
  );
}

export default App;