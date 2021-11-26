import PropTypes from 'prop-types';
import React from 'react';
export default function School({ name }) {
	return <div>{name}</div>;
}

School.propTypes = {
	name: PropTypes.string,
};
