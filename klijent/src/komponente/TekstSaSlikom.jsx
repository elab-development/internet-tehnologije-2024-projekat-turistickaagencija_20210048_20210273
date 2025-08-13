import React from 'react';
import PropTypes from 'prop-types';

const TekstSaSlikom = props => {

    const { ime, tekst, slika } = props;

    return (
        <>
            <div className="text-center">
                <img src={slika} alt={ime} className="img-fluid rounded-circle mb-3" style={{width: '300px', height: '400px'}} />
                <h5>{ime}</h5>
                <p className='onama-tekst'>{tekst}</p>
            </div>
        </>
    );
};

TekstSaSlikom.propTypes = {
    ime: PropTypes.string.isRequired,
    tekst: PropTypes.string.isRequired,
    slika: PropTypes.string.isRequired,
};

export default TekstSaSlikom;
