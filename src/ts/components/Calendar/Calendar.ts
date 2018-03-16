import './calendar.scss';

// *******************************************

export default function WpwCalendarManager(settings: Object) {
    Object.keys(settings).forEach(key => {
        const elem = document.querySelector(`.${key}`);
        WpwCalendar(elem, settings[key]);
    });
}

function WpwCalendar(elem, setting) {

    const calendarClass = 'wpw-calendar';
    // these are labels for the days of the week
    const cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // these are human-readable month name labels, in order
    const cal_months_labels = ['January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'];

    // these are the days of the week for each month, in order
    const cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // this is the current date
    const cal_current_date = new Date();

    let month = (isNaN(setting.month) || setting.month == null) ? cal_current_date.getMonth() : setting.month;
    let year = (isNaN(setting.year) || setting.year == null) ? cal_current_date.getFullYear() : setting.year;
    let html = generateHTML(month, year, new Date(year, month, 1), calendarClass, cal_days_labels, cal_months_labels, cal_days_in_month);
    elem.innerHTML = html;

    const arrowPrev = elem.querySelector(`.wpw-calendar__arrow-prev`);
    const arrowNext = elem.querySelector(`.wpw-calendar__arrow-next`);

    const  update = updateHTML(elem);

    arrowPrev && arrowPrev.addEventListener('click', event => {
        month--;
        if(month < 0) {
            month = 11;
            year--;
        }
        update(month, year, new Date(year, month, 1), calendarClass, cal_days_labels, cal_months_labels, cal_days_in_month);
    });

    arrowNext && arrowNext.addEventListener('click', event => {
        month = month + 1 >= 12 ?  0 : month + 1;
        month++;
        if(month >= 12) {
            month = 0;
            year++;
        }
        update(month, year, new Date(year, month, 1), calendarClass, cal_days_labels, cal_months_labels, cal_days_in_month);
    });
}

function updateHTML(elem) {
    const title = elem.querySelector('.wpw-calendar__title');
    const tbody = elem.querySelector('.wpw-calendar__tbody');

    return (month, year, firstDay, calendarClass, cal_days_labels, cal_months_labels, cal_days_in_month) => {
        title.innerHTML = `${cal_months_labels[month]}&nbsp;${year}`;
        tbody.innerHTML = getTDTemplate(cal_days_in_month, firstDay, month, year, calendarClass)
    }
}

function generateHTML(month, year, firstDay, calendarClass, cal_days_labels, cal_months_labels, cal_days_in_month) {
    // get first day of month
    // var firstDay = new Date(year, month, 1);
    const startingDay = firstDay.getDay();

    // find number of days in month
    let monthLength = cal_days_in_month[month];

    // compensate for leap year
    if (month == 1) { // February only!
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            monthLength = 29;
        }
    }

    return `
    <div class="${calendarClass}">

        <div class="${calendarClass}__header">
            <div class="${calendarClass}__arrow ${calendarClass}__arrow-prev">Arrow</div>
            <div class="${calendarClass}__title">${cal_months_labels[month]}&nbsp;${year}</div>
            <div class="${calendarClass}__arrow ${calendarClass}__arrow-next">Arrow</div>
        </div>

        <div class="${calendarClass}__theader">
            ${cal_days_labels.reduce((string, item) => `${string}<div class="${calendarClass}__th">${item}</div>`, '')}
        </div>

        <div class="${calendarClass}__tbody">
            ${getTDTemplate(cal_days_in_month, firstDay, month, year, calendarClass)}
        </div>

    </div>
    `
}

function getTDTemplate(cal_days_in_month, firstDay, month, year, calendarClass) {

    const startingDay = firstDay.getDay();

    // find number of days in month
    let monthLength = cal_days_in_month[month];

    // compensate for leap year
    if (month == 1) { // February only!
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            monthLength = 29;
        }
    }
    // fill in the days
    let day = 1;
    let template = '';
    // this loop is for is weeks (rows)
    for (let i = 0; i < 9; i++) {
        // this loop is for weekdays (cells)
        template += `<div class=${calendarClass}__row>`
        for (let j = 0; j <= 6; j++) {
            template += `<div class="${calendarClass}__td">`;
            if (day <= monthLength && (i > 0 || j >= startingDay)) {
                template += day;
                day++;
            }
            template += '</div>';
        }
        // stop making rows if we've run out of days
        if (day > monthLength) {
            break;
        } else {
            template += '</div>';
        }
    }

    return template;
}

function getDataTemplate(array, className) {
    return array.reduce((string, item) => `${string}<div class="${className}">${item}</div>`, '')
}