import React, {useEffect} from 'react';
import HeaderNaslov from "../komponente/HeaderNaslov";
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import axiosInstance from "../komunikacija/axiosKomunikacija";
import {IoCheckboxOutline, IoCheckmark, IoDisc} from "react-icons/io5";

const Aranzmani = () => {

    const [destinacije, setDestinacije] = React.useState([]);
    const [aranzmani, setAranzmani] = React.useState([]);
    const [izabranoPutovanje, setIzabranoPutovanje] = React.useState(0);
    const [ucitaniAranzman, setUcitaniAranzman] = React.useState(null);
    const user = JSON.parse(window.sessionStorage.getItem("user"));
    const [putovanjaPutnika, setPutovanjaPutnika] = React.useState([]);
    const [poruka, setPoruka] = React.useState("Izaberite putovanje da biste videli aranžmane");

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
        if (izabranoPutovanje > 0) {
            axiosInstance.get(`/aranzmani/${izabranoPutovanje}`).then(res => {
                if (res.data.uspesno === true) {
                    setAranzmani(res.data.podaci);
                } else {
                    console.error("Greška prilikom dohvaćanja aranžmana:", res.statusText);
                }
            }).catch(err => {
                console.error("Došlo je do greške prilikom dohvaćanja aranžmana:", err);
            });
        } else{
            setAranzmani([]);
        }
    }, [izabranoPutovanje]);

    useEffect(() => {
        if (user && user.id) {
            axiosInstance.get(`/users/${user.id}/putnici`).then(res => {
                if (res.data.uspesno === true) {
                    setPutovanjaPutnika(res.data.podaci);
                } else {
                    console.error("Greška prilikom dohvaćanja putovanja putnika:", res.statusText);
                }
            }).catch(err => {
                console.error("Došlo je do greške prilikom dohvaćanja putovanja putnika:", err);
            });
        }
    }, []);


    return (
        <>
            <HeaderNaslov naslov="Aranžmani" podnaslov={poruka} />
            <Row>
                <Col md={9} className="mb-4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label column={"lg"}>Izaberite putovanje</Form.Label>
                        <Form.Select size="lg" onChange={(e) => setIzabranoPutovanje(e.target.value)} aria-label="Default select example">
                            <option value="0"> Izaberite putovanje</option>
                            {
                                destinacije.map((destinacija) => (
                                    <option key={destinacija.id} value={destinacija.id}>
                                        {destinacija.nazivPutovanja} ({destinacija.lokacija})
                                    </option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                    <hr/>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Naziv aranzmana</th>
                                <th>Datum početka</th>
                                <th>Datum završetka</th>
                                <th>Cena</th>
                                <th>Popust</th>
                                <th>Kapacitet</th>
                                <th>Akcije</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                aranzmani.length > 0 ? (
                                    aranzmani.map((aranzman) => (
                                        <tr key={aranzman.id}>
                                            <td>{aranzman.nazivAranzmana}</td>
                                            <td>{new Date(aranzman.datumOd).toLocaleDateString()}</td>
                                            <td>{new Date(aranzman.datumDo).toLocaleDateString()}</td>
                                            <td>{aranzman.cena} &euro;</td>
                                            <td>{aranzman.popust ? `${aranzman.popust}%` : 'Nema popusta'}</td>
                                            <td>{aranzman.kapacitet}</td>
                                            <td>
                                                <button className="btn btn-info dugme" onClick={
                                                    () => {
                                                        setUcitaniAranzman(aranzman);
                                                    }
                                                }><IoCheckboxOutline/> Ucitaj</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">Nema dostupnih aranžmana za izabrano putovanje.</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Col>

                <Col md={3} className="mb-4">
                    <h4>Detalji aranžmana</h4>
                    {
                        ucitaniAranzman ? (
                            <div>
                                <p><strong>Naziv:</strong> {ucitaniAranzman.nazivAranzmana}</p>
                                <p><strong>Datum početka:</strong> {new Date(ucitaniAranzman.datumOd).toLocaleDateString()}</p>
                                <p><strong>Datum završetka:</strong> {new Date(ucitaniAranzman.datumDo).toLocaleDateString()}</p>
                                <p><strong>Cena:</strong> {ucitaniAranzman.cena} &euro;</p>
                                <p><strong>Popust:</strong> {ucitaniAranzman.popust ? `${ucitaniAranzman.popust}%` : 'Nema popusta'}</p>
                                <p><strong>Kapacitet:</strong> {ucitaniAranzman.kapacitet}</p>
                                {
                                    user && user.id && (putovanjaPutnika.length === 0 || !putovanjaPutnika.some(p => p.aranzman.id === ucitaniAranzman.id)) ? (
                                        <>
                                            <Button className="btn-info dugme" onClick={
                                                () => {
                                                    axiosInstance.post(`/putnici`, {
                                                        aranzman_id: ucitaniAranzman.id,
                                                        user_id: user.id
                                                    }).then(res => {
                                                        if (res.data.uspesno === true) {
                                                            setPoruka("Aranžman uspešno rezervisan!");
                                                            setPutovanjaPutnika([...putovanjaPutnika, res.data.podaci]);
                                                        } else {
                                                            setPoruka("Greška prilikom rezervacije aranžmana.");
                                                        }
                                                    }).catch(err => {
                                                        console.error("Došlo je do greške prilikom rezervacije aranžmana:", err);
                                                        setPoruka("Došlo je do greške prilikom rezervacije aranžmana. Pokušajte ponovo kasnije.");
                                                    })
                                                }
                                            }>

                                                <IoCheckmark /> Rezerviši aranžman
                                            </Button>
                                        </>
                                    ) : (
                                        <p className="text-danger">Već ste rezervisali ovaj aranžman ili niste registrovani korisnik.</p>
                                    )
                                }
                            </div>
                        ) : (
                            <p>Izaberite aranžman za prikaz detalja.</p>
                        )
                    }
                </Col>
            </Row>
        </>
    );
};

export default Aranzmani;
