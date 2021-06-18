import React from 'react';
import PropTypes from 'prop-types';

const SVG = ({ source, symbol, ...props }) => (
    <svg {...props}>
        <use xlinkHref={`${source}#${symbol}`} />
    </svg>
);
SVG.propTypes = {
    source: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
};

export default SVG;
