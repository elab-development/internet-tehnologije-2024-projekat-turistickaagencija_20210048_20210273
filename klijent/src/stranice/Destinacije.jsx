import React, {useEffect} from 'react';
import HeaderNaslov from "../komponente/HeaderNaslov";
import axiosInstance from "../komunikacija/axiosKomunikacija";
import {Accordion, Col, Form, ListGroup, Row} from "react-bootstrap";
import countryCodes from "../podaci/county_codes";

const Destinacije = () => {

    const [destinacije, setDestinacije] = React.useState([]);
    const [izabranaDrzava, setIzabranaDrzava] = React.useState("");
    const [gradovi, setGradovi] = React.useState([]);
    const [regioni, setRegioni] = React.useState([]);

    useEffect(() => {
        axiosInstance.get('/putovanja').then(res => {
            if (res.data.uspesno === true) {
                setDestinacije(res.data.podaci);
            } else {
                console.error("Greška prilikom dohvaćanja destinacija:", res.statusText);
            }
        }).catch(err => {
            console.error("Došlo je do greške prilikom dohvaćanja destinacija:", err);
        })
    }, []);

    useEffect(() => {
        if (izabranaDrzava) {
            axiosInstance.get('/pretrazi-gradove?countryCode=' + izabranaDrzava).then(res => {
                if (res.data.uspesno === true) {
                    setGradovi(res.data.podaci);
                } else {
                    console.error("Greška prilikom dohvaćanja gradova:", res.statusText);
                }
            }).catch(err => {
                console.error("Došlo je do greške prilikom dohvaćanja gradova:", err);
            });
        } else {
            setGradovi([]);
        }
    }, [izabranaDrzava]);

    useEffect(() => {
        if (izabranaDrzava) {
            axiosInstance.get('/pretrazi-oblasti?countryCode=' + izabranaDrzava).then(res => {
                if (res.data.uspesno === true) {
                    setRegioni(res.data.podaci);
                } else {
                    console.error("Greška prilikom dohvaćanja regiona:", res.statusText);
                }
            }).catch(err => {
                console.error("Došlo je do greške prilikom dohvaćanja regiona:", err);
            });
        }
    }, [izabranaDrzava]);


    return (
        <>
            <HeaderNaslov naslov="Naše destinacije" podnaslov="Istražite naše popularne destinacije" />
            {
                destinacije.length > 0 ? (
                    <>
                        <Accordion defaultActiveKey="0">
                            {
                                destinacije.map((destinacija, index) => (
                                    <Accordion.Item eventKey={index.toString()} key={destinacija.id}>
                                        <Accordion.Header className="akordijan-header">{destinacija.nazivPutovanja} ({destinacija.lokacija})</Accordion.Header>
                                        <Accordion.Body className="akordijan-body">
                                            {destinacija.opis}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))
                            }
                        </Accordion>
                    </>
                ) : (
                    <p>Nema dostupnih destinacija.</p>
                )
            }
            <Row>
                <Col md={12} className="mb-4">
                    <Form.Group className="mb-3" controlId="formBasicAranzmani">
                        <Form.Label column={"lg"}>Drzave</Form.Label>
                        <Form.Select name="izabranaDrzava" onChange={
                            (e) => {
                                setIzabranaDrzava(e.target.value);
                            }
                        } size="lg">
                            {
                                countryCodes.map((drzava, index) => (
                                    <option key={index} value={drzava.code}>
                                        {drzava.name}
                                    </option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={6} className="mb-4">

                    <h1>Gradovi</h1>
                    <ListGroup>
                    {
                        gradovi.length > 0 ? (
                            <>
                                {
                                    gradovi.map((grad, index) => (
                                        <ListGroup.Item key={index}>
                                            {grad.name}
                                        </ListGroup.Item>
                                    ))
                                }
                            </>
                        ) : (
                            <>
                                Nema gradova
                            </>
                        )
                    }
                    </ListGroup>
                </Col>

                <Col md={6} className="mb-4">

                    <h1>Oblasti</h1>
                    <ListGroup>
                        {
                            gradovi.length > 0 ? (
                                <>
                                    {
                                        regioni.map((grad, index) => (
                                            <ListGroup.Item key={index}>
                                                {grad.name}
                                            </ListGroup.Item>
                                        ))
                                    }
                                </>
                            ) : (
                                <>
                                    Nema oblasti
                                </>
                            )
                        }
                    </ListGroup>
                </Col>
            </Row>
        </>
    );
};

export default Destinacije;
