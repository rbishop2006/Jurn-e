import React, { Suspense } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { AuthProvider, AuthRoute } from "react-auth"
import "semantic-ui-css/semantic.min.css"
import "../styles/base.scss"

const FrontPage = React.lazy(() => import("./front-page"))
const Login = React.lazy(() => import("./auth/login"))
const Register = React.lazy(() => import("./auth/register"))
const Dashboard = React.lazy(() => import("./dashboard/Dashboard"))

export default (props) => {
	return (
		<AuthProvider redirectUrl="/">
			<Router>
				<Suspense fallback={<div>Loading...</div>}>
					<Route exact path="/" component={FrontPage} />
					<Route path="/Login" component={Login} />
					<Route path="/Register" component={Register} />
					<AuthRoute path="/Dashboard/:page" component={Dashboard} />
				</Suspense>
			</Router>
		</AuthProvider>
	)
}
