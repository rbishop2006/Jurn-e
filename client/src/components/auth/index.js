import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Image, Segment, Menu } from "semantic-ui-react"
import "../../styles/LoginRegister.scss"
import Login from "./login"
import Register from "./register"

export default () => {
	const location = useLocation()
	const [tab, setTab] = useState(location.pathname.substr(1))

	return (
		<Segment textAlign={"center"} padded basic className={"mw-var m-auto"}>
			<Image as={Link} to={"/"} src={"/JurnEase-logo.png"} alt={"Jurn(ease)"} />
			{/* {location.pathname === "/login" ? <Login /> : <Register />} */}

			<Menu tabular widths={2}>
				{["Login", "Register"].map((menuItem, key) => {
					return (
						<Menu.Item
							key={key}
							name={menuItem}
							active={tab === menuItem}
							onClick={(event, { name }) => {
								if (name === tab) return
								setTab(name)
								// createUrlParameters({ tab: name })
							}}
						/>
					)
				})}
			</Menu>
			{tab === "Login" && <Login />}
			{tab === "Register" && <Register />}
		</Segment>
	)
}
