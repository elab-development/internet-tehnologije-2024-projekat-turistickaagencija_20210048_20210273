import React, {useEffect} from 'react';
import HeaderNaslov from "../komponente/HeaderNaslov";
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import useFormValues from "../hooks/useFormValues";
import axiosInstance from "../komunikacija/axiosKomunikacija";
import GraphicHistogram from "../komponente/GraphicHistogram";
import {CgTrash} from "react-icons/cg";
import {CSVLink} from "react-csv";
import {FaDownload} from "react-icons/fa";

const Admin = () => {
    const [poruka, setPoruka] = React.useState("");
    const user = JSON.parse(window.sessionStorage.getItem("user"));
    const role = user ? user.role : null;
    const [putovanja, setPutovanja] = React.useState([]);
    const [link, setLink] = React.useState("/paginacija");
    const [uplate, setUplate] = React.useState([]);
    const [dugmiciLinkovi, setDugmiciLinkovi] = React.useState([]);
    const [aranzmani, setAranzmani] = React.useState([]);
    const [ucitaniAranzmanId, setUcitaniAranzmanId] = React.useState(0);
    const [putniciPoAranzmanu, setPutniciPoAranzmanu] = React.useState([]);
    const [dataForDownload, setDataForDownload] = React.useState([]);

    console.log(role);

    useEffect(() => {
        axiosInstance.get('/putovanja').then(res => {
            if (res.data.uspesno === true) {
                setPutovanja(res.data.podaci);
            } else {
                console.error("Greška prilikom dohvaćanja putovanja:", res.statusText);
            }
        }).catch(
            err => {
                console.error("Došlo je do greške prilikom dohvaćanja putovanja:", err);
            }
        )
    }, []);


    const {formData, handleInputChange} = useFormValues({
        putovanje_id: 1,
        nazivAranzmana: "",
        datumOd: "",
        datumDo: "",
        cena: "",
        popust: "",
        kapacitet: "",
        nazivPutovanja : "",
        opis: "",
        lokacija: ""
    });

    const unesiAranzman = (e) => {
        e.preventDefault();

        const datumOdFormated = new Date(formData.datumOd).toISOString().split('T')[0];
        const datumDoFormated = new Date(formData.datumDo).toISOString().split('T')[0];

        const data = {
            putovanje_id: formData.putovanje_id,
            nazivAranzmana: formData.nazivAranzmana,
            datumOd: datumOdFormated,
            datumDo: datumDoFormated,
            cena: parseFloat(formData.cena).toFixed(2),
            popust: parseFloat(formData.popust).toFixed(2) || 0.00,
            kapacitet: formData.kapacitet
        }

        axiosInstance.post('/aranzmani', data).then(res => {
            if (res.data.uspesno === true) {
                setPoruka("Aranžman uspešno unet!");
            } else {
                setPoruka("Greška prilikom unosa aranžmana. Pokušajte ponovo.");
            }
        }).catch(err => {
            console.error("Došlo je do greške prilikom unosa aranžmana:", err);
            setPoruka("Došlo je do greške prilikom unosa aranžmana. Pokušajte ponovo kasnije.");
        })
    }

    const unesiPutovanje = (e) => {
        e.preventDefault();

        const data = {
            nazivPutovanja: formData.nazivPutovanja,
            opis: formData.opis,
            lokacija: formData.lokacija
        }

        axiosInstance.post('/putovanja', data).then(res => {
            if (res.data.uspesno === true) {
                setPoruka("Putovanje uspešno uneto!");
                setPutovanja([...putovanja, res.data.podaci]);
            } else {
                setPoruka("Greška prilikom unosa putovanja. Pokušajte ponovo.");
            }
        }).catch(err => {
            console.error("Došlo je do greške prilikom unosa putovanja:", err);
            setPoruka("Došlo je do greške prilikom unosa putovanja. Pokušajte ponovo kasnije.");
        })
    }


    useEffect(() => {
        axiosInstance.get(link).then(res => {
            if (res.data.uspesno === true) {
                setUplate(res.data.podaci.data);
                setDugmiciLinkovi(res.data.podaci.links);
            } else {
                console.error("Greška prilikom nalazenja uplata:", res.statusText);
            }
        }).catch(err => {
            console.error("Došlo je do greške prilikom nalazenja uplata:", err);
            setPoruka("Došlo je do greške prilikom nalazenja uplata. Pokušajte ponovo kasnije.");
        })
    }, [link]);

    const obrisi = (id) => {
        axiosInstance.delete(`/uplate/${id}`).then(res => {
            if (res.data.uspesno === true) {
                setPoruka("Uplata uspešno obrisana!");
                setUplate(uplate.filter(uplata => uplata.id !== id));
            } else {
                setPoruka("Greška prilikom brisanja uplate. Pokušajte ponovo.");
            }
        }).catch(err => {
            console.error("Došlo je do greške prilikom brisanja uplate:", err);
            setPoruka("Došlo je do greške prilikom brisanja uplate. Pokušajte ponovo kasnije.");
        });
    }

    useEffect(() => {
        axiosInstance.get('/aranzmani').then(res => {
            if (res.data.uspesno === true) {
                setAranzmani(res.data.podaci);
            } else {
                console.error("Greška prilikom dohvaćanja aranžmana:", res.statusText);
            }
        }).catch(
            err => {
                console.error("Došlo je do greške prilikom dohvaćanja aranžmana:", err);
                setPoruka("Došlo je do greške prilikom dohvaćanja aranžmana. Pokušajte ponovo kasnije.");
            }
        )
    }, []);

    useEffect(() => {
        if (ucitaniAranzmanId > 0) {
            axiosInstance.get(`/aranzmani/${ucitaniAranzmanId}/putnici`).then(res => {
                if (res.data.uspesno === true) {
                    let podaci = res.data.podaci;
                    setPutniciPoAranzmanu(podaci);
                    let csvPodaci = [];

                    for (let i = 0; i < podaci.length; i++) {
                            csvPodaci.push({
                                imeIPrezime: podaci[i].user.name,
                                email: podaci[i].user.email,
                                nazivAranzmana: podaci[i].aranzman.nazivAranzmana,
                                datumOd: new Date(podaci[i].aranzman.datumOd).toLocaleDateString(),
                                datumDo: new Date(podaci[i].aranzman.datumDo).toLocaleDateString(),
                                ukupnaCenaAranzmana: podaci[i].ukupnaCenaAranzmana
                            });
                    }

                    setDataForDownload(csvPodaci);
                } else {
                    console.error("Greška prilikom dohvaćanja putnika po aranžmanu:", res.statusText);
                }
            }).catch(err => {
                console.error("Došlo je do greške prilikom dohvaćanja putnika po aranžmanu:", err);
                setPoruka("Došlo je do greške prilikom dohvaćanja putnika po aranžmanu. Pokušajte ponovo kasnije.");
            });
        } else {
            setPutniciPoAranzmanu([]);
        }
    }, [ucitaniAranzmanId]);

    return (
        <div>
            <HeaderNaslov naslov="Admin strane" podnaslov={poruka} />
            {
                ['admin', 'agent', 'finansijski_admin', 'vodja_puta'].includes(role) && (
                    <>
                        <Form.Group className="mb-3" controlId="formBasicAranzmani">
                            <Form.Label column={"lg"}>Aranzmani</Form.Label>
                            <Form.Select name="ucitaniAranzman" onChange={
                                (e) => {
                                    setUcitaniAranzmanId(
                                        e.target.value !== "0" ? parseInt(e.target.value) : 0
                                    )
                                }
                            } size="lg">
                                <option value="0">Izaberite aranžman</option>
                                {
                                    aranzmani.length > 0 ? (
                                        aranzmani.map((aranzman, index) => (
                                            <option key={index} value={aranzman.id}>
                                                {aranzman.nazivAranzmana} ({aranzman.datumOd} - {aranzman.datumDo})
                                            </option>
                                        ))
                                    ) : (
                                        <option value="0">Nema dostupnih aranžmana</option>
                                    )
                                }
                            </Form.Select>
                        </Form.Group>
                        <hr/>
                        {
                            putniciPoAranzmanu.length > 0 ? (
                                <>
                                    <Table hover>
                                        <thead>
                                            <tr>
                                                <th>Ime i prezime</th>
                                                <th>Email</th>
                                                <th>Naziv Aranzmana</th>
                                                <th>Datum Od</th>
                                                <th>Datum Do</th>
                                                <th>Ukupna cena aranzmana</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            putniciPoAranzmanu.map((putnik, index) => (
                                                <tr key={index}>
                                                    <td>{putnik.user.name}</td>
                                                    <td>{putnik.user.email}</td>
                                                    <td>{putnik.aranzman.nazivAranzmana}</td>
                                                    <td>{new Date(putnik.aranzman.datumOd).toLocaleDateString()}</td>
                                                    <td>{new Date(putnik.aranzman.datumDo).toLocaleDateString()}</td>
                                                    <td>{putnik.ukupnaCenaAranzmana} &euro;</td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </Table>
                                    <CSVLink
                                        data={dataForDownload}
                                        filename={"putnici.csv"}
                                        className="btn dugme mb-3"
                                        target="_blank"
                                    >
                                        <FaDownload/> Preuzmi putnike za aranzman
                                    </CSVLink>
                                </>
                            ) : (
                                <>
                                    <p>Nema uplate za ovaj aranzman</p>
                                </>
                            )
                        }
                    </>
                )
            }
            <Row>
                <Col md={12} className="mb-3">
                    <GraphicHistogram />
                </Col>
            </Row>
            {
                ['admin', 'agent'].includes(role) && (
                    <>
                        <Row>
                            <Col md={6} className="mb-3">
                                <h1 className="text-center naslov">Unos Aranzmana</h1>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicPutovanje">
                                        <Form.Label column={"lg"}>Putovanje</Form.Label>
                                        <Form.Select name="putovanje_id" onChange={handleInputChange} size="lg">
                                            {
                                                putovanja.length > 0 ? (
                                                    putovanja.map((putovanje, index) => (
                                                        <option key={index} value={putovanje.id}>
                                                            {putovanje.nazivPutovanja} ({putovanje.lokacija})
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option value="">Nema dostupnih putovanja</option>
                                                )
                                            }
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicNazivAranzmana">
                                        <Form.Label column={"lg"}>Naziv Aranzmana</Form.Label>
                                        <Form.Control name="nazivAranzmana" onChange={handleInputChange} type="text" placeholder="Unesi naziv aranžmana" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicDatumOd">
                                        <Form.Label column={"lg"}>Datum Od</Form.Label>
                                        <Form.Control name="datumOd" onChange={handleInputChange} type="date" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicDatumDo">
                                        <Form.Label column={"lg"}>Datum Do</Form.Label>
                                        <Form.Control name="datumDo" onChange={handleInputChange} type="date" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicCena">
                                        <Form.Label column={"lg"}>Cena</Form.Label>
                                        <Form.Control name="cena" onChange={handleInputChange} type="number" placeholder="Unesi cenu aranžmana" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPopust">
                                        <Form.Label column={"lg"}>Popust (%)</Form.Label>
                                        <Form.Control name="popust" onChange={handleInputChange} type="number" placeholder="Unesi popust ako postoji" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicKapacitet">
                                        <Form.Label column={"lg"}>Kapacitet</Form.Label>
                                        <Form.Control name="kapacitet" onChange={handleInputChange} type="number" placeholder="Unesi kapacitet aranžmana" />
                                    </Form.Group>
                                    <hr/>
                                    <Button className="btn dugme" type="submit" onClick={unesiAranzman}>
                                        Unesi Aranzman
                                    </Button>

                                </Form>
                            </Col>

                            <Col md={6} className="mb-3">
                                <h1 className="text-center naslov">Unos Putovanja</h1>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicNazivPutovanja">
                                        <Form.Label column={"lg"}>Naziv Putovanja</Form.Label>
                                        <Form.Control name="nazivPutovanja" onChange={handleInputChange} type="text" placeholder="Unesi naziv putovanja" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicOpis">
                                        <Form.Label column={"lg"}>Opis</Form.Label>
                                        <Form.Control name="opis" onChange={handleInputChange} as="textarea" rows={3} placeholder="Unesi opis putovanja" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicLokacija">
                                        <Form.Label column={"lg"}>Lokacija</Form.Label>
                                        <Form.Control name="lokacija" onChange={handleInputChange} type="text" placeholder="Unesi lokaciju putovanja" />
                                    </Form.Group>

                                    <Button className="btn dugme" type="submit" onClick={unesiPutovanje}>
                                        Unesi Putovanje
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </>
                )
            }

            {
                ['admin', 'finansijski_admin'].includes(role) && (
                    <>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>Naziv Aranzmana</th>
                                    <th>Korisnik</th>
                                    <th>Datum Uplate</th>
                                    <th>Iznos Uplate</th>
                                    <th>Akcije</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                uplate.length > 0 ? (
                                    uplate.map((uplata, index) => (
                                        <tr key={index}>
                                            <td>{uplata.nazivAranzmana}</td>
                                            <td>{uplata.korisnik}</td>
                                            <td>{new Date(uplata.datumUplate).toLocaleDateString()}</td>
                                            <td>{uplata.iznos} &euro;</td>
                                            <td>
                                                <Button className="btn btn-danger" onClick={() => obrisi(uplata.id)}>
                                                    <CgTrash />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">Nema uplata</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                        <div className="d-flex justify-content-center">
                            {
                                dugmiciLinkovi.map((link, index) => (
                                    <Button
                                        key={index}
                                        className={`btn m-1 dugme ${link.active ? 'active' : ''}`}
                                        onClick={() => setLink(link.url)}
                                        disabled={!link.url}
                                    >
                                        {
                                            link.label === '&laquo; Previous' ? 'Prethodna' :
                                            link.label === 'Next &raquo;' ? 'Sledeća' :
                                            link.label
                                        }
                                    </Button>
                                ))
                            }
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default Admin;
