/* ----------------------------
	CustomValidation prototype
	- Keeps track of the list of invalidity messages for this input
	- Keeps track of what validity checks need to be performed for this input
	- Performs the validity checks and sends feedback to the front end
---------------------------- */

function CustomValidation(input) {
    this.invalidities = [];
    this.validityChecks = [];

    //add reference to the input node
    this.inputNode = input;

    //trigger method to attach the listener
    this.registerListener();
}

CustomValidation.prototype = {
    addInvalidity: function(message) {
        this.invalidities.push(message);
    },
    getInvalidities: function() {
        return this.invalidities.join('. \n');
    },
    checkValidity: function(input) {
        for ( let i = 0; i < this.validityChecks.length; i++ ) {

            const isInvalid = this.validityChecks[i].isInvalid(input);
            if (isInvalid) {
                this.addInvalidity(this.validityChecks[i].invalidityMessage);
            }

            const requirementElement = this.validityChecks[i].element;

            if (requirementElement) {
                if (isInvalid) {
                    requirementElement.classList.add('invalid');
                    requirementElement.classList.remove('valid');
                } else {
                    requirementElement.classList.remove('invalid');
                    requirementElement.classList.add('valid');
                }

            } // end if requirementElement
        } // end for
    },
    checkInput: function() { // checkInput now encapsulated
        this.inputNode.CustomValidation.invalidities = [];
        this.checkValidity(this.inputNode);

        if ( this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '' ) {
            this.inputNode.setCustomValidity('');
        } else {
            const message = this.inputNode.CustomValidation.getInvalidities();
            this.inputNode.setCustomValidity(message);
        }
    },
    registerListener: function() { //register the listener here
        const CustomValidation = this;

        this.inputNode.addEventListener('keyup', function() {
            CustomValidation.checkInput();
        });
    }
};

/* ----------------------------
	Validity Checks
	The arrays of validity checks for each input
	Comprised of three things
		1. isInvalid() - the function to determine if the input fulfills a particular requirement
		2. invalidityMessage - the error message to display if the field is invalid
		3. element - The element that states the requirement
---------------------------- */

const userEmailValidityChecks = [
    {
        isInvalid: function(input) {
            const regExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            return !regExp.test(input.value);
        },
        invalidityMessage: 'This input needs to be at least 3 characters',
        element: document.querySelector('.auth-modal__block:nth-child(1) .auth-modal__field')
    }
];

const userLastNameValidityChecks = [
    {
        isInvalid: function(input) {
            const regExp = /[^а-яА-ЯёЁ]/g;
            return regExp.test(input.value);
        },
        invalidityMessage: 'Only letters are allowed',
        element: document.querySelector('.auth-modal__block:nth-child(2) .auth-modal__field')
    },
    {
        isInvalid: function(input) {
            return input.value.length < 2 | input.value.length > 70;
        },
        invalidityMessage: 'Значение должно быть больше 2 и меньше 70 символов',
        element: document.querySelector('.auth-modal__block:nth-child(2) .auth-modal__field')
    }
];

const userFirstNameValidityChecks = [
    {
    isInvalid: function(input) {
        return input.value.length === 0;
    },
    invalidityMessage: 'Введите имя',
    element: document.querySelector('.auth-modal__block:nth-child(3) .auth-modal__field')
},
    {
        isInvalid: function(input) {
            return input.value.length < 2 | input.value.length > 70;
        },
        invalidityMessage: 'Значение должно быть больше 2 и меньше 70 символов',
        element: document.querySelector('.auth-modal__block:nth-child(3) .auth-modal__field')
    }
    ];

const userPhoneValidityChecks = [
    {
        isInvalid: function(input) {
            return input.value.length === 0;
        },
        invalidityMessage: 'Введите номер',
        element: document.querySelector('.auth-modal__block:nth-child(4) .auth-modal__field')
    },
    {
        isInvalid: function(input) {
            return input.value.length < input.minLength | input.value.length > input.maxLength;
        },
        invalidityMessage: 'Значение должно быть больше 18 и меньше 19 символов',
        element: document.querySelector('.auth-modal__block:nth-child(4) .auth-modal__field')
    },
    {
        isInvalid: function(input) {
            const regExp =  /((\(\d{3}\)?)|(\d{3}))([\s-./]?)(\d{3})([\s-./]?)(\d{4})/;
            return !regExp.test(input.value);
        },
        invalidityMessage: 'Телефон введен неверно',
        element: document.querySelector('.auth-modal__block:nth-child(4) .auth-modal__field')
    },
];

const userPasswordValidityChecks = [
    {
        isInvalid: function(input) {
            return input.value.length === 0;
        },
        invalidityMessage: 'Введите пароль',
        element: document.querySelector('.auth-modal__block:nth-child(5) .auth-modal__field')
    },
    {
        isInvalid: function(input) {
            return input.value.length < input.minLength | input.value.length > input.maxLength;
        },
        invalidityMessage: 'Пароль недостаточно длинный',
        element: document.querySelector('.auth-modal__block:nth-child(5) .auth-modal__field')
    },
];

