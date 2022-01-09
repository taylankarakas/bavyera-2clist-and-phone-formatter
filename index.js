const _ = require('lodash');
const updateNotifier = require('update-notifier');
const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

const countryCodes = require('./countryCodes.js');

const pkg = require('./package.json');
updateNotifier({pkg}).notify();

module.exports = {
    countryCodeList: () => {
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
    },

    countryCodeFilteredList: (filterKey) => {
        try {
            const key = parseInt(filterKey);
            if (isNaN(key)) {
                const upperCaseKey = filterKey.toUpperCase();
                return _.find(this.countryCodeList(), ['code', upperCaseKey]);
            }
            return _.find(this.countryCodeList(), ['phone', key]);

        } catch (e) {
            return {};
        }
    },

    phoneNumberValidation: (number, countryCode) => {
        try {
            const country = this.countryCodeFilteredList(countryCode)
            const phoneNumber = phoneUtil.parse(number.split('+').join(''), country['code']);

            return {
                phone : phoneUtil.format(phoneNumber, PNF.E164),
                isValid : phoneUtil.isValidNumber(phoneNumber),
                success: true,
                code: country['code'],
                flag: country['emoji']
              }

        } catch (e) {
            return {
                success: false,
            }
        }
    }
}