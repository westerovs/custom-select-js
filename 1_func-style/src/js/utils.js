const render = (container, template, place = 'beforeend') => {
    if (container instanceof Element) {
        container.insertAdjacentHTML(place, template)
    }
}

const findRemoveClass = (node, className = 'select__item--selected') => {
    Array.from(node).find(item => item.classList.remove(`${ className }`))
}

const getDay = (dayIncrement = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + dayIncrement);
    
    const totalInfo = new Date(`${ (date.getMonth() + 1) }, ${ date.getDate() }, ${ date.getFullYear() }`);
    
    return  {
        dayWeek: date.getDay(),
        day: date.getDate().toString().padStart(2, '0'),
        month: (date.getMonth() + 1).toString().padStart(2, '0'),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        year: date.getFullYear(),
        totalInfo
    }
}

// функция принимает старт и end и рендерит интервалы от текущего времени
const getTimes = (start, end) => {
    console.log(`Диапазон выбранного дня: от ${ start }, до ${ end }`)
}

export {
    render,
    findRemoveClass,
    getDay,
    getTimes,
}
