import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import two from '../slike/galerija/2.jpg';
import three from '../slike/galerija/3.jpg';
import four from '../slike/galerija/4.jpg';
import five from '../slike/galerija/5.jpg';
import six from '../slike/galerija/6.jpg';
import seven from '../slike/galerija/7.jpg';
import eight from '../slike/galerija/8.jpg';

import {Image} from "react-bootstrap";

const Pocetna = () => {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <>
            <Slider {...settings} className="slider">
                <div>
                    <Image src={two} alt="2"/>
                </div>
                <div>
                    <Image src={three} alt="3"/>
                </div>
                <div>
                    <Image src={four} alt="4"/>
                </div>
                <div>
                    <Image src={five} alt="5"/>
                </div>
                <div>
                    <Image src={six} alt="6"/>
                </div>
                <div>
                    <Image src={seven} alt="7"/>
                </div>
                <div>
                    <Image src={eight} alt="8"/>
                </div>
            </Slider>
        </>
    );
};

export default Pocetna;
