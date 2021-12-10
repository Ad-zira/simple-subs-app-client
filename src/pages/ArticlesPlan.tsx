import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styled from 'styled-components';
import { Card, Button } from "react-bootstrap";

const CardsContainer = styled.div`
	display: flex;
	height: 75vh;
	max-width: 100%;
	align-items: center;
	justify-content: space-evenly;
	padding: 0 7rem;
	border-radius: .5rem;
`
const GradientH3 = styled.h3`
	text-align: center;
	font-weight: 800;
	background: -webkit-linear-gradient(58deg, #fa5e92, #c0195d);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
`
const CardHeader = styled.div`
	height: 30rem;
	background-color: #5198c2;
	display: flex;
	align-items: center;
	justify-content: center;
	border-bottom-left-radius: .5rem;
	border-bottom-right-radius: .5rem;
`
const PriceCircle = styled.div`
	border: 0.5rem solid white;
	width: 6.5rem;
	height: 6.5rem;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0.1rem 0.1rem 1rem rgba(19,20,19, 0.342)
`

const ArticlesPlan = () => {
	const [prices, setPrices ] = useState<any[]>([]);
	
	useEffect(() => {
		fetchPrices()
	}, [])

	const fetchPrices = async() => {
		const {data: response} = await axios.get('http://localhost:8080/subs/prices')
		setPrices(response.data)
		console.log(response.data)
	}

	const createSession = async (priceId: string) => {
		const { data: response } = await axios.post('http://localhost:8080/subs/session',
		{
			priceId,
		})

		window.location.href = response.url;
		// https://checkout.stripe.com/pay/cs_test_a1eF1b0v02AO2P3ixaXxpEqPsTHuTXuaCfZVMjDT9bq45rHVApreD6RMgH#fidkdWxOYHwnPyd1blpxYHZxWjA0TjdTdE1MYDNJU3xcd2BRYzIwVUB9TzBES01jYXFoc1JsXTRvajd1Y0YwV2pjT2lGZlNsUW1WcGdoM2JpNH81cXdBUVxKT31KaU82ZmpJQmxNf0EwZF9iNTU8Zk03Yk89UScpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl
	}

	const backgroundColors:any = {
		// Basic: 'rgb(104, 219, 104)',
		Basic: 'lawngreen',
		// Standard: 'rgb(185, 42, 23, 0.83)',
		Standard: 'lightcoral',
		Premium: 'goldenrod'
	}
	
	return (
		<div>
			<Container>
				<GradientH3 className="gradient-text">
					We Provide The Best Prices For You
				</GradientH3>
				<h5 style={{textAlign: 'center', marginTop: '2rem', fontWeight: 'bold'}}>Plan:</h5>
				<CardsContainer>
					{prices.map((price: any) => {
						return (
							<div key={price.id} style={{textAlign: 'center'}}>
							{/* <div style={{textAlign: 'center'}}> */}
								<p style={{fontWeight: 'bold'}}>Plan:</p>
								<Card style={{
									display: 'flex', 
									width: "6.5rem", 
									fontSize: "1.1rem",
									height: "3rem", 
									background: '-webkit-linear-gradient(90deg, azure, wheat)',
									fontWeight: 'bolder', 
									alignItems: 'center'
								}}>
									{price.nickname}
									<CardHeader style={{backgroundColor: backgroundColors[price.nickname]}}>
										<PriceCircle>
											${price.unit_amount/100}
										</PriceCircle>
									</CardHeader>
									<Card.Body>
										<Card.Title style={{fontSize: '1rem', fontWeight: 'bold'}}>
											{price.recurring.interval_count} {price.recurring.interval_count > 1 ? 'months' : 'month' } 
										</Card.Title>
										<Button 
											className="mt-2" 
											style={{width: '6.5rem'}} 
											variant="success"
											onClick={() => createSession(price.id)}
										>Buy now</Button>
									</Card.Body>
								</Card>
							</div>
						)
					})}
				</CardsContainer>
			</Container>
		</div>
	)
}

export default ArticlesPlan; 