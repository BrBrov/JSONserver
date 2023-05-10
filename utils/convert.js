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
}