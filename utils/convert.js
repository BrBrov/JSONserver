//  all data was getting from https://www.aviasales.ru/

const ru = require('./ru.json');
const en = require('./en.json');

class City {
  id = '';
  nameEn = ''; //name ru
  nameRu = ''; //name en
  airportEn = ''; //main_airport_name ru
  airportRu = ''; //main_airport_name ru
  abbreviation = ''; //code
  GMT = ''; //?
  location = ''; //country_name
  isOpen = true;
  priceTarif = ''; //?  
  tickets = [];
}

class Ticket{
  date = ''; // ISO-8601 date and time to flight
  placeCount = 0; //count must be from 0 to 100
  direction = ''; //city destination

  #randPlaces() {
    return Math.ceil(Math.random() * 100);
  }
}

class ConsructorCity extends City {
  constructor (en, ru, id) {
    this.#create(en, ru);
  }

  #create(en, ru, id) {
    this.id = id;
    this.nameEn = en.name;
    this.nameRu = ru.name;
    this.airportEn = en.main_airport_name;
    this.airportRu = ru.main_airport_name;
    this.abbreviation = en.code;
    this.location = en.country_name;
  }

  #createTickets(count) {
    
  }
}