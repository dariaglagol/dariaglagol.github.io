const selectedCart = [
    {'price': 20},
    {'price': 45},
    {'price': 67},
    {'price': 1305},
];

const EUR = `EUR`;
const RUB = `RUB`;
const GBP = `GBP`;
const JPY = `JPY`;

const reduceCart = Object.values(selectedCart).reduce((prev, cartItem)=> {
    return prev + cartItem.price;
}, 0);

const getCurrencyExchangeValue = (currencyField) => {
    return reduceCart * currencyField;
};

const getCartValue = (data) => {
    return {
        usDollars: reduceCart,
        roubles: getCurrencyExchangeValue(data[RUB]),
        euro: getCurrencyExchangeValue(data[EUR]),
        yens: getCurrencyExchangeValue(data[JPY]),
        pounds: getCurrencyExchangeValue(data[GBP]),
    }
};

const getCurrencyExchangeData = async () => {
    try {
        const response = await fetch(`https://api.exchangeratesapi.io/latest?base=USD`);
        const result = await response.json();
        const preTag = document.querySelector(`pre`);

        preTag.innerText = (JSON.stringify(getCartValue(result.rates)));
        return getCartValue(result.rates);
    } catch (e) {
        console.log(e);
    }
};

getCurrencyExchangeData();
