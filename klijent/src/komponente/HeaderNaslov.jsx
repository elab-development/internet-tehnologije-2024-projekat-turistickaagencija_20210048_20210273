import React from 'react';
import PropTypes from 'prop-types';

const HeaderNaslov = props => {

    const { naslov, podnaslov } = props;

    return (
        <>
            <div className="header-naslov">
                <h1 className="naslov">{naslov}</h1>
                {podnaslov && <p className="text-muted">{podnaslov}</p>}
            </div>
        </>
    );
};

HeaderNaslov.propTypes = {
    naslov: PropTypes.string.isRequired,
    podnaslov: PropTypes.string,
};

export default HeaderNaslov;
