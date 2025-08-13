import React from 'react';
import {Container, Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import logo from '../slike/logo.png';

const Navigacija = () => {

    const tokenUsera = window.sessionStorage.getItem('tokenUsera');
    const user = tokenUsera ? JSON.parse(window.sessionStorage.getItem('user')) : null;
    const role = user ? user.role : null;

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/"><Image className="logo-image" src={logo} alt="Travel agency" thumbnail /> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Pocetna</Nav.Link>
                            <Nav.Link href="/destinacije">Destinacije</Nav.Link>
                            <Nav.Link href="/aranzmani">Aranzmani</Nav.Link>
                            <Nav.Link href="/o-nama">O nama</Nav.Link>
                            <Nav.Link href="/kontakt">Kontakt</Nav.Link>

                            {
                                tokenUsera && (
                                    <>
                                        <Nav.Link href="/rezervacije">Rezervacije</Nav.Link>

                                    </>
                                )
                            }

                            {
                               role && role !== 'putnik' && (
                                    <>
                                        <Nav.Link href="/admin">Admin</Nav.Link>
                                    </>
                                )
                            }

                            {
                                !tokenUsera && (
                                    <>
                                        <Nav.Link className="register-link" href="/register">Registracija</Nav.Link>
                                        <Nav.Link className="login-link" href="/login">Prijava</Nav.Link>

                                    </>
                                )
                            }

                            {
                                tokenUsera && (
                                    <>
                                        <Nav.Link href="/logout" onClick={
                                            (e) => {
                                                e.preventDefault();
                                                window.sessionStorage.removeItem('tokenUsera');
                                                window.sessionStorage.removeItem('user');
                                                window.location.href = '/';
                                            }
                                        }>Logout</Nav.Link>

                                    </>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Navigacija;
