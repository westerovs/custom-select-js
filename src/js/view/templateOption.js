const createTemplateOption = (props, i) => {
    const { dayWeek, day, month, year, totalInfo, } = props
    const currentData = `${ day }.${ month }.${ year }`
    
    // 0 - сегодняшний день, 1 - следующий и тд...
    if (i === 0) {
        return `<li tabindex="0" role="option"
                        class="select__option"
                        aria-label="${ currentData }"
                        data-value="${ currentData }"
                        data-day="${ dayWeek }">сегодня</li>`
    }
    if (i === 1) {
        return `<li tabindex="0" role="option"
                        class="select__option"
                        aria-label="${ currentData }"
                        data-value="${ currentData }"
                        data-day="${ dayWeek }">завтра</li>`
    }
    
    return `<li tabindex="0" role="option"
                    class="select__option"
                    aria-label="выбрана дата: ${ totalInfo }"
                    data-value="${ currentData }"
                    data-day="${ dayWeek }">${ currentData }</li>`
}

export {
    createTemplateOption
}
