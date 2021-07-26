# CUSTOM SELECT
<br>
Львиная часть времени ушла на работу с датами и их преобразование. До вчерашнего дня, с ними не работал напрямую. 
<br>Поэтому не успел сделать полную доступность интерфейсов. Только базовый вариант
<br>
Я бы лучше использовал moment.js, но в ТЗ указано чистый JS. Думаю изобрёл свой велосипед
<br>
Не успел сделать проверку на влияние текущего времни
<br>
Идея с loop для рендера времени, на мой взгляд не самая удачная. 


/*
<br>
загрузке страницы сделать запрос, отрендерить два селекта:
<br>
1. первый - дни, начинающиеся с двух заголовков - "Сегодня", "Завтра" и продолжающийся по числам. например, сегодня 29 июля, пятница. в первом селекте должны быть значения ["Сегодня", "Завтра", 31.07, 1.08, 2.08, ..., 12.08] (14 дней вперед).
<br>
2. второй - значения от поля start текущего дня, до значения end текущего дня c интервалом 15 минут. например - сегодня 31 июля, суббота, - значит, должно быть [10:00, 10:15, 10:30, 10:45, 11:00, ..., 20:30]
<br>
3. при смене дня второй селект должен пересчитываться
<br>
4. селекты должны быть кастомными - не нативный селект браузера, а отрисованные js
<br>
будет плюсом - на значения второго селекта влияет текущее время при рендере (если сейчас 10:15-10-29, то значения во втором селекте начинаются с 10:30, и т.д. можно не брать в расчет выход текущего времени за пределы времени (если сейчас час ночи, то показывать как обычно)
<br>
условия - es6, нативный js, модульная система, функциональный стиль
*/