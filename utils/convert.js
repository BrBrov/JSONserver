//  all data was getting from https://www.aviasales.ru/

const ru = require('./ru.json');
const en = require('./en.json');
const currency = {
	eur: 1,
	usa: 1.1,
	rub: 84.15,
	pln: 4.54
}

class Ticket{
  date = ''; // ISO-8601 date and time to flight
  placeCount = 0; //count must be from 0 to 100
  direction = ''; //city destination
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

class ConsructorCity {
  constructor (en, ru, id) {
		this.city = {};
    this.#create(en, ru, id);
  }

  #create(en, ru, id) {		
    this.city.id = id;
    this.city.nameEn = en.name;
    this.city.nameRu = ru.name;
    this.city.airportEn = en.main_airport_name;
    this.city.airportRu = ru.main_airport_name;
    this.city.abbreviation = en.code;
    this.city.location = en.country_name;
		this.city.tickets = [];
  }

	returnCity() {
		return this.city;
	}
}

const citiesArr = en.map((city, index) => {
	const cityObj = new ConsructorCity(en[index], ru[index], index);
	return cityObj.returnCity();
});

class TicketConstructor {
	constructor(date, destination) {
		this.ticket = new Ticket();
	}

	#randPlaces() {
    return Math.ceil(Math.random() * 100);
  }

	countDistance(city1, city2) {
		const forRad = Math.PI / 180;

		const eathRadius = 6371;

		const lat1 = city1.lat * forRad;
		const lat2 = city2.lat * forRad;
		const lon1 = city1.lon * forRad;
		const lon2 = city2.lon * forRad;

		const cosLat1 = Math.cos(lat1);
		const cosLat2 = Math.cos(lat2);
		const sinLat1 = Math.sin(lat1);
		const sinLat2 = Math.sin(lat2);

		const delta = lon2 - lon1;
		const cosDelta = Math.cos(delta);
		const sinDelta = Math.sin(delta);


 
	}
}
