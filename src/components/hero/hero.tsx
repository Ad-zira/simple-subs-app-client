import React from 'react'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'

import Example from '../Modal/Modal'

const HeroYea = styled.header`
	padding: 5rem 0;
	height: 100%;
	background-image: url('https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80');
	background-size: cover;
	background-position: center;
`

const HeaderContainer = styled.div`
background-color: rgb(5, 148, 112);
padding: 3rem;
color: white;
width: 32.5rem;
`

const Heading = styled.h1`
	font-size: 5rem;
`

const SubHeading = styled.h3`
	margin: 1rem;
	font-weight: 400; 
`

export default function Hero() {
	return (
		<HeroYea>
			<Container>
				<HeaderContainer>
					<Heading>Feed Your Mind with the best</Heading>
					<SubHeading> Just a sub heading , you needt to grow, learn, and become more successful by reading some of the top article by highly reputable individuals.</SubHeading>
					<Example text="Signup" variant="primary"/>
					<Example text="Login" variant="info" />
				</HeaderContainer>
			</Container>
		</HeroYea>
	)
}
