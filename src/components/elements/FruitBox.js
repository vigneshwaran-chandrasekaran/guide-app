import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from 'store/appSlice';
import styled, { css } from 'styled-components';

const Card = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	font-size: 1em;
	margin: 0.2em 1em;
	padding: 1em;
	border-radius: 3px;
	color: white;
	min-width: 200px;
	min-height: 250px;
	background-color: ${(props) => props.color};
`;

const Button = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 3em;
	margin: 0.1em;
	width: 50px;
	height: 50px;
	border-radius: 25px;
	color: white;
	border: 0;
	line-height: 50px;
	cursor: pointer;
	${(props) =>
		props.disabled
			? css`
					background-color: red;
			  `
			: css`
					background-color: #81b216;
			  `};
`;

const ButtonsBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default function FruitBox({ data }) {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state?.app?.cart) || [];
	const fruitCount =
		cart?.filter((item) => item?.name === data?.name)?.length ?? 0;

	const handleRemove = () => {
		dispatch(removeFromCart(data));
	};

	const handleAdd = () => {
		dispatch(addToCart(data));
	};

	return (
		<Card color={data?.colorHex}>
			<p>{data?.name}</p>
			<p>{Number(data?.maxCount) - Number(fruitCount)}</p>
			<ButtonsBox>
				<Button onClick={handleRemove}>-</Button>
				<Button
					onClick={handleAdd}
					disabled={fruitCount === data?.maxCount}
				>
					+
				</Button>
			</ButtonsBox>
		</Card>
	);
}

FruitBox.propTypes = {
	data: PropTypes.shape({
		name: PropTypes.string,
		title: PropTypes.string,
		colorHex: PropTypes.string,
		maxCount: PropTypes.string,
	}),
};
