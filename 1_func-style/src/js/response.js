export const getResponse = async () => {
    try {
        const response = await fetch('https://private-c6a57b-selects1.apiary-mock.com/work-hours')
        
        return await response.json().then(data => {
            return {
                success: data.success,
                days: Object.entries(data.results).map(day => day[0]),
                time: Object.entries(data.results).map(time => time[1])
            }
        })
    } catch (e) {
        console.log(e)
    }
}
