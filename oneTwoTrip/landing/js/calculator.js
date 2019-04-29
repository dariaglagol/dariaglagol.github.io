const aviaWrapper = document.querySelector('.calculator__field-wrapper--avia');
const markupWrapper = document.querySelector('.calculator__field-wrapper--markup');
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
    },
    greyFiled: {
        node: aviaWrapper.querySelector('.calculator__range-grey-field'),
        result: ''
    }
};

aviaNodes.input.node.addEventListener('input', (e) => {
    const input = e.target;
    const controlWidth = aviaNodes.input.node.getBoundingClientRect().width;
    const oneStepWidth = controlWidth/10000;

    aviaNodes.greyFiled.node.style.left = `${(oneStepWidth * input.value) + 20}px`;

    aviaNodes.value.node.innerText = input.value;
});