const trafficSelectionValidityChecks = [
    {
        isInvalid: function(input) {
            return input.value.length === 0;
        },
        invalidityMessage: 'Выберите источник трафика',
        element: document.querySelector('.auth-modal__block:nth-child(7) .auth-modal__field')
    }
];

const userLoginValidityChecks = [
    {
        isInvalid: function(input) {
            return input.value.length === 0;
        },
        invalidityMessage: 'Введите логин',
        element: document.getElementById('userLogin')
    }
];

const userLoginPasswordValidityChecks = [
    {
        isInvalid: function(input) {
            return input.value.length === 0;
        },
        invalidityMessage: 'Введите пароль',
        element: document.getElementById('userLoginPassword')
    }
];

// var passwordRepeatValidityChecks = [
//     {
//         isInvalid: function() {
//             return passwordRepeatInput.value != passwordInput.value;
//         },
//         invalidityMessage: 'This password needs to match the first one'
//     }
// ];


/* ----------------------------
	Setup CustomValidation
	Setup the CustomValidation prototype for each input
	Also sets which array of validity checks to use for that input
---------------------------- */

const authForm = document.querySelector('form[name="authForm"]');
const registerForm = document.querySelector('form[name="registerForm"]');
const forgotPasswordForm = document.querySelector('form[name="forgotForm"]');

if(registerForm) {
    const userEmailInput = document.getElementById('userEmail');
    const userLastNameInput = document.getElementById('userLastName');
    const userFirstNameInput = document.getElementById('userFirstName');
    const userPhoneInput = document.getElementById('userPhone');
    const userPasswordInput = document.getElementById('userPassword');
    const trafficSelectionInput = document.getElementById('userTrafficSelection');

    userEmailInput.CustomValidation = new CustomValidation(userEmailInput);
    userEmailInput.CustomValidation.validityChecks = userEmailValidityChecks;

    userLastNameInput.CustomValidation = new CustomValidation(userLastNameInput);
    userLastNameInput.CustomValidation.validityChecks = userLastNameValidityChecks;

    userFirstNameInput.CustomValidation = new CustomValidation(userFirstNameInput);
    userFirstNameInput.CustomValidation.validityChecks = userFirstNameValidityChecks;

    userPhoneInput.CustomValidation = new CustomValidation(userPhoneInput);
    userPhoneInput.CustomValidation.validityChecks = userPhoneValidityChecks;

    userPasswordInput.CustomValidation = new CustomValidation(userPasswordInput);
    userPasswordInput.CustomValidation.validityChecks = userPasswordValidityChecks;

    trafficSelectionInput.CustomValidation = new CustomValidation(trafficSelectionInput);
    trafficSelectionInput.CustomValidation.validityChecks = trafficSelectionValidityChecks;
} else if (authForm) {
    const userLoginInput = document.getElementById('userLogin');
    const userLoginPasswordInput = document.getElementById('userLoginPassword');

    userLoginInput.CustomValidation = new CustomValidation(userLoginInput);
    userLoginInput.CustomValidation.validityChecks = userLoginValidityChecks;

    userLoginPasswordInput.CustomValidation = new CustomValidation(userLoginPasswordInput);
    userLoginPasswordInput.CustomValidation.validityChecks = userLoginPasswordValidityChecks;
} else if (forgotPasswordForm) {
    const forgotEmailInput = document.getElementById('forgotEmailForm');
}

/* ----------------------------
	Event Listeners
---------------------------- */

function login() {
    const data = JSON.stringify({
        login: userLoginInput.value,
        password: userLoginPasswordInput.value
    });
    console.log('login');
    fetch('https://partner.onetwotrip.com/user/login', {
        method: 'post',
        headers: {
            'content-type': 'application/json;charset=UTF-8'
        },
        body: data
    })
    .then(data => {
        console.log('data', data)
    })
    .catch( error => {
            console.log('error', error)
        }
    )
}

function registration() {
    const data = JSON.stringify({
        email: userEmailInput.value,
        firstName: userFirstNameInput.value,
        lastName: userLastNameInput.value,
        phone: userPhoneInput.value,
        trafficSource: trafficSelectionInput.value,
        password: userPasswordInput.value,
        accepted: true
    });
    console.log('registration');
    fetch('https://partner.onetwotrip.com/user/register', {
        method: 'post',
        headers: {
            'content-type': 'application/json;charset=UTF-8'
        },
        body: data
    })
        .then(data => {
            console.log('data', data)
        })
        .catch( error => {
            console.log('error', error)
        })
}

function restorePassword() {
    const data = JSON.stringify({
        email: forgotEmailInput.value
    });
    fetch('https://partner.onetwotrip.com/user/restorePassword', {
        method: 'post',
        headers: {
            'content-type': 'application/json;charset=UTF-8'
        },
        body: data
    })
        .then(data => {
            console.log('data', data)
        })
        .catch( error => {
            console.log('error', error)
        })
}

registerForm && registerForm.addEventListener('submit', registration);
forgotPasswordForm && forgotPasswordForm.addEventListener('submit', restorePassword);
authForm && authForm.addEventListener('submit', login);
