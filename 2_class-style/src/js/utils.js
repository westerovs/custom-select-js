// функция принимает старт и end и рендерит интервалы от текущего времени
const getTimes = (start, end) => {
    console.log(start, end)
}

const getDay = (dayIncrement = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + dayIncrement);
    
    const totalInfo = new Date(`${ (date.getMonth() + 1) }, ${ date.getDate() }, ${ date.getFullYear() }`);
    
    return  {
        dayWeek: date.getDay(),
        day: date.getDate().toString().padStart(2, '0'),
        month: (date.getMonth() + 1).toString().padStart(2, '0'),
        year: date.getFullYear(),
        totalInfo
    }
}

export {
    getDay
}
