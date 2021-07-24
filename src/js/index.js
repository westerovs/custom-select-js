const actions = document.querySelector('.actions')

actions.addEventListener('click', e => {
    switch (e.target.dataset.type) {
        case 'open':
            // select.open()
            break
        case 'close':
            // select.close()
            break
        case 'destroy':
            // select.destroy()
            break
        case 'get':
            // if (select.selectedItem) {
            //     printDataToLog('#log', select.selectedItem.label)
            // }
            break
        case 'set':
            // select.selectByIndex(5)
            break

        case 'clear':
            // select.clear()
            break

        default:
            break
    }
})






























//
//
// const select = document.querySelector('.select')
// const selectHeader = select.querySelector('.select__header')
//
//
// const openSelect = () => {
//     select.classList.toggle('hide')
// }
//
// const closeSelect = () => {
//     select.classList.toggle('hide')
// }
//
//
//
//
//
// const init = () => {
//     selectHeader.addEventListener('click', openSelect)
// }
//
// init()
//




































// const render = (container, template, place = 'beforeend') => {
//     if (container instanceof Element) {
//         container.insertAdjacentHTML(place, template)
//     }
// }
