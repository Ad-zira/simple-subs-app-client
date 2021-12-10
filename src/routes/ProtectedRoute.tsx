import { useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"
import { UserContext } from "../context"

export const ProtectedRoute = () => {
	const [state] = useContext(UserContext)

	if (state.loading) return <div style={{backgroundColor: 'darkslateblue', fontSize: "3rem", fontWeight: 800, display: 'flex', textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>Spinner...</div>

	return state.data ? <Outlet/> : <Navigate to="/" />
}