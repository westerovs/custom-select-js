/*
Возможности:
- Открытие
- загрузка данных с сервера по нажатию на селект

- Закрытие (если ткнуть вне меню )
- Выбранный по умолчанию item по индексу ( подсветка его )
- получать текущее значение выбранного элемента
- очистить select
- уничтожить select

// доп:
- Количество показанных item
*/
import {getResponse} from './response.js'

class Select {
    constructor(props) {
        this.select = document.getElementById(`${ props.id }`)
        this.selectList = this.select.querySelector('.select__list')
        this.selectHeader = document.querySelector('.select__header')
        
        this.selectItems = null
        this.selected = props.selected
    }
    
    findRemoveClass = (node, className = 'select__item--selected') => {
        Array.from(node).find(item => item.classList.remove(`${ className }`))
    }
    
    render = (container, template, place = 'beforeend') => {
        if (container instanceof Element) {
            container.insertAdjacentHTML(place, template)
        }
    }
    
    renderOptions = async () => {
        await getResponse()
            .then(data => {
                if (data.success) {
                    data.days.forEach(day => this.render(this.selectList, this.createTemplateOption(day)))
                    // this.selectItems = this.select.querySelectorAll('.select__item')
                }
            })
    }
    
    createTemplateOption = (i) => {
        if (i === 0) i = 'сегодня'
        if (i === 1) i = 'завтра'
        
        return `<li tabindex="0" class="select__item">${ i }</li>`
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

    setActiveOption = (e) => {
        if (!e.target.closest('.select__item')) return
        if (e.target.closest('.select__item--reset')) {
            this.resetSelect()
            return
        }
    
        this.findRemoveClass(this.selectItems)
    
        this.selectHeader.innerText = e.target.innerText
        e.target.classList.add('select__item--selected')
        this.selectHeader.classList.add('select-checked')
        this.closeSelect()
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
    
        this.findRemoveClass(this.selectItems)
        this.closeSelect()
    }
    
    setHandlers = () => {
        this.selectHeader.addEventListener('click', this.openSelect)
        
        document.addEventListener('click', this.closeSelect)
        this.select.addEventListener('keydown', this.closeSelect)
        
        this.selectList.addEventListener('click', this.setActiveOption)
    }
    
    init = () => {
        this.renderOptions()
            .then(() => {
                this.selectItems = this.select.querySelectorAll('.select__item')
                this.setDefaultOption(this.selected)
            })
        this.setHandlers()
    }
}

const wrapper = document.querySelector('.wrapper')

const select = new Select({
    id: 'select-day',
    selected: 1
})
select.init()
