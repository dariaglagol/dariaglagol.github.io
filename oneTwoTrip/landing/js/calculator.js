const aviaWrapper = document.querySelector('.calculator__field-wrapper--avia');
const markup = document.querySelector('.calculator__number');
const railwaysWrapper = document.querySelector('.calculator__field-wrapper--railways');
const hotelsWrapper = document.querySelector('.calculator__field-wrapper--hotels');
const certificateWrapper = document.querySelector('.calculator__field-wrapper--certificates');

const aviaNodes = {
    value: {
        node: aviaWrapper.querySelector('.calculator__text-result'),
        result: ''
    },
    input: {
        node: aviaWrapper.querySelector('.calculator__range'),
        result: ''
    }
};

const railwaysNodes = {
    value: {
        node: railwaysWrapper.querySelector('.calculator__text-result'),
        result: ''
    },
    input: {
        node: railwaysWrapper.querySelector('.calculator__range'),
        result: ''
    }
};

const hotelsNodes = {
    value: {
        node: hotelsWrapper.querySelector('.calculator__text-result'),
        result: ''
    },
    input: {
        node: hotelsWrapper.querySelector('.calculator__range'),
        result: ''
    }
};

const certificateNodes = {
    value: {
        node: certificateWrapper.querySelector('.calculator__text-result'),
        result: ''
    },
    input: {
        node: certificateWrapper.querySelector('.calculator__range'),
        result: ''
    }
};

function createRanger(node) {
    const input = node.input.node;
    const controlWidth = input.getBoundingClientRect().width;
    const oneStepWidth = controlWidth/input.max;
    const thumbPosition = Math.round(oneStepWidth * input.value - 1);

    node.input.node.style.background = `linear-gradient(to right, #678df5 ${thumbPosition}px, #e8e8e8 ${thumbPosition}px)`;

    node.value.node.innerText = input.value;

    getCalculation(input.value);
}

window.addEventListener('load', ()=> {
    createRanger(aviaNodes);
    createRanger(railwaysNodes);
    createRanger(hotelsNodes);
    createRanger(certificateNodes);
});

aviaNodes.input.node.addEventListener('input', (e) => {
    createRanger(aviaNodes);
});

railwaysNodes.input.node.addEventListener('input', (e) => {
    createRanger(railwaysNodes);
});

hotelsNodes.input.node.addEventListener('input', (e) => {
    createRanger(hotelsNodes);
});

certificateNodes.input.node.addEventListener('input', (e) => {
    createRanger(certificateNodes);
});

function addPercentToMarkup() {
    const newValue = markup.value
            .replace(/\D/g, '')
            .replace(/(\d{4})/g, '1')
            +'%';
    markup.value = newValue.substr(0, 4);
}

markup.addEventListener('input', () => {
    addPercentToMarkup();
});

const userIncomeResult = document.querySelector('.calculator__income-number');

function getCalculation(value) {
    const costMap = {
        avia: {
            percentage: 2,
            averageCost: 14000
        },
        railways: {
            percentage: 5,
            averageCost: 4000
        },
        hotels: {
            percentage: 6,
            averageCost: 18000
        },
        certificates: {
            percentage: 2,
            averageCost: 10000
        }
    };

    const markupIncome = ((costMap.avia.averageCost / 100) * markup.value.substr(0,2)) * value;

    const aviaIncome = ((costMap.avia.averageCost / 100) * costMap.avia.percentage) * value;
    const railwaysIncome = ((costMap.railways.averageCost / 100) * costMap.railways.percentage) * value;
    const hotelsIncome = ((costMap.hotels.averageCost / 100) * costMap.hotels.percentage) * value;
    const certificatesIncome = ((costMap.certificates.averageCost / 100) * costMap.certificates.percentage) * value;

    userIncomeResult.innerText = aviaIncome + railwaysIncome + hotelsIncome + certificatesIncome + markupIncome;
}
