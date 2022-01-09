const _ = require('lodash');
const updateNotifier = require('update-notifier');
const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

const countryCodes = require('./countryCodes.js');

const pkg = require('./package.json');
updateNotifier({pkg}).notify();

countryCodeList = () => {
    try {
        const sortedListByPhone = _.sortBy(countryCodes, ['phone']);
        const output = _.map(sortedListByPhone, ({ phone, emoji, code }, key) => ({
            phone,
            emoji,
            code,
            key
        }))

        return output;
        
    } catch (e) {
        return { phone: '', emoji: '', code: '', key: ''}
    }
};

countryCodeFilteredList = (filterKey) => {
    try {
        const key = parseInt(filterKey);
        if (isNaN(key)) {
            const upperCaseKey = filterKey.toUpperCase();
            return _.find(countryCodeList(), ['code', upperCaseKey]);
        }
        return _.find(countryCodeList(), ['phone', key]);

    } catch (e) {
        console.log(e)
        return {};
    }
},

phoneNumberValidation = (number, countryCode) => {
    try {
        const country = countryCodeFilteredList(countryCode)
        const phoneNumber = phoneUtil.parse(number.split('+').join(''), country['code']);

        return {
            phone : phoneUtil.format(phoneNumber, PNF.E164),
            isValid : phoneUtil.isValidNumber(phoneNumber),
            success: true,
            code: country['code'],
            flag: country['emoji']
          }

    } catch (e) {
        console.log(e)
        return {
            success: false,
        }
    }
}

module.exports = { countryCodeList, countryCodeFilteredList, phoneNumberValidation };