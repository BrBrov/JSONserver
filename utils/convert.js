//  all data was getting from https://www.aviasales.ru/

const dbAviasales = require('./en.json');

class Ticket {
	id = 0;
	date = ''; // ISO-8601 date and time to flight
	placeCount = 0; //count must be from 0 to 100
	direction = ''; //destination
	form = '';
	to = '';
	wayTime = '';
	numberOfFlight = '';
	priceAdult = {
		eur: 0,
		usa: 0,
		rub: 0,
		pln: 0
	};
	priceChild = {
		eur: 0,
		usa: 0,
		rub: 0,
		pln: 0
	};
	priceInfant = {
		eur: 0,
		usa: 0,
		rub: 0,
		pln: 0
	};
}

class ConstructorCity {
	constructor(en, id) {
		this.city = {};
		this.#create(en, id);
	}

	#create(en, id) {
		this.city.id = id;
		this.city.name = en.name;
		this.city.airport = en.main_airport_name;
		this.city.abbreviation = en.code;
		this.city.location = en.country_name;
		this.city.tickets = {};
		this.city.coordinates = en.coordinates;
		this.city.countryCode = en.country_code;
	}

	returnCity() {
		return this.city;
	}
}


class TicketConstructor {
	constructor(date, city, destination, id) {
		this.ticket = new Ticket();
		this.currency = {
			eur: 1,
			usa: 1.1,
			rub: 84.15,
			pln: 4.54
		}
		this.#randPlaces();
		this.#ticketDestinationLabel(city, destination);
		this.#ticketFromTo(city, destination);
		this.#ticketPrice(city, destination);
		this.ticket.date = date;
		this.ticket.id = id;
	}

	getTicket() {
		return this.ticket;
	}

	#randPlaces() {
		this.ticket.placeCount = Math.ceil(Math.random() * 100);
	}

	#countDistance(city1, city2) {

		const forRad = Math.PI / 180;

		const earthRadius = 6371;

		const lat1 = city1.lat * forRad;
		const lat2 = city2.lat * forRad;
		const lon1 = city1.lon * forRad;
		const lon2 = city2.lon * forRad;

		const cosLon1 = Math.cos(lon1);
		const cosLon2 = Math.cos(lon2);

		const deltaLon = lon2 - lon1;
		const deltaLat = lat2 - lat1;

		const sqrtCoord = Math.sqrt(Math.pow(Math.sin(deltaLon / 2), 2) + (cosLon1 * cosLon2 * Math.pow(Math.sin(deltaLat / 2), 2)));

		return Math.round(2 * earthRadius * Math.asin(sqrtCoord));
	}

	#ticketDestinationLabel(city, destination) {
		this.ticket.direction = `${city.name} - ${destination.name}`;
	}

	#ticketFromTo(city, destination) {
		this.ticket.form = city.name;
		this.ticket.to = destination.name;
	}

	#ticketPrice(city, destination) {
		const distance = this.#countDistance(city.coordinates, destination.coordinates);
		this.ticket.priceAdult.eur = distance * 0.05;
		this.ticket.priceAdult.usa = Math.round(this.ticket.priceAdult.eur * this.currency.usa * 100) / 100;
		this.ticket.priceAdult.rub = Math.round(this.ticket.priceAdult.eur * this.currency.rub * 100) / 100;
		this.ticket.priceAdult.pln = Math.round(this.ticket.priceAdult.eur * this.currency.pln * 100) / 100;

		this.ticket.priceChild.eur = Math.round(this.ticket.priceAdult.eur * 0.75 * 100) / 100;
		this.ticket.priceChild.usa = Math.round(this.ticket.priceAdult.usa * 0.75 * 100) / 100;
		this.ticket.priceChild.rub = Math.round(this.ticket.priceAdult.rub * 0.75 * 100) / 100;
		this.ticket.priceChild.pln = Math.round(this.ticket.priceAdult.pln * 0.75 * 100) / 100;

		this.ticket.priceInfant.eur = Math.round(this.ticket.priceAdult.eur * 0.5 * 100) / 100;
		this.ticket.priceInfant.usa = Math.round(this.ticket.priceAdult.usa * 0.5 * 100) / 100;
		this.ticket.priceInfant.rub = Math.round(this.ticket.priceAdult.rub * 0.5 * 100) / 100;
		this.ticket.priceInfant.pln = Math.round(this.ticket.priceAdult.pln * 0.5 * 100) / 100;
	}

}

