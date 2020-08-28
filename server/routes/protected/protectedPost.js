const router = require("express").Router()
const conn = require("../../db")
const { cloudinary } = require("../../utils/cloudinary.js")

router.post("/invite", (req, res, next) => {
	const fname = req.body.firstName
	const lname = req.body.lastName
	const jurn_id = req.body.jurn_id

	const sqlUser_id = `SELECT user.user_id
  FROM user
  WHERE fname = ? AND lname = ?`
	conn.query(
		sqlUser_id,
		[fname, lname],
		(errUser_id, resultsUser_id, fieldsUser_id) => {
			console.log()
			if (resultsUser_id.length > 0) {
				const user_id = resultsUser_id[0].user_id

				const sqlCheckInv = `SELECT * 
        FROM invite
        WHERE jurn_id = ? AND user_id = ?`

				conn.query(
					sqlCheckInv,
					[jurn_id, user_id],
					(errCheckInv, resultsCheckInv, fieldsCheckInv) => {
						if (resultsCheckInv.length > 0) {
							if (resultsCheckInv[0].inv_status === "accepted") {
								res.json({
									message: "status already accepted",
								})
							} else {
								const sqlUpdInv = `
              UPDATE invite
              SET inv_status = "pending" 
              WHERE invite.jurn_id = ? AND invite.user_id = ?`
								conn.query(
									sqlUpdInv,
									[jurn_id, user_id],
									(errUpdInv, resultsUpdInv, fieldsUpdInv) => {
										res.json({
											message: "status updated to pending",
										})
									}
								)
							}
						} else {
							const sqlInvite = `INSERT INTO invite
            (jurn_id, user_id, inv_status)
            VALUES
            (?, ?, "pending")`
							conn.query(
								sqlInvite,
								[jurn_id, user_id],
								(errInvite, resultsInvite, fieldsInvite) => {
									res.json({
										message: "pending invite",
									})
								}
							)
						}
					}
				)
			} else {
				res.status(404).json({
					message: "First and Last Name of Invitee not found",
				})
			}
		}
	)
})

router.post("/jurn", (req, res, next) => {
	const jname = req.body.jname
	const user_id = req.body.user_id
	const checkSQL3 = "SELECT count(1) as count FROM jurn WHERE jname = ?"
	conn.query(checkSQL3, [jname], (err3, results3, fields3) => {
		if (results3[0].count > 0) {
			res.status(409).json({
				message: "jurn already exists",
			})
		} else {
			const sql4 = "INSERT INTO jurn (jname, user_id) VALUES (?, ?)"
			conn.query(sql4, [jname, user_id], (err4, results4, fields4) => {
				// const sqlGetJurn_id = `SELECT jurn_id FROM jurn WHERE jname = ?`
				const jurn_id = results4.insertId
				const sqlLinks = `INSERT INTO link (user_id, jurn_id) VALUES (?, ?)`
				conn.query(
					sqlLinks,
					[user_id, jurn_id],
					(errLinks, resultsLinks, fieldsLinks) => {
						const sqlStart = `INSERT INTO invite
            (jurn_id, user_id, inv_status)
            VALUES(?,?,"accepted")`
						conn.query(
							sqlStart,
							[jurn_id, user_id],
							(errStart, resultsStart, fieldStart) => {
								const sqlR = `INSERT INTO reminder (rem, status, jurn_id, user_id)
                VALUES
                    ("Alert your credit card company", "active", ?, ?),
                    ("Contact your cell phone company","active",  ?, ?),
                    ("Notify your home security system operator","active",  ?, ?),
                    ("Confirm all reservations","active",  ?, ?),
                    ("Make advance payments on bills that have due dates during your trip","active",  ?, ?),
                    ("Check the weather","active",  ?, ?),
                    ("Eat, throw out, or give away any perishable food","active", ?, ?),
                    ("Leave an itinerary with a friend or family member","active",  ?, ?),
                    ("Place a hold on your mail delivery","active",  ?, ?),
                    ("Bring in outdoor furniture","active", ?, ?)`
								conn.query(
									sqlR,
									[
										jurn_id,
										user_id,
										jurn_id,
										user_id,
										jurn_id,
										user_id,
										jurn_id,
										user_id,
										jurn_id,
										user_id,
										jurn_id,
										user_id,
										jurn_id,
										user_id,
										jurn_id,
										user_id,
										jurn_id,
										user_id,
										jurn_id,
										user_id,
									],
									(errR, resultsR, fieldsR) => {
										res.json({
											message: "jurn added successfully",
											id: jurn_id,
											user_id: user_id,
										})
									}
								)
							}
						)
					}
				)
			})
		}
	})
})

