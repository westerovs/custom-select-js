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

* */

// ================ utils
function setActiveClass(element, index, className = 'select__item--selected') {
    element[index].classList.add(`${ className }`)
}

function setActiveClass(element, index, className = 'select__item--selected') {
    element[index].classList.add(`${ className }`)
}

// document.querySelectorAll('.select__item').forEach((item, index, arr) => {
//     item.addEventListener('click', () => {
//         if (item.classList.contains('select__item--selected')) return
//
//         const currentItem = index
//         console.log(currentItem)
//         findClearActiveClass(arr)
//         setActiveClass(arr, currentItem)
//     })
// })
//
//

const select = document.querySelector('.select')
const selectHeader = select.querySelector('.select__header')
const selectList = select.querySelector('.select__list')
const selectItems = selectList.querySelectorAll('.select__item')

const open = () => {
    select.classList.toggle('hide')
}

const close = (e) => {
    if (e) {
        if (e.key === 'Escape') select.classList.add('hide')
        if (e.target.closest('.select')) return
        select.classList.add('hide')
    }
    
    select.classList.add('hide')
}

const findClearActiveClass = (elements, className = 'select__item--selected') => {
    Array.from(elements).find(item => item.classList.remove(`${ className }`))
}

const setDefaultIndex = (index) => {
    Array.from(selectItems).find((item, i) => {
        if (i === index) {
            item.classList.add('select__item--selected')
            selectHeader.innerText = item.innerText
        }
    })
}

const checkoutItem = (e) => {
    if (!e.target.closest('li')) return
    
    findClearActiveClass(selectItems)
    e.target.classList.add('select__item--selected')
    selectHeader.innerText = e.target.innerText
    close()
}

const createSelect = (defaultIndex = 3) => {
    selectHeader.addEventListener('click', open)
    document.addEventListener('click', close)
    document.addEventListener('keydown', close)
    
    selectList.addEventListener('click', checkoutItem)
    setDefaultIndex(defaultIndex)
}

const destroySelect = () => {
    select.remove()
}

createSelect()


