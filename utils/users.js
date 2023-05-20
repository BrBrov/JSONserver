const crypto = require('crypto');

class User {
	constructor(json) {
		this.id = 0;
		this.email = json.email;
		this.firstName = json.firstName;
		this.lastName = json.lastName;
		this.birthDate = json.birthDate;
		this.gender = json.gender;
		this.mobile = json.mobile;
		this.citizen = json.citizen;
		this.password = json.password;
	}
}

class UserRecord {
	constructor(json) {
		const id = this.#generateID();
		this[id] = new User(json);
		this[id].id = id;
		this[id].tickets = [];
	}

	setTicket(ticket) {
		const ticketCount = this.user.ticket.length;

		ticket.id = ticketCount;

		this.user.ticket.push(ticket);
	}

	getTickets() {
		return this.user.tickets;
	}

	getUser() {
		const id = Object.keys(this)[0];
		return this[id];
	}

	#generateID() {
		const id = [];

		while (id.length < 10) {
			id.push(Math.floor(Math.random() * 10));
		}

		return id.join('');
	}
}

class UserDB {
	constructor() {
		this.users = [];
	}

	setUser(json) {
		const user = this.users.find((userRecord) => {
			const id = Object.keys(userRecord)[0];
			if (json.email === userRecord[id].email) return userRecord;
		});

		if (!user) {
			const record = new UserRecord(json);
			this.users.push(record);

			return record.getUser();
		}

		return null;
	}

	getUser(json) {
		const user = this.users.find((userData) => {
			const id = Object.keys(userData);
			if (json.email === userData[id].email && json.password === userData[id].password) {
				return userData;
			}
		});

		if (!user) return null;

		return user.getUser();
	}

	findUserByData(json) {
		return this.users.find((user) => user.password === json.password && user.email === json.email);
	}

	findUserById(id) {
		return this.users.find((user) => user.hasOwnProperty(`${id}`));
	}

}

const userDB = new UserDB();

module.exports = userDB;