/*
Возможности:
- Открытие
- загрузка данных с сервера по нажатию на селект

- Закрытие (если ткнуть вне меню )
- Количество показанных item
- Выбранный по умолчанию item по индексу ( подсветка его )
- получать текущее значение выбранного элемента
- очистить select
- уничтожить select
* */

const select = document.querySelector('.select')
const selectHeader = select.querySelector('.select__header')
const selectItems = select.querySelectorAll('.select__item')

const open = () => {
    select.classList.toggle('hide')
}

const close = (e) => {
    if (e.target.closest('.select')) return
    select.classList.add('hide')
}

const setDefaultIndex = (index) => {
    Array.from(selectItems).find((item, i) => {
        if (i === index) item.classList.add('select__item--selected')
    })
}

const createSelect = (defaultIndex ) => {
    selectHeader.addEventListener('click', open)
    document.addEventListener('click', close)
    setDefaultIndex(defaultIndex)
}

createSelect(2)


