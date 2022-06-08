let currentTitle = document.getElementById('current-year-month')
let calendarBody = document.getElementById('calendar-body')
let prevBtn = document.getElementById('prev');
let nextBtn = document.getElementById('next');

prevBtn.addEventListener('click' , prev);
nextBtn.addEventListener('click' , next);



//오늘날짜 
let today = new Date();
//달력 첫번쨰 날 
let first = new Date(today.getFullYear() , today.getMonth() , 1);
let dayList = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let monthList = ['January','February','March','April','May','June','July','August','September','October','November','December'];
let leapYear=[31,29,31,30,31,30,31,31,30,31,30,31];
let notLeapYear=[31,28,31,30,31,30,31,31,30,31,30,31];

let pageFirst = first;
let pageYear;


//윤년 구분하기
if(first.getFullYear() % 4 === 0){
    pageYear = leapYear
}else{
    pageYear = notLeapYear
}

function showCalendar(){
    let monthCnt = 100;
    let cnt = 1;


    for(let i = 0; i < 6; i++){
        let $tr = document.createElement('tr');
        $tr.setAttribute('id' , monthCnt);
        for(let j = 0; j < 7; j++){
            if((i === 0 && j < first.getDay()) || cnt > pageYear[first.getMonth()]){
                let $td = document.createElement('td');
                let $div = document.createElement('div');
                $td.setAttribute('class' , 'pt-6')
                $div.setAttribute('class' , 'px-2 py-2 cursor-pointer flex w-full justify-cente');
                $td.appendChild($div)
                $tr.appendChild($td);
            }else{
                let $td = document.createElement('td');
                let $div = document.createElement('div');
                $div.textContent = cnt
                $td.setAttribute('class' , 'pt-6')
                $div.setAttribute('class' , 'px-2 py-2 cursor-pointer flex w-full justify-cente');
                $div.setAttribute('id' , cnt);
                $td.appendChild($div)
                $tr.appendChild($td);

                cnt++
            }   
        }
        monthCnt++;
        calendarBody.appendChild($tr)
    }
}


showCalendar();





function removeCalendar(){
    let catchTr = 100;
    for(var i = 100; i< 106; i++){
        var $tr = document.getElementById(catchTr);
        $tr.remove();
        catchTr++;
    }
}


var clickedDate1 = document.getElementById(today.getDate());
clickedDate1.classList.add('active');


function prev(){

    if(pageFirst.getMonth() === 1){
        pageFirst = new Date(first.getFullYear()-1 , 12 , 1);
        first = pageFirst;
        if(first.getFullYear() % 4 === 0){
            pageYear = leapYear
        }else{
            pageYear = notLeapYear;
        }
    }else{
        pageFirst = new Date(first.getFullYear() , first.getMonth() -1 , 1);
        first = pageFirst;
    }

    today = new Date(today.getFullYear(), today.getMonth()-1, today.getDate());
    currentTitle.innerHTML = monthList[first.getMonth()] + '&nbsp' + first.getFullYear()

    removeCalendar();
    showCalendar();

    clickedDate1 = document.getElementById(today.getDate());
    clickedDate1.classList.add('active');  
}


function next(){
    if(pageFirst.getMonth() === 12){
        pageFirst = new Date(first.getFullYear()+1 , 1 , 1);
        first = pageFirst;
        if(first.getFullYear() % 4 === 0){
            pageYear = leapYear
        }else{
            pageYear = notLeapYear;
        }
    }else{
        pageFirst = new Date(first.getFullYear(), first.getMonth()+1, 1);
        first = pageFirst;
    }

    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    currentTitle.innerHTML = monthList[first.getMonth()] + '&nbsp' + first.getFullYear()
    removeCalendar();
    showCalendar();
    
    clickedDate1 = document.getElementById(today.getDate());
    clickedDate1.classList.add('active'); 
}

function showMain(){
    currentTitle.innerHTML = 'Today ' + monthList[first.getMonth()] + '&nbsp' + first.getFullYear()
    
}

showMain()


var tdGroup = [];
function clickStart(){
    for(let i = 1; i <= pageYear[first.getMonth()]; i++){
        tdGroup[i] = document.getElementById(i);
        tdGroup[i].addEventListener('click',changeToday);
    }
}

function changeToday(e){
    for(let i = 1; i <= pageYear[first.getMonth()]; i++){
        if(tdGroup[i].classList.contains('active')){
            tdGroup[i].classList.remove('active');
        }
    }
    clickedDate1 = e.currentTarget;
    clickedDate1.classList.add('active');
    today = new Date(today.getFullYear(), today.getMonth(), clickedDate1.id);
    showMain();
    keyValue = today.getFullYear() + '' + today.getMonth()+ '' + today.getDate();

}

clickStart()

