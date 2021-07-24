// найти и удалить класс. Если есть length - значит это коллекция.
const findClearActiveClass = (node, className = 'select__item--selected') => {
    if (node.length) {
        Array.from(node).find(item => item.classList.remove(`${ className }`))
    } else {
        node.classList.remove(`${ className }`)
    }
}

const render = (container, template, place = 'beforeend') => {
    if (container instanceof Element) {
        container.insertAdjacentHTML(place, template)
    }
}

export {
    render,
    findClearActiveClass
}