router.post("/location", (req, res, next) => {
	const loc_name = req.body.location
	const jurn_id = req.body.jurn_id
	const sql8 = "INSERT INTO location (loc_name, jurn_id) VALUES (?, ?)"

	conn.query(sql8, [loc_name, jurn_id], (err8, results8, fields8) => {
		res.json({
			message: "location added successfully",
		})
	})
})

router.post("/hotel", (req, res, next) => {
	const hotel_name = req.body.hotel
	const jurn_id = req.body.jurn_id
	const sql8 = "INSERT INTO hotel (hotel_name, jurn_id) VALUES (?, ?)"

	conn.query(
		sql8,
		[hotel_name, jurn_id],
		(errHot2, resultsHot2, fieldsHot2) => {
			res.json({
				message: "hotel added successfully",
			})
		}
	)
})

router.post("/dates", (req, res, next) => {
	const jurn_id = req.body.jurn_id

	if (req.body.date != null) {
		const start_date = req.body.date[0]
		const end_date = req.body.date[1]

		if (start_date && end_date) {
			const sqlDateRange =
				"INSERT INTO date (start_date, end_date, jurn_id) VALUES (?, ?, ?)"

			conn.query(
				sqlDateRange,
				[start_date, end_date, jurn_id],
				(errDateRange, resultsDateRange, fieldsDateRange) => {
					res.json({
						message: "dates added successfully",
					})
				}
			)
		} else {
			res.json({
				message: "Please select a valid date range",
			})
		}
	} else {
		res.json({
			message: "Dates not changed",
		})
	}
})

router.post("/addrem", (req, res, next) => {
	const jurn_id = req.body.jurn_id
	const user_id = req.body.user_id
	const rem = req.body.reminder
	const sqlAddRem = `INSERT INTO reminder (rem, jurn_id, user_id) VALUES (?, ?, ?)`
	conn.query(
		sqlAddRem,
		[rem, jurn_id, user_id],
		(errAddrem, resultsAddRem, fieldsAddRem) => {
			res.json({
				message: "rem added successfully",
			})
		}
	)
})

router.post("/addact", (req, res, next) => {
	const jurn_id = req.body.jurn_id
	const act = req.body.activity
	const sqlAddact = `INSERT INTO activity (act, jurn_id) VALUES (?, ?)`
	conn.query(
		sqlAddact,
		[act, jurn_id],
		(errAddact, resultsAddact, fieldsAddact) => {
			res.json({
				message: "act added successfully",
			})
		}
	)
})

router.post("/message", (req, res, next) => {
	if (req.body.jurnId) {
		const user_id = req.body.user_id
		const jurn_id = req.body.jurnId
		const message = req.body.message
		const sqlMsg =
			"INSERT INTO message (message, jurn_id, user_id) VALUES (?, ?, ?)"

		conn.query(
			sqlMsg,
			[message, jurn_id, user_id],
			(errMsg, resultsMsg, fieldsMsg) => {
				res.json({
					message: "message added successfully",
				})
			}
		)
	} else {
		res.status(404).json({
			message: "message not added",
		})
	}
})

router.post("/images", async (req, res, next) => {
	try {
		const fileString = req.body.image
		const tag = req.body.jurnTag
		const uploadResponse = await cloudinary.uploader.upload(fileString, {
			upload_preset: "Jurnes",
			tags: tag,
		})
		res.json({ message: "image added" })
	} catch (err) {
		res.status(500).json({ err: "Something went wrong" })
	}
})

module.exports = router
