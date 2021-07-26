export const getResponse = async () => {
    try {
        const response = await fetch('https://private-c6a57b-selects1.apiary-mock.com/work-hours')
        
        return await response.json().then(data => {
            if (data.success) {
                const success = data.success
                const days = Object.entries(data.results).map(day => day[0])
                const time = Object.entries(data.results).map(time => time[1])
    
                // ставил воскресенье в начало, для удобной синхронизации дней с new Date.
                // т.к там начало недели в воскресение
                const sunday = days.pop()
                days.unshift(sunday)
                
                return {
                    success,
                    days,
                    time
                }
            }
        })
    } catch (e) {
        console.log(e)
    }
}

