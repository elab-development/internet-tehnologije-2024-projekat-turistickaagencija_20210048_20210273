import React from 'react';
import useFormValues from "../hooks/useFormValues";
import axiosInstance from "../komunikacija/axiosKomunikacija";
import HeaderNaslov from "../komponente/HeaderNaslov";
import {Button, Form} from "react-bootstrap";

const Registracija = () => {
    const [poruka, setPoruka] = React.useState("");

    const {formData, handleInputChange} = useFormValues({
        email: "",
        password: "",
        name: ""
    });

    const registracija = (e) => {
        e.preventDefault();

        axiosInstance.post('/register', formData).then(res => {
            if (res.data.uspesno === true) {
                setPoruka("Uspešna registracija! Sada se možete prijaviti.");
            } else {
                setPoruka("Neuspešna registracija. ");
            }
        }).catch(err => {
            setPoruka("Došlo je do greške prilikom registracije. Pokušajte ponovo kasnije.");
        });
    }

    return (
        <>
            <HeaderNaslov naslov="Registracija korisnika" podnaslov={poruka} />

            <Form>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label column={"lg"}>Ime i prezime</Form.Label>
                    <Form.Control name="name" onChange={handleInputChange} type="text" placeholder="Unesi ime i prezime" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label column={"lg"}>Email adresa</Form.Label>
                    <Form.Control name="email" onChange={handleInputChange} type="email" placeholder="Email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label column={"lg"}>Password</Form.Label>
                    <Form.Control name="password" onChange={handleInputChange} type="password" placeholder="Password" />
                </Form.Group>
                <Button onClick={registracija} className="btn dugme" type="submit">
                    Registruj se
                </Button>
            </Form>
        </>

    );
};

export default Registracija;
