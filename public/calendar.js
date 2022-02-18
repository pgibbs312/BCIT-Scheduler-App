import {isWeekend, getDayName} from "./date-getter.js";
const calendar = document.querySelector("#app-calendar");
const month = document.querySelector("#month")
const week = document.querySelector("#week")
let value = 31;
month.addEventListener('click', function(event) {
    value = 31
    console.log(value)
    // clear div elements
    calendar.innerHTML = "";
    for (let day = 1; day <= value; day++) { 
        const weekend = isWeekend(day);
        const dayName = getDayName(day);
        calendar.insertAdjacentHTML("beforeend", `<div class="day ${weekend ? "weekend" : ""}"><div class="name">${dayName}<div>${day}</div`);
     }
})
week.addEventListener('click', function(event) {
    value = 7
    console.log(value)
    // clear div elements
    calendar.innerHTML = "";
    for (let day = 1; day <= value; day++) { 
        const weekend = isWeekend(day);
        const dayName = getDayName(day);
        calendar.insertAdjacentHTML("beforeend", `<div class="day ${weekend ? "weekend" : ""}"><div class="name">${dayName}<div>${day}</div`);
     }
})
// default view
for (let day = 1; day <= value; day++) { 
    const weekend = isWeekend(day);
    const dayName = getDayName(day);
    calendar.insertAdjacentHTML("beforeend", `<div class="day ${weekend ? "weekend" : ""}"><div class="name">${dayName}<div>${day}</div`);
 }