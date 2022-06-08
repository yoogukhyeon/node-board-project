const clock = document.getElementById('MyClockDisplay');
const clockFirst = clock.querySelector('.first')
const clockSecond = clock.querySelector('.second')
const clockThird = clock.querySelector('.third')

function getClock(){
    const date = new Date();
    const hours = String(date.getHours()).padStart(2 , "0")
    const min = String(date.getMinutes()).padStart(2 , "0")
    const sec = String(date.getSeconds()).padStart(2 , "0")
    clockFirst.innerText = `${hours} :`
    clockSecond.innerText = `${min} : `
    clockThird.innerText = `${sec}`
}


getClock()

setInterval(getClock , 1000)