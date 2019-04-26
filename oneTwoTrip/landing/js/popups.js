const railwaysBtn = document.querySelector('#railways');
const aviaBtn = document.querySelector('#avia');
const hotelsBtn = document.querySelector('#hotels');
const popupNode = document.querySelector('#popup').content.querySelector('.popup-wrapper');
const aviaNode = document.querySelector('#yield-avia').content;
const railwaysNode = document.querySelector('#yield-railways').content;
const hotelsNode = document.querySelector('#yield-hotels').content;
const certificateNode = document.querySelector('#yield-certificates').content;
const substrate = document.querySelector('.substrate');
const body = document.querySelector('body');

const popup = popupNode.cloneNode(true);

const sliderList = document.querySelectorAll('.slider');

const sliderMap = {};
const sliderContainersList = {};
const sliderContolsList = {};

sliderList.forEach( node => {
    const key = node.classList[1];
    sliderMap[key] = node;
});

Object.keys(sliderMap).forEach((container, index) => {
    const key = sliderMap[container].classList[1];
    const sliderWrapper = sliderMap[container].children[0];
    const control = sliderMap[container].children[1];
    sliderContainersList[key] = sliderWrapper;
    sliderContolsList[key] = control;

});

function handleOpenVerticalPopups() {
    const item = event.target;
    const itemId = item.hasAttribute('id') ? item.getAttribute('id') : null;
    const aviaText = aviaNode.cloneNode(true);
    const hotelsText = hotelsNode.cloneNode(true);
    const railwaysText = railwaysNode.cloneNode(true);
    const certificateText = certificateNode.cloneNode(true);

    const verticalsMap = {
        'railways': railwaysText,
        'avia': aviaText,
        'hotels': hotelsText,
        'certificate': certificateText
    };

    if(itemId) {
        body.style.overflow = 'hidden';
        substrate.classList.remove('substrate--closed');

        if(popup.children[1]) {
            popup.removeChild(popup.children[1])
        }

        popup.appendChild(verticalsMap[itemId]);

        sliderMap['yield__price-list-wrapper'].appendChild(popup);

        const closeMenuBtn = document.querySelector('.popup__btn--close');
        closeMenuBtn.addEventListener('click', handleCloseVerticalPopups);
    }
}

function handleCloseVerticalPopups() {
    const popup = document.querySelector('.popup-wrapper');
    const closeMenuBtn = popup.querySelector('.popup__btn--close');

    substrate.classList.add('substrate--closed');
    body.style.overflow = 'auto';
    closeMenuBtn.removeEventListener('click', handleCloseVerticalPopups);
    sliderContainersList['yield__price-list-wrapper'].addEventListener('click', handleOpenVerticalPopups);
    popup.remove();
}

sliderContainersList['yield__price-list-wrapper'].addEventListener('click', handleOpenVerticalPopups);

//SLIDER

const verticalsPriceChildrenArray = [];
const verticalsControlsChildrenArray = [];
const advantagesPriceChildrenArray = [];
const advantagesControlsChildrenArray = [];
const ourClientsPriceChildrenArray = [];
const ourClientsControlsChildrenArray = [];

function getScreenWidth(){
    const width = document.body.clientWidth;
    if(width < 1280) {
        createSlider();
    }
}

for (let i = 0; i < sliderContainersList['yield__price-list-wrapper'].children.length; i++) {
    verticalsPriceChildrenArray.push(sliderContainersList['yield__price-list-wrapper'].children[i]);
    verticalsControlsChildrenArray.push(sliderContolsList['yield__price-list-wrapper'].children[i])
}

for (let i = 0; i < sliderContainersList['advantages__list-wrapper'].children.length; i++) {
    advantagesPriceChildrenArray.push(sliderContainersList['advantages__list-wrapper'].children[i]);
    advantagesControlsChildrenArray.push(sliderContolsList['advantages__list-wrapper'].children[i])
}

for (let i = 0; i < sliderContainersList['our-clients-list-wrapper'].children.length; i++) {
    ourClientsPriceChildrenArray.push(sliderContainersList['our-clients-list-wrapper'].children[i]);
    ourClientsControlsChildrenArray.push(sliderContolsList['our-clients-list-wrapper'].children[i])
}

window.addEventListener('resize', () => {
    getScreenWidth()
});

window.addEventListener('load', () => {
    getScreenWidth()
});

function createSlider() {
    sliderContolsList['yield__price-list-wrapper'].addEventListener('click', (e) => {
        const isControlInList = verticalsControlsChildrenArray.some((control) => control === e.target);
        const elem = e.target;
        if(isControlInList) {
            cleanControls(elem, verticalsControlsChildrenArray);
            const elemCount = verticalsControlsChildrenArray.indexOf(elem);
            sliderContainersList['yield__price-list-wrapper'].style.transform = `translateX(-${elemCount * 100}%)`
        }
    });

    sliderContolsList['advantages__list-wrapper'].addEventListener('click', (e) => {
        const isControlInList = advantagesControlsChildrenArray.some((control) => control === e.target);
        const elem = e.target;
        if(isControlInList) {
            cleanControls(elem, advantagesControlsChildrenArray);
            const elemCount = advantagesControlsChildrenArray.indexOf(elem);
            sliderContainersList['advantages__list-wrapper'].style.transform = `translateX(-${elemCount * 100}%)`
        }
    });

    sliderContolsList['our-clients-list-wrapper'].addEventListener('click', (e) => {
        const isControlInList = ourClientsControlsChildrenArray.some((control) => control === e.target);
        const elem = e.target;
        if(isControlInList) {
            cleanControls(elem, ourClientsControlsChildrenArray);
            const elemCount = ourClientsControlsChildrenArray.indexOf(elem);
            sliderContainersList['our-clients-list-wrapper'].style.transform = `translateX(-${elemCount * 100}%)`
        }
    });
}

function cleanControls(elem, array) {
    array.forEach(elem => elem.classList.remove('slider__control-item--active'));
    elem.classList.add('slider__control-item--active');
}

//CAROUSEL

const carouselToggleList = document.querySelector('.carousel__toggle-list');






