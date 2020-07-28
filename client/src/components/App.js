import React, { Suspense } from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { AuthProvider, AuthRoute } from "react-auth"
import "semantic-ui-css/semantic.min.css"

const FrontPage = React.lazy(() => import("./FrontPage"))
const Login = React.lazy(() => import("./auth/Login"))
const Register = React.lazy(() => import("./auth/Register"))
const Dashboard = React.lazy(() => import("./dashboard/Dashboard"))

export default (props) => {
	return (
		<AuthProvider redirectUrl="/Jurne">
			<Router>
				<div className="app">
					<Suspense fallback={<div>Loading...</div>}>
						<Route exact path="/Jurne" component={FrontPage} />
						<Route path="/login" component={Login} />
						<Route path="/register" component={Register} />
						<Route exact path="/" render={() => <Redirect to="/Jurne" />} />
						<AuthRoute path="/Jurne/:page" component={Dashboard} />
					</Suspense>
				</div>
			</Router>
		</AuthProvider>
	)
}
