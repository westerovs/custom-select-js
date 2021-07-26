const createTempOptionTime = (time) => {
    return `<li tabindex="0" role="option"
                    class="select__option"
                    aria-label="выбрано время: ${ time }"
                    data-value="${ time }">${ time }</li>`
}

export {
    createTempOptionTime
}
