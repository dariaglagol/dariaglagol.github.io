

const popupTemplate = document.querySelector('#popup');
const popupNode = popupTemplate.content.querySelector('.popup-wrapper');
const popup = popupNode.cloneNode(true);

const mainContent = document.querySelector('main');
const substrate = document.querySelector('.substrate');
const body = document.querySelector('body');

function isUserLogged() {
    fetch('https://partner.onetwotrip.com/user/info')
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                const userArea = document.querySelector('.navigation__entrance-menu .user-menu__desktop');
                const entranceMenu = document.querySelector('.navigation__entrance-menu');
                const userLoggedArea = document.querySelector('#userLogged').content;
                console.log(userArea.children);
                userArea.remove();
                entranceMenu.appendChild(userLoggedArea);
            }
            console.log(data);
            return data;
        })
        .catch(error => {
            console.log(error);
            return error;
        })
}

function registrationCheck() {
    if(window.location.search.indexOf('code') !== -1 && window.location.search.indexOf('email') !== -1) {
        const urlData = window.location.search;
        const emailPos = urlData.indexOf('email');
        const emailLength = emailPos + 6;
        const codePos = urlData.indexOf('code');
        const codeLength = codePos + 5;

        const email = urlData.substring(emailLength, codePos - 1);
        const code = urlData.substring(codeLength);

        console.log('registrationCheck');
        fetch(`https://partner.onetwotrip.com/user/confirmRegistration?email=${email}&code=${code}`)
            .then(data => {
                console.log('data', data)
            })
            .catch( error => {
                console.log('error', error)
            })
    } else {
        console.log('не трогай меня');
    }
}

function isUserChangedPassword(){
    const regExp = /^changePassword\/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const url = window.location.hash;
    const startHashPosition = url.lastIndexOf('changePassword');
    const hashString = url.substring(startHashPosition);
    return regExp.test(hashString);
}

function handleCloseSignForms() {
    const popup = document.querySelector('.popup-wrapper');
    const closeButton = popup.querySelector('.popup__btn--close');

    body.style.overflow = 'auto';
    substrate.classList.add('substrate--closed');

    closeButton.removeEventListener('click', handleCloseSignForms);
    popup.remove();
}

function openRestorePasswordForm() {
    if (isUserChangedPassword()) {
        const restorePasswordTemplate = document.querySelector('#restorePassword');
        const restorePasswordNode = restorePasswordTemplate.content.querySelector('.auth-modal');
        const restorePasswordForm = restorePasswordNode.cloneNode(true);
        popup.appendChild(restorePasswordForm);
        mainContent.appendChild(popup);

        const closeButton = popup.querySelector('.popup__btn--close');

        body.style.overflow = 'hidden';
        substrate.classList.remove('substrate--closed');

        closeButton.addEventListener('click', handleCloseSignForms);
    }
}

registrationCheck();

isUserLogged();

openRestorePasswordForm();