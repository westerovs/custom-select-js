import {createTemplateOption} from './view/templateOption.js'
import {createTempOptionTime} from './view/tempOptionTime.js'
import {getResponse} from './response.js'
import {render, findRemoveClass, getDay, getTimes} from './utils.js'

const allSelect = document.querySelectorAll('.select')

const initSelects = (select, indexSelect) => {
    let typeOption = null
    if (indexSelect === 0) typeOption = 'days'
    if (indexSelect === 1) typeOption = 'time'
    
    // common
    const selectList = select.querySelector('.select__list')
    const selectHeader = select.querySelector('.select__header')
    const optionReset = select.querySelector('.select__option--reset')
    const input = select.querySelector('.select__input')
    
    // time
    const selectTime = document.getElementById('select-time')
    const selectTimeHeader = selectTime.querySelector('.select__header')
    const selectTimeList = selectTime.querySelector('.select__list')
    
    // активный по умолчанию: 1 - init сегодня, 2 - завтра и тд..
    const selected = 1
    let selectItems = null
    
    const renderTimeOptions = async (day) => {
        await getResponse()
            .then(data => {
                if (data.success && typeOption === 'days') {
                    const startTime = data.time[day].start
                    const endTime = data.time[day].end
    
                    const timeArr = getTimes(startTime, endTime)
    
                    selectTimeList.innerHTML = ''
                    timeArr.forEach(time => {
                        render(selectTimeList, createTempOptionTime(time))
                    })
                }
            })
    }
    
    const renderDayOptions = async (type) => {
        // на время загрузки показываем сообщение в 1м option
        const curText = optionReset.innerText
        optionReset.innerText = 'Loading...'

        await getResponse()
            .then(() => {
                if (type === 'days') {
                    // установить отображаемое количество дней в селекте
                    for (let i = 0; i < 15; i++) {
                        render(selectList, createTemplateOption(getDay(i), i))
                    }
                    optionReset.innerText = curText
                }
            })
    }
    
    const setDefaultOption = (defaultIndex) => {
        // устанавливает выбранный эл-т при старте
        if (typeof defaultIndex === 'number' && defaultIndex > 0) {
            Array.from(selectItems)
                .find((item, index) => {
                    if (defaultIndex === index) {
                        item.classList.add('select__option--selected')
                        selectHeader.innerText = item.innerText
                        selectHeader.classList.add('select-checked')
                        input.value = item.dataset.value
                        
                        const dayWeek = +item.dataset.day
                        renderTimeOptions(dayWeek)
                        unblockTimeSelect()
                    }
                })
        }
    }
    
    const setActiveClass = (e) => {
        // set class
        e.target.classList.add('select__option--selected')
        selectHeader.classList.add('select-checked')
        selectHeader.innerText = e.target.innerText
        
        // в input записываем дату с выбранного эл-та
        if (typeOption === 'days') {
            input.value = e.target.dataset.value
            console.log(`выбранный день: ${ input.value }`)
        }
        if (typeOption === 'time') {
            input.value = e.target.dataset.value
            console.log(`выбранное время: ${ input.value }`)
        }
        
    }
    
    const clickOnOption = (e) => {
        if (!e.target.closest('.select__option')) return
        if (e.target.closest('.select__option--reset')) {
            resetSelect()
            return
        }

        findRemoveClass(selectItems)
        
        setActiveClass(e)
        closeSelect()
        unblockTimeSelect()
        
        const dayWeek = +e.target.dataset.day
        renderTimeOptions(dayWeek)
    }
    
    const unblockTimeSelect = () => {
        selectTimeHeader.disabled = false
        selectTimeHeader.focus()
        selectTime.classList.remove('hide')
    }
    
    const openSelect = () => {
        select.classList.toggle('hide')
    }
    
    const closeSelect = (e) => {
        if (e) {
            if (e.key === 'Escape') select.classList.add('hide')
            if (e.target.closest('.select')) return
            select.classList.add('hide')
            return
        }
        
        select.classList.add('hide')
    }
    
    const resetSelect = () => {
        console.log('reset')
        selectHeader.classList.remove('select-checked')
        selectHeader.innerText = selectItems[0].innerText
        input.value = ''
        
        findRemoveClass(selectItems)
        closeSelect()
    }
    
    const setHandlers = () => {
        selectHeader.addEventListener('click', openSelect)
        document.addEventListener('click', closeSelect)
        select.addEventListener('keydown', closeSelect)
        selectList.addEventListener('click', clickOnOption)
    }

    const removeHandlers = () => {
        selectHeader.removeEventListener('click', openSelect)
        document.removeEventListener('click', closeSelect)
        select.removeEventListener('keydown', closeSelect)
        selectList.removeEventListener('click', clickOnOption)
    }

    const init = (selected) => {
        renderDayOptions(typeOption)
            .then(() => {
                selectItems = select.querySelectorAll('.select__option')
                setDefaultOption(selected)
            })
        setHandlers()
    }
    
    init(0)
}

allSelect.forEach(initSelects)

