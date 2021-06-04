import styled from 'styled-components';

const StyledButton = styled.button`
	background-color: black;
	font-size: 16px;
	color: white;
	border: 0;
	outline: none;
	&:hover {
		background-color: white;
		color: black;
		border: 1px solid black;
	}
`;

function App() {
	return (
		<div>
			<StyledButton> Styled component </StyledButton>
		</div>
	);
}

export default App;
