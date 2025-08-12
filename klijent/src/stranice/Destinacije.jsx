import React, {useEffect} from 'react';
import HeaderNaslov from "../komponente/HeaderNaslov";
import axiosInstance from "../komunikacija/axiosKomunikacija";
import {Accordion} from "react-bootstrap";

const Destinacije = () => {

    const [destinacije, setDestinacije] = React.useState([]);

    useEffect(() => {
        axiosInstance.get('/putovanja').then(res => {
            if (res.data.uspesno === true) {
                setDestinacije(res.data.podaci);
            } else {
                console.error("Greška prilikom nalaženja destinacija:", res.statusText);
            }
        }).catch(err => {
            console.error("Došlo je do greške prilikom nalaženja destinacija:", err);
        })
    }, []);

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
        </>
    );
};

export default Destinacije;
