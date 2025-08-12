import React, {useEffect} from 'react';
import HeaderNaslov from "../komponente/HeaderNaslov";
import {Col, Row, Table} from "react-bootstrap";
import axiosInstance from "../komunikacija/axiosKomunikacija";

const Rezervacije = () => {

    const user = JSON.parse(sessionStorage.getItem("user"));

    const [putovanjaPutnika, setPutovanjaPutnika] = React.useState([]);

    useEffect(() => {
        console.log(user);
        if (user && user.id) {
            axiosInstance.get(`/users/${user.id}/putnici`).then(res => {
                if (res.data.uspesno === true) {
                    setPutovanjaPutnika(res.data.podaci);
                } else {
                    console.error("Greška prilikom nalaženja putovanja putnika:", res.statusText);
                }
            }).catch(err => {
                console.error("Došlo je do greške prilikom nalaženja putovanja putnika:", err);
            });
        }
    }, []);


    return (
        <>
            <HeaderNaslov naslov="Moje rezervacije" podnaslov="Pregledajte svoje rezervacije" />
            <Row>
                <Col md={12} >
                    <Table hover responsive>
                        <thead>
                        <tr>
                            <th>Destinacija</th>
                            <th>Aranžman</th>
                            <th>Datum od</th>
                            <th>Datum do</th>
                            <th>Cena</th>
                        </tr>
                        </thead>
                        <tbody>
                        {putovanjaPutnika.length > 0 ? (
                            putovanjaPutnika.map((rezervacija, index) => (
                                <tr key={index}>
                                    <td>{rezervacija.aranzman.putovanje.nazivPutovanja} ({rezervacija.aranzman.putovanje.lokacija})</td>
                                    <td>{rezervacija.aranzman.nazivAranzmana}</td>
                                    <td>{new Date(rezervacija.aranzman.datumOd).toLocaleDateString()}</td>
                                    <td>{new Date(rezervacija.aranzman.datumDo).toLocaleDateString()}</td>
                                    <td>{rezervacija.ukupnaCenaAranzmana} &euro;</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">Nema rezervacija</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </>
    );
};

export default Rezervacije;
