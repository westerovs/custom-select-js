const createTempOptionTime = (time) => {
    const h = time.split(':')[0]
    const m = time.split(':')[1]
    
    return `<li tabindex="0" role="option"
                    class="select__option"
                    aria-label="выбрано время: ${ time }"
                    data-value="${ time }">${ h } : ${ m === ' 0' ? '00' : m}</li>`
}

export {
    createTempOptionTime
}
