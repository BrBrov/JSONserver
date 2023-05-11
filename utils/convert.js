//  all data was getting from https://www.aviasales.ru/

const dbAviasales = require('./en.json');

class Ticket {
	date = ''; // ISO-8601 date and time to flight
	placeCount = 0; //count must be from 0 to 100
	direction = ''; //destination
	form = '';
	to = '';
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
	constructor(date, city, destination) {
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
		this.ticket.priceAdult.usa = this.ticket.priceAdult.eur * this.currency.usa;
		this.ticket.priceAdult.rub = this.ticket.priceAdult.eur * this.currency.rub;
		this.ticket.priceAdult.pln = this.ticket.priceAdult.eur * this.currency.pln;

		this.ticket.priceChild.eur = this.ticket.priceAdult.eur * 0.75;
		this.ticket.priceChild.usa = this.ticket.priceAdult.usa * 0.75;
		this.ticket.priceChild.rub = this.ticket.priceAdult.rub * 0.75;
		this.ticket.priceChild.pln = this.ticket.priceAdult.pln * 0.75;

		this.ticket.priceInfant.eur = this.ticket.priceAdult.eur * 0.5;
		this.ticket.priceInfant.usa = this.ticket.priceAdult.usa * 0.5;
		this.ticket.priceInfant.rub = this.ticket.priceAdult.rub * 0.5;
		this.ticket.priceInfant.pln = this.ticket.priceAdult.pln * 0.5;
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
		let controlDate = this.dateNow.getTime();
		let datePerYear = controlDate + 2678400;
		this.dBase = this.citiesArr.map(city => {
			this.db.forEach(destination => {
				if (city.name !== destination.name) {
					city.tickets[`${destination.name}`] = [];
				let countTicket = 20;
				while (countTicket) {
					const date = this.#randomDate(controlDate, datePerYear);
					const isApson = city.tickets[`${destination.name}`].some(ticket => ticket.date === date && ticket.name === destination.name);
					if (!isApson) {
						const dateISO = new Date(date).toISOString();
						const ticket = new TicketConstructor(dateISO, city, destination);
						city.tickets[`${destination.name}`].push(ticket.getTicket());
						countTicket -= 1;
					}
				}
				city.tickets[`${destination.name}`] = this.#sortTicketsArray(city.tickets[`${destination.name}`]);
				}
			});
			
			return city;
		})
	}

	#randomDate(startDate, endDate) {
		return startDate + Math.random() * (endDate - startDate);
	}

	#sortTicketsArray(ticketsArr) {
		const arr = [].concat(ticketsArr);

		if (arr.length <= 1) {
			return arr;
		}
		
		let leftArr = []; 
		let rightArr = [];
		for (let i = 1; i < arr.length; i++) {
			const date1 = new Date(arr[i]).getTime();
			const date2 = new Date(arr[0]).getTime()
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
	console.log('create!!!');
	return function () {
		return base;
	}
}


module.exports = createDB;
