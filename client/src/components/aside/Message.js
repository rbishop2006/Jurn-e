import React, { useEffect } from "react"
import { useMessages } from "../../hooks"
import moment from "moment"
// import moment from "moment-timezone"
import "../../styles/aside/messages.scss"

export default (props) => {
	const { messages, getMessages } = useMessages()

	useEffect(() => {
		const checkMessages = setInterval(() => {
			getMessages()
		}, 5000)
		return () => clearInterval(checkMessages)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<section className="messageArea">
			{messages.map((msg, i) => (
				<div key={"message" + i}>
					<div>
						<p className="jurnName">
							To:
							<strong>{msg.jname}</strong>
							<span className="from">From: </span>{" "}
							<span>
								<em className="msgName">{msg.fname} </em>
							</span>
						</p>
					</div>
					<span className="message">{msg.message} </span>
					<span className="timeStamp">{moment(msg.timestamp).fromNow()}</span>
				</div>
			))}
			<div />
		</section>
	)
}
