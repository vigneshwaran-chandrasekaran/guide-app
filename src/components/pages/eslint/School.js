import PropTypes from 'prop-types';
import React from 'react';
export default function School({ name }) {
	return (
		<div>
			<div>{name}</div>
			<p>
				<span>sdsd</span>
				<span>sdsd</span>
				<span>
					<button type="button">sdsd</button>
				</span>
			</p>
		</div>
	);
}

School.propTypes = {
	name: PropTypes.string,
};
