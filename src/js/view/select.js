const createTemplateSelect = (title) => {
    return `
        <div class="select hide">
            <button class="select__header">${ title }</button>

            <ul class="select__list">
                <li tabindex="0" class="select__item select__item--clear">${ title }</li>
            </ul>
            <input type="text" name="select__input" value="" class="visually-hidden">
        </div>`
}

export {
    createTemplateSelect
}
