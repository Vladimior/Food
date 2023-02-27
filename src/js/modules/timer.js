export function timer(id, deadline) {
// Timer
    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());
        if (t <= 0) {  //якщо дата вже пройшла встановимо нулі
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else { // розраховуємо дні, години, хвилини, секунди
            days = Math.floor( (t/(1000*60*60*24)) );
            seconds = Math.floor( (t/1000) % 60 );
            minutes = Math.floor( (t/1000/60) % 60 );
            hours = Math.floor( (t/(1000*60*60) % 24) );
        }

        return { // повертаємо (об'єкт) значення отриманої дати
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){ // якщо цифра менш як десять поставити перед нею нуль
        if (num >= 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) { //виводино данні на сторінку

        const timer = document.querySelector(selector), //отримуємо елементи зі сторінки
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000); // інтервал оновлення

        function updateClock() { // оновлюємо годинник відрахунку
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) { //вимкнення таймера коли вийде час
                clearInterval(timeInterval);
            }
        }
        updateClock();
    }

    setClock(id, deadline);
}
