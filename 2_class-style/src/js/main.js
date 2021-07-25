import {getResponse} from './response.js'
import {getDay} from './utils.js'

class Select {
    constructor(props) {
        this.select = document.getElementById(`${ props.id }`)
        
        // time
        this.selectTime = document.getElementById('select-time')
        this.selectTimeHeader = this.selectTime.querySelector('.select__header')
        this.selectTimeList = this.select.querySelector('.select__list')
    
        // common
        this.selectList = this.select.querySelector('.select__list')
        this.selectHeader = this.select.querySelector('.select__header')
        this.optionReset = this.select .querySelector('.select__item--reset')
        this.input = this.select.querySelector('.select__input')
        
        this.typeSelect = props.type

        this.selectItems = null
        this.selected = props.selected
    }
    
    createTemplateOption = (props, i) => {
        const { dayWeek, day, month, year, totalInfo, } = props
        // console.log(dayWeek)
        // if (i === 0) i = 'сегодня'
        // if (i === 1) i = 'завтра'
        
        return `<li tabindex="0" class="select__item" aria-label="">${ day }.${ month }.${ year }</li>`
    }
    
    render = (container, template, place = 'beforeend') => {
        if (container instanceof Element) {
            container.insertAdjacentHTML(place, template)
        }
    }
    
    renderDayOptions = async () => {
        // на время загрузки показываем сообщение в 1м option
        this.curText = this.optionReset.innerText
        this.optionReset.innerText = 'Loading...'
        
        await getResponse()
            .then(() => {
                // установить отображаемое количество дней в селекте
                for (let i = 0; i < 15; i++) {
                    this.render(this.selectList, this.createTemplateOption(getDay(i), i))
                }
                this.optionReset.innerText = this.curText
            })
    }
    
    findRemoveClass = (node, className = 'select__item--selected') => {
        Array.from(node).find(item => item.classList.remove(`${ className }`))
    }
    
    setDefaultOption = (defaultIndex) => {
        if (typeof defaultIndex === 'number' && defaultIndex > 0) {
            Array.from(this.selectItems)
                .find((item, index) => {
                    if (defaultIndex === index) {
                        item.classList.add('select__item--selected')
                        this.selectHeader.innerText = item.innerText
                        this.selectHeader.classList.add('select-checked')
                    }
                })
        }
    }

    checkoutActiveOption = (e) => {
        if (!e.target.closest('.select__item')) return
        if (e.target.closest('.select__item--reset')) {
            this.resetSelect()
            return
        }
    
        this.findRemoveClass(this.selectItems)
    
        this.selectHeader.innerText = e.target.innerText
        this.input.value = e.target.innerText
        
        e.target.classList.add('select__item--selected')
        this.selectHeader.classList.add('select-checked')
        this.closeSelect()
        
        this.unblockTimeSelect()
    }
    
    unblockTimeSelect = async () => {
        this.selectTimeHeader.disabled = false
    }
    
    openSelect = () => {
        this.select.classList.toggle('hide')
    }

    closeSelect = (e) => {
        if (e) {
            if (e.key === 'Escape') this.select.classList.add('hide')
            if (e.target.closest('.select')) return
            this.select.classList.add('hide')
            return
        }
    
        this.select.classList.add('hide')
    }

    resetSelect = () => {
        this.selectHeader.classList.remove('select-checked')
        this.selectHeader.innerText = this.selectItems[0].innerText
        this.input.value = ''
    
        this.findRemoveClass(this.selectItems)
        this.closeSelect()
    }
    
    setHandlers = () => {
        this.selectHeader.addEventListener('click', this.openSelect)
        
        document.addEventListener('click', this.closeSelect)
        this.select.addEventListener('keydown', this.closeSelect)
        
        this.selectList.addEventListener('click', this.checkoutActiveOption)
    }
    
    init = () => {
        this.renderDayOptions()
            .then(() => {
                this.selectItems = this.select.querySelectorAll('.select__item')
                this.setDefaultOption(this.selected)
            })
        this.setHandlers()
    }
}

const wrapper = document.querySelector('.wrapper')

const selectDay = new Select({
    id: 'select-day',
    type: 'days',
    selected: 0
})
selectDay.init()

// const selectTime = new Select({
//     id: 'select-time',
//     type: 'time',
//     selected: 0
// })
// selectTime.init()
