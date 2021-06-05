import { Col, Row } from 'antd';
import { Formik } from 'formik';
import { Form, Input } from 'formik-antd';
import { FormActionButtons } from 'forms';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userLogin } from 'store/userSlice';
import * as Yup from 'yup';

const FormSchema = Yup.object({
	name: Yup.string().required().label('Name'),
	password: Yup.string().required().label('Password'),
});

let initialValues = {
	name: undefined,
	password: undefined,
};

if (process.env.NODE_ENV === 'development') {
	/**
	 * On development set login form details prefilled with data
	 */
	initialValues = {
		name: 'Admin',
		password: 'Admin',
	};
}

function LoginForm() {
	const dispatch = useDispatch();
	const history = useHistory();

	function handleSubmit(values, { setErrors, resetForm, setSubmitting }) {
		/**
		 * below two keys no needed for post call
		 */
		dispatch(userLogin(values, setErrors))
			.then(() => {
				resetForm();
				history.push('/dashboard');
			})
			.catch((e) => {
				setSubmitting(false);
				console.log('Login form catch', e);
			})
			.finally(() => {
				setSubmitting(false);
			});
	}

	return (
		<Formik
			enableReinitialize
			initialValues={initialValues}
			validationSchema={FormSchema}
			onSubmit={handleSubmit}
		>
			{({ isSubmitting, resetForm }) => (
				<Form layout="vertical" hideRequiredMark>
					<div
						style={{
							maxHeight: '350px',
							overflowY: 'auto',
							overflowX: 'hidden',
							padding: '10px',
						}}
					>
						<Row gutter={8} justify="space-between">
							<Col span={24}>
								<Form.Item
									name="name"
									hasFeedback={false}
									showValidateSuccess={false}
								>
									<Input name="name" placeholder="Name" />
								</Form.Item>
							</Col>
						</Row>

						<Row
							gutter={8}
							justify="space-between"
							className="mt-30"
						>
							<Col span={24}>
								<Form.Item
									name="password"
									hasFeedback={false}
									showValidateSuccess={false}
								>
									<Input.Password
										name="password"
										placeholder="Password"
									/>
								</Form.Item>
							</Col>
						</Row>
					</div>
					<FormActionButtons
						resetForm={resetForm}
						isSubmitting={isSubmitting}
						showDebug={false}
						saveText="Login"
						cancelText="Reset"
					/>
				</Form>
			)}
		</Formik>
	);
}

export default LoginForm;
