const bavyeraCpcFormatter = require('bavyera-2clist-and-phone-formatter');

const number = '5453657045';

console.log(bavyeraCpcFormatter.countryCodeList()); // all list
console.log(bavyeraCpcFormatter.countryCodeFilteredList(93)); // or 'tr' - 'ca'

console.log(bavyeraCpcFormatter.phoneNumberValidation(number, 'tr')); // or 'TR'
