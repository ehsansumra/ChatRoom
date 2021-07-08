import mysql2 from 'mysql2';
import moment from 'moment';

let con = mysql2.createConnection({
	host: "localhost",
	user: "root",
	password: "B_vZG9U%:!S5:rF$",
	database: "user"
})

const sampleUsers = [
	{username: 'vXCiKXJfry', password: 'HSMWozskqJ'},
	{username: 'BsIZldTVIt', password: 'WaHgzjpidb'},
	{username: 'RJwDincdLs', password: 'IZTymykLIi'},
	{username: 'nhRPTBIRGk', password: 'OUGubiRwrQ'},
	{username: 'ChsXYdNnrt', password: 'IvfzAfBFAN'},
	{username: 'PPyNJXRbEQ', password: 'HlUwZjNORj'},
	{username: 'fWgwPYcDvr', password: 'FzyosDFYnd'},
	{username: 'hTmtyUkrFV', password: 'ascmmmiCYt'}]

const query = (sql) => {
	con.connect((err) => {
		if (err) throw err;
		con.query(sql, (err, result) => {
			if (err) {
				console.log(err.code, err.sqlMessage)
				return null
			}
			console.log(result)
			return result
		})
	})
}

const registerUser = (username = '', password = '') => {
	let sql = 
		`INSERT INTO user (username, password, active) ` +
		`VALUES ('${username}', '${password}', 0) `
	query(sql)
}


const loginUser = (username, password) => { //switch to active and create a session
	
	con.connect((err) => {
		if (err) throw err;
		
		let sql =  `SELECT user.password, user.id FROM user WHERE user.username = '${username}'`
		con.query(sql, (err, result) => {
			if (err) {
				console.log(err.code, err.sqlMessage)
				return null
			}
			
			if (result[0].password == password) {
				console.log('match!')
				let ID = result[0].id
				let sql = `SELECT sessions.active FROM sessions WHERE sessions.user_id = '${ID}'`
				
				con.query(sql, (err, result) => {
					if (err) {
						console.log(err.code, err.sqlMessage)
						return null
					}
					let sessionExists = result
					console.log(sessionExists)
					
					if (sessionExists.length < 1) {
						let mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
						let sql = `INSERT INTO sessions (active, user_id, start) VALUES (1, '${ID}', '${mysqlTimestamp}')`
						con.query(sql, (err, result) => {
							if (err) {
								console.log(err.code, err.sqlMessage)
								return null
							}
						})
					} else {console.log('already logged in!')}
				})
			}
		})
	})
}
	
const logoutUser = (sessionId) => { // use session ID (cookie!) to end session and log out user
	let mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
	let sql = `UPDATE sessions SET sessions.active = 0, sessions.end = '${mysqlTimestamp}' WHERE sessions.id = '${sessionId}'`
	con.connect((err) => {
		if (err) throw err;
		con.query(sql, (err, result) => {
			if (err) {
				console.log(err.code, err.sqlMessage)
				return null
			}
		})
	})
}

// loginUser authenticates the username and password with the DB, then checks if a session is active, if not, it creates an active session
// need to assign session cookies to every active session
// when session ends (logoutUser) the cookie is cleared.
// logoutUser(4)


