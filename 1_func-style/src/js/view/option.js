const createTemplateOption = (i) => {
    if (i === 0) i = 'сегодня'
    if (i === 1) i = 'завтра'
    
    return `<li tabindex="0" class="select__item">${ i }</li>`
}

export {
    createTemplateOption
}
