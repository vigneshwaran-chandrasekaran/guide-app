import { Button, Col, Row } from 'antd';
import { SubmitButton } from 'formik-antd';
import PropTypes from 'prop-types';
import React from 'react';

function FormActionButtons({
	isSubmitting,
	isValid = true,
	resetForm = null,
	showCancel = true,
	buttonAlignment = 'center',
	saveText = 'Save',
	cancelText = 'Cancel',
}) {
	return (
		<Row
			data-testid="FormActionButtons"
			type="flex"
			justify="space-between"
		>
			<Col
				span={24}
				style={{
					textAlign: buttonAlignment,
					paddingTop: '25px',
				}}
			>
				{showCancel && (
					<Button
						className="custom-btn"
						onClick={resetForm}
						style={{
							marginRight: 20,
						}}
					>
						{cancelText}
					</Button>
				)}

				<SubmitButton
					type="primary"
					disabled={isSubmitting || !isValid}
					className="custom-btn"
				>
					{saveText}
				</SubmitButton>
			</Col>
		</Row>
	);
}

FormActionButtons.propTypes = {
	isSubmitting: PropTypes.bool.isRequired,
	isValid: PropTypes.bool,
	showCancel: PropTypes.bool,
	buttonAlignment: PropTypes.string,
	saveText: PropTypes.string,
	cancelText: PropTypes.string,
	resetForm: PropTypes.func,
};

export { FormActionButtons };
