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
				this.user.tickets = {};
    }
}