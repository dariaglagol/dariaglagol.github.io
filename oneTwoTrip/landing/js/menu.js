(function(){
    //MOBILE MENU START
    const openMenuBtn = document.querySelector('.user-menu__btn--open');
    const closeMenuBtn = document.querySelector('.user-menu__btn--close');
    const menu = document.querySelector('.user-menu__mobile');
    const substrate = document.querySelector('.substrate');
    const body = document.querySelector('body');

    function handleOpenMenuBtn() {
        menu.classList.remove('user-menu__mobile--close');
        menu.classList.add('user-menu__mobile--open');
        substrate.classList.remove('substrate--closed');
        body.style.overflow = 'hidden';

        closeMenuBtn.addEventListener('click', handleCloseMenuBtn);
        openMenuBtn.removeEventListener('click', handleOpenMenuBtn);
    };

    function handleCloseMenuBtn() {
        menu.classList.remove('user-menu__mobile--open');
        menu.classList.add('user-menu__mobile--close');
        substrate.classList.add('substrate--closed');
        body.style.overflow = 'auto';

        openMenuBtn.addEventListener('click', handleOpenMenuBtn);
        closeMenuBtn.removeEventListener('click', handleCloseMenuBtn);
    }

    openMenuBtn.addEventListener('click', handleOpenMenuBtn);

//MOBILE MENU END

//SIGN UP AND SING IN POPUP START
    const signIn = document.querySelectorAll('.user-menu__link--sign-in');
    const mainContent = document.querySelector('main');
    const signUp = document.querySelectorAll('.user-menu__link--sign-up');
    const popupTemplate = document.querySelector('#popup');
    const popupNode = popupTemplate.content.querySelector('.popup-wrapper');
    const popup = popupNode.cloneNode(true);

    function handleOpenSignIn() {
        const loginFormTemplate = document.querySelector('#login');
        const loginFormNode = loginFormTemplate.content.querySelector('.auth-modal');
        const loginForm = loginFormNode.cloneNode(true);

        if(popup.childNodes[3]) {
            popup.removeChild(popup.childNodes[3])
        }

        popup.appendChild(loginForm);
        mainContent.appendChild(popup);

        const loginLink = popup.querySelector('.auth-modal__link-area');
        const forgotPasswordLink = popup.querySelector('.auth-modal__forgot-password');
        const closeButton = popup.querySelector('.popup__btn--close');

        body.style.overflow = 'hidden';
        substrate.classList.remove('substrate--closed');

        closeButton.addEventListener('click', handleCloseSignForms);

        loginLink.addEventListener('click', () => {
            changeLoginAndRegForms(e, 'login')
        });

        console.log(forgotPasswordLink);

        forgotPasswordLink.addEventListener('click', openRequestPasswordForm);

        for(let i = 0; i < signUp.length; i++) {
            signUp[i].removeEventListener('click', handleOpenSignIn);
        }
    }

    function handleOpenSignUp() {
        const registerFormTemplate = document.querySelector('#registrationStart');
        const registerFormNode = registerFormTemplate.content.querySelector('.auth-modal');
        const registerForm = registerFormNode.cloneNode(true);

        if(popup.childNodes[3]) {
            popup.removeChild(popup.childNodes[3])
        }

        popup.appendChild(registerForm);
        mainContent.appendChild(popup);

        body.style.overflow = 'hidden';
        substrate.classList.remove('substrate--closed');

        handleRegistrationSelect();

        const loginLink = popup.querySelector('.auth-modal__link-area');
        const closeButton = popup.querySelector('.popup__btn--close');

        closeButton.addEventListener('click', handleCloseSignForms);
        loginLink.addEventListener('click', () => {
            changeLoginAndRegForms(e, 'registration')
        });

        for(let i = 0; i < signIn.length; i++) {
            signIn[i].removeEventListener('click', handleOpenSignIn);
        }
    }

    function handleCloseSignForms() {
        const popup = document.querySelector('.popup-wrapper');
        const closeButton = popup.querySelector('.popup__btn--close');

        body.style.overflow = 'auto';
        if(!menu.classList.contains('user-menu__mobile--open')) {
            substrate.classList.add('substrate--closed');
        }

        closeButton.removeEventListener('click', handleCloseSignForms);

        for(let i = 0; i < signUp.length; i++) {
            signUp[i].addEventListener('click', handleOpenSignUp);
        }

        for(let i = 0; i < signIn.length; i++) {
            signIn[i].addEventListener('click', handleOpenSignIn);
        }

        popup.remove();
    }

    for(let i = 0; i < signUp.length; i++) {
        signUp[i].addEventListener('click', handleOpenSignUp);
    }

    for(let i = 0; i < signIn.length; i++) {
        signIn[i].addEventListener('click', handleOpenSignIn);
    }

//SIGN UP AND SING IN POPUP END

//SELECT START
    function clearActiveItems(array) {
        for(let i = 0; i < array.length; i++){
            array[i].classList.remove('auth-modal__pseudo-select-item--active')
        }
    }

    function handleRegistrationSelect() {
        const selectBtn = document.querySelector('.auth-modal__field--pseudo-select');
        const itemsList = document.querySelector('.auth-modal__pseudo-select-block');
        const selectValue = document.querySelector('.auth-modal__field--select');
        const token = 'auth-modal__pseudo-select-block--closed';
        let btnState = 'close';

        selectBtn.addEventListener('click', () => {
            itemsList.classList.toggle(token);
            btnState = itemsList.classList.contains(token) ? 'close' : 'open';
            selectBtn.setAttribute('data-state', btnState);
        });

        itemsList.addEventListener('click', (e) => {
            const item = e.target;
            let value = '';
            let text = '';
            if(item.hasAttribute('data-value')) {
                value = item.getAttribute('data-value');
                text = item.innerHTML
            }
            clearActiveItems(itemsList.children);
            item.classList.add('auth-modal__pseudo-select-item--active');
            selectBtn.innerHTML = text;
            itemsList.classList.toggle(token);
            btnState = itemsList.classList.contains(token) ? 'close' : 'open';
            selectBtn.setAttribute('data-state', btnState);
            selectBtn.setAttribute('data-dirty', 'true');
            selectValue.setAttribute('value', value);
        });
    }
//SELECT END

    function changeLoginAndRegForms(e, form){
        switch (form) {
            case 'registration':
                handleCloseSignForms();
                handleOpenSignIn();
                break;
            case 'login':
                handleCloseSignForms();
                handleOpenSignUp();
                break;
        }
    }

    function openRequestPasswordForm(e) {
        handleCloseSignForms();

        const forgotPasswordTemplate = document.querySelector('#forgotPassword');
        const forgotPasswordNode = forgotPasswordTemplate.content.querySelector('.auth-modal');
        const forgotPasswordForm = forgotPasswordNode.cloneNode(true);

        if(popup.childNodes[3]) {
            popup.removeChild(popup.childNodes[3])
        }

        popup.appendChild(forgotPasswordForm);
        mainContent.appendChild(popup);

        const closeButton = popup.querySelector('.popup__btn--close');

        body.style.overflow = 'hidden';
        substrate.classList.remove('substrate--closed');

        closeButton.addEventListener('click', handleCloseSignForms);
    }
})();
