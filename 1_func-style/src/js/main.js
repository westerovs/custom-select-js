import {getResponse} from './response.js'
import {render, findRemoveClass, getDay, getTimes} from './utils.js'

try {
    const allSelect = document.querySelectorAll('.select')
    
    const initSelects = (select, indexSelect) => {
        let type = null
        if (indexSelect === 0) type = 'days'
        if (indexSelect === 1) type = 'time'
        
        // common
        const selectList = select.querySelector('.select__list')
        const selectHeader = select.querySelector('.select__header')
        const optionReset = select.querySelector('.select__item--reset')
        const input = select.querySelector('.select__input')
        
        // time
        const selectTime = document.getElementById('select-time')
        const selectTimeHeader = selectTime.querySelector('.select__header')
        
        // активный по умолчанию: 1 - init сегодня, 2 - завтра и тд..
        const selected = 0
        let selectItems = null
        
        const createTemplateOption = (props, i) => {
            const { dayWeek, day, month, year, totalInfo, } = props
            const currentData = `${ day }.${ month }.${ year }`
            
            // 0 - сегодняшний день, 1 - следующий и тд...
            if (i === 0) {
                return `<li tabindex="0"
                        class="select__item"
                        aria-label="${ currentData }"
                        data-value="${ currentData }"
                        data-day="${ dayWeek }">сегодня</li>`
            }
            if (i === 1) {
                return `<li tabindex="0"
                        class="select__item"
                        aria-label="${ currentData }"
                        data-value="${ currentData }"
                        data-day="${ dayWeek }">завтра</li>`
            }
            
            return `<li tabindex="0"
                    class="select__item"
                    aria-label="выбрана дата: ${ totalInfo }"
                    data-value="${ currentData }"
                    data-day="${ dayWeek }">${ currentData }</li>`
        }
        
        const createTemplateOptionTime = (props, i) => {
            return `<li class="select__item">${ props }</li>`
        }
        
        const renderTimeOptions = async (day) => {
            await getResponse()
                .then(data => {
                    const startTime = data.time[day].start
                    const endTime = data.time[day].end
                    
                    getTimes(startTime, endTime)
                    // render ...
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
                            item.classList.add('select__item--selected')
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
            e.target.classList.add('select__item--selected')
            selectHeader.classList.add('select-checked')
            selectHeader.innerText = e.target.innerText
            
            // в input записываем дату с выбранного эл-та
            input.value = e.target.dataset.value
            console.log(`выбранный день: ${ input.value }`)
        }
        
        const clickOnOption = (e) => {
            if (!e.target.closest('.select__item')) return
            if (e.target.closest('.select__item--reset')) {
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
        
        const init = () => {
            renderDayOptions(type)
                .then(() => {
                    selectItems = select.querySelectorAll('.select__item')
                    setDefaultOption(selected)
                })
            setHandlers()
        }
        
        init()
    }
    
    allSelect.forEach(initSelects)
} catch (e) {
    console.log(e)
}
