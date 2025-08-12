import React from 'react';
import HeaderNaslov from "../komponente/HeaderNaslov";
import vukasin from "../slike/vukasin.jpeg";
import danica from "../slike/danica.jpeg";
import {Col, Row} from "react-bootstrap";
import TekstSaSlikom from "../komponente/TekstSaSlikom";

const ONama = () => {

    const onama = [
        {
            id: 1,
            imePrezime: "Vukašin Karajović",
            tekst: "Volim putovanja i istraživanje novih kultura. Moj cilj je da inspirišem druge da otkriju svet oko sebe.",
            slika: vukasin
        },
        {
            id: 2,
            imePrezime: "Danica Đurđić",
            tekst: "Strastvena sam prema fotografiji i volim da zabeležim lepotu svakodnevnog života. Zivot je lepsi na moru!",
            slika: danica
        }
    ];

    return (
        <>
            <HeaderNaslov naslov="Rekli su" podnaslov="o nama" />
            <Row>
                {
                    onama.map(osoba => (
                        <Col key={osoba.id} md={6} className="mb-4">
                            <TekstSaSlikom ime={osoba.imePrezime} tekst={osoba.tekst} slika={osoba.slika} />
                        </Col>
                    ))
                }

            </Row>
        </>
    );
};

export default ONama;
