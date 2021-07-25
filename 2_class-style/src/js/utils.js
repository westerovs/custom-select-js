const responseDays = {
    "monday": {
        "start": "10:00",
        "end": "23:00"
    },
    "tuesday": {
        "start": "11:00",
        "end": "22:30"
    },
    "wednesday": {
        "start": "12:00",
        "end": "22:00"
    },
    "thursday": {
        "start": "13:00",
        "end": "21:30"
    },
    "friday": {
        "start": "14:00",
        "end": "21:00"
    },
    "saturday": {
        "start": "15:00",
        "end": "20:30"
    },
    "sunday": {
        "start": "16:00",
        "end": "20:00"
    }
}

const date = new Date();
const currentDay = date.getDay();

const getDays = () => {
    // ставил воскресенье в начало, для удобной синхронизации дней с new Date.
    // т.к там начало недели в воскресение
    const response = Object.entries(responseDays);
    const sunday = response.pop()
    response.unshift(sunday)
    
    let currentDayObj = null
    
    response.forEach((item, index) => {
        if (index === currentDay) {
            currentDayObj = item[1]
        }
    })
    
    return currentDayObj
}

let dayTime = getDays()

console.log(dayTime)

// функция принимает старт и end и рендерит интервалы от текущего времени
const getTimes = (start, end) => {
    console.log(start, end)
}

export {
    getTimes
}
