import {getResponse} from './response.js'
import {render, findClearActiveClass} from './utils.js'
import {createTemplateSelect} from './view/select.js'
import {createTemplateOption} from './view/option.js'

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

// =======================================
// ========= render select ===============
// =======================================
const renderOptions = (selectList) => {
    getResponse()
        .then(data => {
            if (data.success) {
                data.days.forEach(day => render(selectList, createTemplateOption(day)))
            }
        })
}


const renderSelect = (container, title) => {
    render(container, createTemplateSelect(`${ title }`))
    
    const select = document.querySelector('.select')
    const selectHeader = select.querySelector('.select__header')
    const selectList = select.querySelector('.select__list')
    
    renderOptions(selectList)
}




// const select = document.querySelector('.select')
// const selectHeader = select.querySelector('.select__header')
// const selectList = select.querySelector('.select__list')


// renderOptions()
//
// const selectItems = selectList.querySelectorAll('.select__item')
// const selectItemClear = select.querySelector('.select__item--clear')
//
// const openSelect = () => {
//     select.classList.toggle('hide')
// }
//
// const closeSelect = (e) => {
//     if (e) {
//         if (e.key === 'Escape') select.classList.add('hide')
//         if (e.target.closest('.select')) return
//         select.classList.add('hide')
//     }
//
//     select.classList.add('hide')
// }
//
// const clearSelect = () => {
//     selectHeader.classList.remove('select-checked')
// }
//
// const setDefaultIndex = (index = 0) => {
//     if (index > 0) {
//         Array.from(selectItems).find((item, i) => {
//             if (i === index) {
//                 item.classList.add('select__item--selected')
//                 selectHeader.innerText = item.innerText
//                 selectHeader.classList.add('select-checked')
//             }
//         })
//     }
// }
//
// const setActiveOption = (e) => {
//     if (!e.target.closest('.select__item')) return
//     if (!e.target.closest('.select__item--clear')) {
//         selectHeader.classList.add('select-checked')
//     }
//
//     findClearActiveClass(selectItems)
//     selectHeader.innerText = e.target.innerText
//     closeSelect()
// }
//
// const addedHandlers = () => {
//     selectHeader.addEventListener('click', openSelect)
//     selectList.addEventListener('click', setActiveOption)
//     selectItemClear.addEventListener('click', clearSelect)
//     document.addEventListener('click', closeSelect)
//     document.addEventListener('keydown', closeSelect)
// }
//
// const destroySelect = () => {
//     select.remove()
// }
//
// const createSelect = (defaultIndex ) => {
//     addedHandlers()
//     setDefaultIndex(defaultIndex)
// }
//
// createSelect()

// setTimeout(() => destroySelect(), 1000)




const wrapper = document.querySelector('.wrapper')
renderSelect(wrapper, 'Выбрать день')
renderSelect(wrapper, 'Выбрать время')
