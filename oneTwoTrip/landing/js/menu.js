const openMenuBtn = document.querySelector('.user-menu__btn--open');
const closeMenuBtn = document.querySelector('.user-menu__btn--close');
const menu = document.querySelector('.user-menu__mobile');
const substrate = document.querySelector('.substrate');

function handleOpenMenuBtn() {
    menu.classList.remove('user-menu__mobile--close');
    menu.classList.add('user-menu__mobile--open');
    substrate.classList.remove('substrate--closed');

    closeMenuBtn.addEventListener('click', handleCloseMenuBtn);
    openMenuBtn.removeEventListener('click', handleOpenMenuBtn);
};

function handleCloseMenuBtn() {
    menu.classList.remove('user-menu__mobile--open');
    menu.classList.add('user-menu__mobile--close');
    substrate.classList.add('substrate--closed');

    openMenuBtn.addEventListener('click', handleOpenMenuBtn);
    closeMenuBtn.removeEventListener('click', handleCloseMenuBtn);
}

openMenuBtn.addEventListener('click', handleOpenMenuBtn);

