const render = (container, template, place = 'beforeend') => {
    if (container instanceof Element) {
        container.insertAdjacentHTML(place, template)
    }
}

const findRemoveClass = (node, className = 'select__option--selected') => {
    Array.from(node).find(item => item.classList.remove(`${ className }`))
}

const getDay = (dayIncrement = 0, hourIncrement) => {
    const date = new Date();
    date.setDate(date.getDate() + dayIncrement);
    
    const totalInfo = new Date(`${ (date.getMonth() + 1) }, ${ date.getDate() }, ${ date.getFullYear() }`);
    
    return {
        dayWeek: date.getDay(),
        day: +date.getDate().toString().padStart(2, '0'),
        month: +(date.getMonth() + 1).toString().padStart(2, '0'),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        year: date.getFullYear(),
        totalInfo
    }
}

const getSplitTime = (time) => {
    return {
        h: +time.split(':')[0],
        m: +time.split(':')[1],
    }
}

// функция принимает старт и end и рендерит интервалы от текущего времени
const getTimes = (start, end) => {
    console.log(`Диапазон выбранного дня: от ${ start }, до ${ end }`)
    
    // получаем текущую дату
    const { year, month, day } = getDay()
    // задаем дату старта
    const { h: hourStart, m: minStart } = getSplitTime(start)
    // задаем дату end
    const { h: hourEnd, m: minEnd } = getSplitTime(end)
    
    let dateStart = new Date(year, month, day, hourStart, minStart);
    let dateEnd = new Date(year, month, day, hourEnd, minEnd);
    console.warn( dateStart );
    console.warn( dateEnd );
}

export {
    render,
    findRemoveClass,
    getDay,
    getTimes,
}
