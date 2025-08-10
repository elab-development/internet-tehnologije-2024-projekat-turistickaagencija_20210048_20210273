import React from 'react';
import {Col, Row} from "react-bootstrap";
import {IoMailOutline, IoMapOutline, IoPhonePortraitOutline} from "react-icons/io5";
import {IoLogoFacebook, IoLogoInstagram, IoLogoYoutube} from "react-icons/io";

const Footer = () => {
    return (
        <>
            <div className="footer">
                <Row>
                    <Col md={6} className="text-center text-md-start">
                        <ul>
                            <li>
                                <IoMailOutline /> vivirlavida@gmail.com
                            </li>
                            <li>
                                <IoPhonePortraitOutline/> 065 323 3233
                            </li>
                            <li>
                                <IoMapOutline /> Ulica Putovanja 123, Beograd, Srbija
                            </li>
                        </ul>
                    </Col>

                    <Col md={6} className="text-center social-icons">
                        <ul>
                            <li>
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                    <IoLogoFacebook />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                    <IoLogoInstagram />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                                    <IoLogoYoutube />
                                </a>
                            </li>
                        </ul>
                    </Col>

                </Row>
            </div>
        </>
    );
};

export default Footer;
