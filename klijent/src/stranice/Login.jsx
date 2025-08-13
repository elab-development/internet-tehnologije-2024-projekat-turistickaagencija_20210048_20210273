import React from 'react';
import HeaderNaslov from "../komponente/HeaderNaslov";
import {Button, Form,Row,Col} from "react-bootstrap";
import useFormValues from "../hooks/useFormValues";
import axiosInstance from "../komunikacija/axiosKomunikacija";
import bali from "../slike/bali.jpeg";
const Login = () => {

    const [poruka, setPoruka] = React.useState("");

    const {formData, handleInputChange} = useFormValues({
        email: "",
        password: ""
    });

    const login = (e) => {
        e.preventDefault();

        axiosInstance.post('/login', formData).then(res => {
            if (res.data.uspesno === true) {
                window.sessionStorage.setItem('tokenUsera', res.data.podaci.token);
                window.sessionStorage.setItem('user', JSON.stringify(res.data.podaci.user));
                window.location.href = '/';
            } else {
                setPoruka("Neuspešna prijava. Proverite email i lozinku.");
            }
        }).catch(err => {
            if (err.response && err.response.status === 401) {
                setPoruka("Neuspešna prijava. Proverite email i lozinku.");
            } else {
                setPoruka("Došlo je do greške prilikom prijave. Pokušajte ponovo kasnije.");
            }
     } );

    }

    return (
  <>
    <HeaderNaslov naslov="Prijava" podnaslov={poruka} />

        <Row >
   
        <Col className="form-slika-red" md={6}>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label column="lg">Email</Form.Label>
                <Form.Control
                name="email"
                onChange={handleInputChange}
                type="email"
                placeholder="email"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label column="lg">Password</Form.Label>
                <Form.Control
                name="password"
                onChange={handleInputChange}
                type="password"
                placeholder="password"
                />
            </Form.Group>

            <Button onClick={login} className="btn dugme" type="submit">
                Prijavi se
            </Button>
            </Form>
        </Col>

       
        <Col md={6} className="slika-kolona">
            <img
            src={bali}
            alt="Bali"
           
            style={{ maxHeight: "400px" }}
            />
        </Col>
        </Row>
        </>
);
}

export default Login;
