import React, { useState } from 'react';
import Slider from 'react-touch-drag-slider';
import styled, { createGlobalStyle, css } from 'styled-components';

import CardFlip from '../components/quizmaster/CardFlip';
import { useQuery } from '@apollo/client';
import { QUERY_CARD } from '../utils/queries';

// define some basic styles
const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html,body {
    padding: 0;
    margin: 0;
  }
`;
// The slider will fit any size container, lets go full screen...
const AppStyles = styled.main`
	height: 100vh;
	width: 100vw;
`;

const Button = styled.button`
	font-size: 2rem;
	z-index: 10;
	position: fixed;
	top: 50%;
	${(props) =>
		props.right
			? css`
					right: 0.5rem;
			  `
			: css`
					left: 0.5rem;
			  `}
`;

function CardFlipPage({ deckId, cardId }) {
	// Card ID and Deck ID must be passed.
	const { data } = useQuery(QUERY_CARD, {
		// variables: { deckId, cardId },
		variables: {
			deckId: '62a36c836c16eec685783324',
			cardId: '62a36ca36c16eec68578332a',
		}, // for testing
	}); // returns single card
	// Expect data: {
	//   card: {
	//     cards: [{ sideA, sideB, deck }]
	//   }
	// }

	// if (loading) return <div>Loading</div>;
	// if (error) return <div>Error! {`${error.message}`}</div>;
	console.log('data', data);
	const card = data.card.cards;
	console.log('QUERY_CARD:', card);
	const [index, setIndex] = useState(1);

	const setFinishedIndex = (i) => {
		console.log('finished dragging on slide', i);
		setIndex(i);
	};

	const next = () => {
		if (index < card.length - 1) setIndex(index + 1);
	};

	const previous = () => {
		if (index > 0) setIndex(index - 1);
	};

	return (
		<>
			<GlobalStyles />
			<AppStyles>
				<Button onClick={previous} left disabled={index === 0}>
					〈
				</Button>
				<Button onClick={next} right disabled={index === card.length - 1}>
					〉
				</Button>
				<Slider
					onSlideComplete={setFinishedIndex}
					onSlideStart={(i) => {
						console.clear();
						console.log('started dragging on slide', i);
					}}
					activeIndex={index}
					threshHold={100}
					transition={0.5}
					scaleOnDrag={true}>
					{card.map((card, index) => (
						<CardFlip card={card} key={index} />
					))}
				</Slider>
			</AppStyles>
		</>
	);
}

export default CardFlipPage;
