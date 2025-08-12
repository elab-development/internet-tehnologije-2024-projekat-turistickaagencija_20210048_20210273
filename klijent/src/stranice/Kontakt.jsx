import React from 'react';
import HeaderNaslov from "../komponente/HeaderNaslov";
import {Col, Row} from "react-bootstrap";
import {IoMailOutline, IoMapOutline, IoPhonePortraitOutline} from "react-icons/io5";

const Kontakt = () => {
    return (
        <>
            <HeaderNaslov naslov="Kontakt" podnaslov="Kontaktirajte nas za više informacija" />
            <Row>
                <Col md={6}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2855.7269542151585!2d20.353003076001265!3d43.90884803585895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47576df75b40457f%3A0x371f0b5fa6363380!2zVWxpY2EgMjIyLCDEjGHEjWFr!5e1!3m2!1sen!2srs!4v1755020560228!5m2!1sen!2srs"
                        style={
                            {border:0}
                        } width="600px" height="450px"
                         allowFullScreen="" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </Col>

                <Col md={6} className="text-center text-md-start" style={{
                    marginTop: '100px',
                    fontSize: '1.2rem',
                    lineHeight: '1.5',
                    
                }}>
                    <ul>
                        <li>
                            <IoMailOutline /> travel-agency@gmail.com
                        </li>
                        <li>
                            <IoPhonePortraitOutline/> 065 323 3233
                        </li>
                        <li>
                            <IoMapOutline /> Ulica 222, Cacak, Srbija
                        </li>
                    </ul>
                </Col>
            </Row>
        </>
    );
};

export default Kontakt;
