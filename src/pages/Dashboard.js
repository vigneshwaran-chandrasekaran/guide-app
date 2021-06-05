import { CartBox, FruitBox } from 'components/elements';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Cards = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Title = styled.h1`
	text-align: center;
	font-size: 01.5rem;
	font-weight: bold;
`;

const Section = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`;

function Dashboard() {
	const allFruits = useSelector((state) => state?.app?.allFruits) || [];
	console.log('allFruits', allFruits);

	return (
		<>
			<Title>Welcome to Fruit Shop</Title>
			<Section>
				<Cards>
					{allFruits.map((item) => (
						<FruitBox key={item?.id} data={item} />
					))}
				</Cards>
				<CartBox />
			</Section>
		</>
	);
}

Dashboard.propTypes = {};

export default Dashboard;
