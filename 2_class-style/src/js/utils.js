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

const currentDate = new Date
const DAYS = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
];

const date = new Date();
const currentDay = date.getDay();
// console.log(currentDay)

const getCurrentDayValue = () => {
    const response = Object.entries(responseDays)
    
    response.forEach((item, index) => {
        switch (item[0]) {
            case 'saturday':
                console.log('вск', item)
                break
            case 'monday':
                console.log('monday', item)
                break
            case 'tuesday':
                console.log('tuesday', item)
                break
            case 'wednesday':
                console.log('wednesday', item)
                break
            case 'thursday':
                console.log('thursday', item)
                break
            case 'friday':
                console.log('friday', item)
                break
        }
    })
}

getCurrentDayValue()


// функция принимает старт и end и рендерит интервалы от текущего времени
const getIntervalTime = (start, end) => {
    console.log(start, end)
}

export {
    getIntervalTime
}
