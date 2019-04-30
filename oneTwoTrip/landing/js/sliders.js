//SLIDER
(function() {
    const sliderMap = {};
    const sliderContainersList = {};
    const sliderControlsList = {};

    const verticalsControlsChildrenArray = [];
    const advantagesControlsChildrenArray = [];
    const ourClientsControlsChildrenArray = [];
    const testimonialsControlsChildrenArray = [];

    const carouselWrappers = document.querySelectorAll('.carousel');
    const carouselToggleList = document.querySelector('.tools__name-list');
    const carouselItemList = document.querySelector('.tools__caption-list');

    const toolsControlsArray = [];
    const toolsItemsArray = [];
    const carouselMap = {};

    const sliderList = document.querySelectorAll('.slider');

    sliderList.forEach( node => {
        const key = node.classList[1];
        sliderMap[key] = node;
    });

    carouselWrappers.forEach(node => {
        const key = node.classList[1];
        carouselMap[key] = node;
    });

    Object.keys(sliderMap).forEach((container) => {
        const key = sliderMap[container].classList[1];
        const sliderWrapper = sliderMap[container].children[0];
        const control = sliderMap[container].children[1];
        sliderContainersList[key] = sliderWrapper;
        sliderControlsList[key] = control;
    });

    function getScreenWidth(){
        const width = document.body.clientWidth;
        if(width > 1279) {
            carouselToggleList.removeEventListener('click', createToolsCarousel);
        }
    }

    function createSlidersFunctionalArrays(index, controlsArray, arraysKey) {
        controlsArray.push(sliderControlsList[arraysKey].children[index])
    }

    for (let index = 0; index < sliderContainersList['yield__price-list-wrapper'].children.length; index++) {
        createSlidersFunctionalArrays(index, verticalsControlsChildrenArray, 'yield__price-list-wrapper');
    }

    for (let index = 0; index < sliderContainersList['advantages__list-wrapper'].children.length; index++) {
        createSlidersFunctionalArrays(index, advantagesControlsChildrenArray, 'advantages__list-wrapper');
    }

    for (let index = 0; index < sliderContainersList['our-clients-list-wrapper'].children.length; index++) {
        createSlidersFunctionalArrays(index, ourClientsControlsChildrenArray, 'our-clients-list-wrapper');
    }

    for (let index = 0; index < sliderContainersList['testimonials__list-wrapper'].children.length; index++) {
        createSlidersFunctionalArrays(index, testimonialsControlsChildrenArray, 'testimonials__list-wrapper');
    }

    window.addEventListener('load', () => {
        getScreenWidth();
        createSlider();
    });

    function addListener(e, controlsArray, activeClassName, arrayKey) {
        const isControlInList = controlsArray.some((control) => control === e.target);
        const elem = e.target;
        if (isControlInList) {
            cleanControls(elem, controlsArray, activeClassName);
            const elemCount = controlsArray.indexOf(elem);
            sliderContainersList[arrayKey].style.transform = `translateX(-${elemCount * 100}%)`
        }
    }

    function createSlider() {
        sliderControlsList['yield__price-list-wrapper'].addEventListener('click', (e) => {
            addListener(e, verticalsControlsChildrenArray, 'slider__control-item--active', 'yield__price-list-wrapper')
        });

        sliderControlsList['advantages__list-wrapper'].addEventListener('click', (e) => {
            addListener(e, advantagesControlsChildrenArray, 'slider__control-item--active', 'advantages__list-wrapper')
        });

        sliderControlsList['our-clients-list-wrapper'].addEventListener('click', (e) => {
            addListener(e, ourClientsControlsChildrenArray, 'slider__control-item--active', 'our-clients-list-wrapper')
        });

        sliderControlsList['testimonials__list-wrapper'].addEventListener('click', (e) => {
            addListener(e, testimonialsControlsChildrenArray, 'carousel__control-item--active', 'testimonials__list-wrapper')
        });

        carouselMap['tools__carousel'].addEventListener('click', (e) => {
            createToolsCarousel(e, toolsControlsArray, 'carousel__toggle-item--active', carouselItemList);
        });

        carouselMap['testimonials__carousel'].addEventListener('click', (e) => {
            createToolsCarousel(e, testimonialsControlsChildrenArray, 'carousel__control-item--active', sliderContainersList['testimonials__list-wrapper']);
        })
    }

    function cleanControls(elem, array, className) {
        array.forEach(elem => elem.classList.remove(className));
        elem.classList.add(className);
    }

//CAROUSEL

    for (let i = 0; i < carouselItemList.children.length; i++) {
        toolsItemsArray.push(carouselItemList.children[i])
    }

    const carouselToggleOptions = {
        link: {},
        deepLink: {},
        banner: {},
        searchForm: {},
        searchFormWithRes: {},
        apiAndWl: {}
    };

    let containerTogglesShift = 0;
    let carouselItemCount = 0;

    Object.keys(carouselToggleOptions).forEach((key, index) => {
        carouselToggleOptions[key] = {
            node: carouselToggleList.children[index],
            togglesShift: containerTogglesShift += carouselToggleList.children[index].getBoundingClientRect().width,
            clientWidth: carouselToggleList.children[index].getBoundingClientRect().width
        };
        toolsControlsArray.push(carouselToggleList.children[index]);
    });

    function isTargetInControlList(target) {
        const toggleArray = Object.keys(carouselToggleOptions);

        const isInObject =  toggleArray.some(item => {
            return carouselToggleOptions[item].node === target;
        });

        let togglesShift = 0;
        let itemSize = 0;

        for (let i = 0; i < toggleArray.length; i++) {
            const item = toggleArray[i];
            if (carouselToggleOptions[item].node === target) {
                togglesShift = carouselToggleOptions[item].togglesShift;
                itemSize = carouselToggleOptions[item].clientWidth;
            }
        }
        return {isInObject, togglesShift, itemSize}
    }

    function createToolsCarousel(e, arrayItems, activeClassName, nodeElement) {
        const target = e.target;

        if (isTargetInControlList(target).isInObject) {
            const togglesShift = isTargetInControlList(target).togglesShift;
            const itemSize = isTargetInControlList(target).itemSize;
            const targetCount = toolsControlsArray.indexOf(target);
            cleanControls(target, toolsControlsArray, 'carousel__toggle-item--active');
            carouselToggleList.style.transform = `translateX(calc(50% - (-${itemSize / 2}px + ${togglesShift}px)))`;
            carouselItemList.style.transform = `translateX(-${targetCount * 100}%)`;
            target.classList.add('carousel__toggle-item--active');
        }

        const detectArrow = target.classList.contains('carousel__arrow--left')
            ? 'left' : target.classList.contains('carousel__arrow--right')
            ? 'right': null;

        if (detectArrow) {
            addArrowControls(detectArrow, arrayItems, activeClassName, nodeElement);
        }
    }

    function addArrowControls(arrow, arrayItems, activeClassName, nodeElement) {
        if (arrow === 'right' && carouselItemCount < arrayItems.length - 1) {
            carouselItemCount++;
            cleanControls(arrayItems[carouselItemCount], arrayItems, activeClassName);
            nodeElement.style.transform = `translateX(-${carouselItemCount * 100}%)`;
            return carouselItemCount
        } else if (arrow === 'left' && carouselItemCount > 0) {
            carouselItemCount--;
            cleanControls(arrayItems[carouselItemCount], arrayItems, activeClassName);
            nodeElement.style.transform = `translateX(-${carouselItemCount * 100}%)`;
            return carouselItemCount
        }
    }
})();
