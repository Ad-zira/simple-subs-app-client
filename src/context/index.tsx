// Handling state globally from the /me route
import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export interface User {
	data: {
		id: string
		email: string 
		stripeCustomerId: string
	} | null;
	error: string | null;// however if we get any data, we will have no errors so we don't wanna put any string as an error, so we can put null value to the error
	loading: boolean ;// context is going to make a request, and take some period of time
}

const UserContext = createContext<
	[User, React.Dispatch<React.SetStateAction<User>>] // The most difficult concept to understand: why use nested tag bracket :(
>([{data: null, loading: true, error: null}, ()=>{}])

const UserProvider = ({children}: any) => {
	const [ user, setUser ] = useState<User>({ 
				// second most difficult: (nested) initial state of Provider
		data: null,
		loading: true,
		error: null
	}) // useState, type of <User>, with the initial value of {data, loading, error}

	/* Fetch from /me query, ensure our token is inside first! */
	const token = localStorage.getItem("token") // add this token into every single request by having just one default configuration
	if (token) {
		axios.defaults.headers.common["authorization"] = `Bearer ${token}` // the most important of axios
	}

	const fetchUser = async() => {
		const {data: response} = await axios.get('http://localhost:8080/auth/me')

		if(response.data && response.data.user) {
			setUser({
				data: {
					id: response.data.user.id,
					email: response.data.user.email,
					stripeCustomerId: response.data.user.stripeCustomerId
				},
				loading: false,
				error: null
			})
		} else if (response.data && response.data.errors.length) {
			setUser({
				data: null,
				loading: false,
				error: response.errors[0].msg
			})
		}
		console.log(response)
	}

	useEffect(() => {
		if (token) {
			fetchUser();
		} else {
			setUser({
				data: null, 
				loading: false,
				error: null
			})
		}
	}, [token])

	return (
		<UserContext.Provider value={[user, setUser]}>
			{children}
		</UserContext.Provider>
	)

}

export { UserProvider, UserContext }; 