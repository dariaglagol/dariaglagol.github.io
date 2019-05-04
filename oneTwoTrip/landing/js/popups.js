(function(){
    const yieldContainer = document.querySelector('.yield__price-list-wrapper');
    const popupNode = document.querySelector('#popup').content.querySelector('.popup-wrapper');
    const aviaNode = document.querySelector('#yield-avia').content;
    const railwaysNode = document.querySelector('#yield-railways').content;
    const hotelsNode = document.querySelector('#yield-hotels').content;
    const certificateNode = document.querySelector('#yield-certificates').content;
    const substrate = document.querySelector('.substrate');
    const certificateLinkDesktop = document.querySelector('.yield__certificate-link');

    const body = document.querySelector('body');

    const popup = popupNode.cloneNode(true);

    function handleOpenVerticalPopups(e) {
        const item = e.target;
        const itemParent = item.parentElement;
        const itemId = item.hasAttribute('id')
            ? item.getAttribute('id') : itemParent.hasAttribute('id')
            ? itemParent.getAttribute('id') : null;
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

            popup.classList.add('popup-wrapper--yield-popup');

            yieldContainer.appendChild(popup);

            const closeMenuBtn = popup.querySelector('.popup__btn--close');
            closeMenuBtn.addEventListener('click', handleCloseVerticalPopups);
        }

        if(item === certificateLinkDesktop) {
            body.style.overflow = 'hidden';
            substrate.classList.remove('substrate--closed');
            substrate.classList.add('substrate--in-popup');

            if(popup.children[1]) {
                popup.removeChild(popup.children[1])
            }

            popup.appendChild(verticalsMap['certificate']);
            yieldContainer.appendChild(popup);
            const closeMenuBtn = popup.querySelector('.popup__btn--close');
            closeMenuBtn.addEventListener('click', handleCloseVerticalPopups);
        }
    }

    function handleCloseVerticalPopups() {
        const popup = document.querySelector('.popup-wrapper');
        const closeMenuBtn = popup.querySelector('.popup__btn--close');

        substrate.classList.add('substrate--closed');
        substrate.classList.remove('substrate--in-popup');
        body.style.overflow = 'auto';
        closeMenuBtn.removeEventListener('click', handleCloseVerticalPopups);
        yieldContainer.addEventListener('click', handleOpenVerticalPopups);
        popup.remove();
    }

    yieldContainer.addEventListener('click', handleOpenVerticalPopups);
    certificateLinkDesktop.addEventListener('click', handleOpenVerticalPopups);
})();
