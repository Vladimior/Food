export function openModal(modalSelector, modalTimerId) { // відкриття модального вікна
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}
export function closeModal(modalSelector) { // закриваємо модальне вікно
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}
export function modal(triggerSelector, modalSelector, modalTimerId) {
    // Modal
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);



    modalTrigger.forEach(btn => { // перебираємо всі отримані кнопки й відкриваємо модальне вікно
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e) => { // закриваємо модальне вікно якщо клацнути на підложку
        if (e.target === modal || e.target.getAttribute('data-close') === '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => { // закриваємо модальне вікно якщо клацнути на ескейп
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() { // відкриваємо модальне вікно якщо догортали до кінця сторінки
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}
