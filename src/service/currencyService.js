import traderCurrency from '../integration/trader/currency';

const currencies = [];
const all = () => currencies;
const findById = id => currencies.find(currency => currency.id === id);
const getByTwitterId = twitterId => currencies.filter(currency => currency.twitterId === twitterId);

const fetch = async () => {
  const currenciesResponse = await traderCurrency.all();

  for (const currencyResponse of currenciesResponse) {
    const currency = findById(currencyResponse.id);

    if (currency) {
      Object.keys(currencyResponse).forEach((key) => {
        currency[key] = currencyResponse[key];
      });
    } else {
      currencies.push(currencyResponse);
    }
  }
};

(async () => {
  await fetch();
})();

setInterval(async () => {
  await fetch();
}, 1800000 /* 30 min */);

export default {
  all,
  findById,
  getByTwitterId,
};