class DBFactory {
	constructor(dbCities) {
		this.db = dbCities;
		this.dateNow = new Date();
		this.createCities();
		this.createOutputDB();
	}

	createCities() {
		this.citiesArr = this.db.map((city, index) => {
			const cityObj = new ConstructorCity(city, index);
			return cityObj.returnCity();
		});
	}

	createOutputDB() {
		// TODO: Bug!
		const year = this.dateNow.getFullYear();
		const month = this.dateNow.getMonth();
		const hour = this.dateNow.getHours();
		const minute = this.dateNow.getMinutes();

		this.dBase = this.citiesArr.map((city) => {

			this.db.forEach((destination) => {

				if (destination.name !== city.name) {
					let ticketsArray = [];
					let controlDateArray = [];
					let countTickets = 0;
					//2023-05-20T19:13:02.977Z
					while (countTickets < 20) {
						let ticketMonth = 0;
						let ticketYear = year;
						let ticketDate = 0;
						if (countTickets < (20 / 2)) {
							ticketMonth = month;
							ticketDate = this.#random(1, this.#getDaysInMonth(ticketMonth));

						} else {
							ticketMonth = month + 1;

							if (ticketMonth > 11) {
								ticketMonth = 0;
								ticketYear = year + 1;
							}

							ticketDate = this.#random(1, this.#getDaysInMonth(ticketMonth));
						}

						ticketMonth = ticketMonth < 10 ? `0${ticketMonth}` : `${ticketMonth}`;
						ticketDate = ticketDate < 10 ? `0${ticketDate}` : `${ticketDate}`;

						let fullTicketDate = `${ticketYear}-${ticketMonth}-${ticketDate}T`;

						const controlDateInArray = controlDateArray.includes(fullTicketDate);


						if (!controlDateInArray) {
							controlDateArray.push(fullTicketDate);
							let ticketHour = this.#random(hour, 23);
							ticketHour = ticketHour < 10 ? `0${ticketHour}` : `${ticketHour}`;
							let ticketMinute = this.#random(minute, 59);
							ticketMinute = ticketMinute < 10 ? `0${ticketMinute}` : `${ticketMinute}`;
							fullTicketDate += `${ticketHour}:${ticketMinute}:00.000Z`;
							const ticket = new TicketConstructor(fullTicketDate, city, destination, countTickets);
							ticketsArray.push(ticket.ticket);
							countTickets += 1;
						}
					}

					ticketsArray = this.#sortTicketsArray(ticketsArray);

					ticketsArray.forEach((ticket, i) => ticket.id = `${city.abbreviation} ${i}`);

					city.tickets[destination.name] = ticketsArray;
				}


			});

			return city;
		});
	}

	#random(start, end) {
		return Math.floor((Math.random() * (end - start + 1)) + start);
	}

	#getDaysInMonth(month) {
		if (month === 1) {
			return 28;
		}

		if (month === 0 || month % 2 === 0) {
			return 31;
		}

		return 30;
	}

	#sortTicketsArray(ticketsArr) {
		const arr = [].concat(ticketsArr);

		if (arr.length <= 1) {
			return arr;
		}

		let leftArr = [];
		let rightArr = [];
		for (let i = 1; i < arr.length; i++) {
			const date1 = new Date(arr[i].date).getTime();
			const date2 = new Date(arr[0].date).getTime();
			date1 < date2 ? leftArr.push(arr[i]) : rightArr.push(arr[i]);
		}

		return this.#sortTicketsArray(leftArr).concat(arr[0], this.#sortTicketsArray(rightArr));
	}

	getDB() {
		return this.dBase;
	}
}


function createDB() {
	const factory = new DBFactory(dbAviasales);
	const base = factory.getDB();
	console.log('Create cities database!!!');
	return base;
}


module.exports = createDB;
