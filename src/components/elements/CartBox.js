import React from 'react';
import { useSelector } from 'react-redux';
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
	/* min-height: 250px; */
	background-color: ${(props) => props.color};
`;

export default function CartBox() {
	const cart = useSelector((state) => state?.app?.cart) || [];
	console.log('cart', cart);

	return (
		<div>
			<h3>Cart</h3>
			{cart?.length === 0 && <p>Your cart is empty</p>}
			{cart?.map((item, index) => (
				<Card key={index} color={item?.colorHex}>
					<div>{item?.name}</div>
				</Card>
			))}
		</div>
	);
}
