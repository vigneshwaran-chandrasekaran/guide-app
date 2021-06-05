import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from 'store/appSlice';
import styled from 'styled-components';

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
	background-color: #81b216;
	/* border: 1px solid white; */
`;

const ButtonsBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default function FruitBox({ data }) {
	const dispatch = useDispatch();

	const handleRemove = () => {
		dispatch(removeFromCart(data));
	};

	const handleAdd = () => {
		dispatch(addToCart(data));
	};

	return (
		<Card color={data?.colorHex}>
			<p>{data?.name}</p>
			<p>{data?.maxCount - data?.inCart}</p>
			<ButtonsBox>
				<Button onClick={handleRemove}>-</Button>
				<Button onClick={handleAdd}>+</Button>
			</ButtonsBox>
		</Card>
	);
}
