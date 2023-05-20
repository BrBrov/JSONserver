const crypto = require('crypto');

class User {
    constructor(json) {
        this.id = json.id;
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
        this.user = new User(json);
				this.user.tickets = [];
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
      return this.user;
    }
}

class UserDB {
  constructor() {
    this.users = [];
  }
  
  setUser(json) {
    const index = this.users.indexOf((user) => user.email === json.email);

    if (index === -1) {
      
    }

    return null;
  }

  #createID(mail) {
    
  }

  findUser(json) {
    return this.users.find((user) => user.password === json.password && user.email === json.email);
  }

}

const userDB = new UserDB();

//mokk data

const mokUser = {
  id: 1,
  email: 'pupkin@mail.com',
  firstName: 'Vasia',
  lastName: 'Pupkin',
  birthDate: '1990-01-01T19:00:00',
  gender: 'male',
  mobile: '+375297777777',
  citizen: 'town',
  password: '123456'
};

userDB.setUser(mokUser);

module.exports = userDB;