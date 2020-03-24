import React, { Suspense } from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { AuthProvider, AuthRoute, useAuth } from "react-auth"
import "semantic-ui-css/semantic.min.css"

const Jurne = React.lazy(() => import("./jurn(e)/Jurne"))
const Login = React.lazy(() => import("./auth/Login"))
const Register = React.lazy(() => import("./auth/Register"))
const Dashboard = React.lazy(() => import("./jurn(e)/Dashboard"))

export default props => {
  const { profile } = useAuth()

  return (
    <AuthProvider redirectUrl="/Jurne">
      <Router>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <Route exact path="/Jurne" component={Jurne} />
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
