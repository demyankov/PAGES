
// РАБОТА С ФОРМОЙ БРОНИРОВАНИЯ

let bookingWrapper = document.querySelector('.booking')
let bookingCardwrapper = document.querySelector('.booking-card-wrapper')
let bookingCloseCard = document.querySelector('#booking-card__close')
let bookingCancelCard = document.querySelector('#booking-close_btn')

bookingWrapper.addEventListener('click', (e)=>{
    let el = e.target.closest('.booking__times-item')  
   if (el && !el.className.includes('booked')) {
    bookingCardwrapper.classList.toggle('booking-active')
    html.style.overflow = 'hidden'
   } else{
       html.style.overflow = 'auto'
}
}
)

bookingCloseCard.addEventListener('click', ()=>{
    html.style.overflow = 'auto'
    bookingCardwrapper.classList.remove('booking-active')
    
})

bookingCancelCard.addEventListener('click', ()=>{
    html.style.overflow = 'auto'
    bookingCardwrapper.classList.remove('booking-active')
})


let costGame = document.querySelector('#cost-game')
let modeSelect = document.querySelector('.mode-select')

modeSelect.addEventListener('change',()=>{
    costGame.innerText = modeSelect.value
})

// РАБОТА С ОТОБРАЖЕНИЕМ РАСПИСАНИЯ 
let btnPrevious = document.querySelector('#btn_previous')
let btnNext = document.querySelector('#btn_next')
let bookingForm = document.querySelector('#booking-form')
let bookingDay = bookingForm.querySelectorAll('.booking__day')
let bookingTimes = bookingForm.querySelectorAll('.booking__times')
let countBookingDay = bookingDay.length
let lastOpenBookingDay = countBookingDay
let firstOpenBookingDay = 0

if (bookingDay.length>7) { 
    for (let i=7; i<bookingDay.length;i++) {
        bookingDisplayNone (i)
    }    
    lastOpenBookingDay = 6
}

btnNext.addEventListener('click',()=>{
    if (bookingDay.length>7 && lastOpenBookingDay!==countBookingDay-1) {
        for (let i=0; i<=lastOpenBookingDay;i++) {
            bookingDisplayNone (i)
        }
        
        let startOpen = lastOpenBookingDay+1
        let endOpen = lastOpenBookingDay+8
       
        for (let i = startOpen; i<endOpen;i++) {
            if (i<countBookingDay){  
                firstOpenBookingDay++
                lastOpenBookingDay++
                bookingDisplayFlex (i)
            }
    }}
})

btnPrevious.addEventListener('click',()=>{
    if (lastOpenBookingDay>=7) {
        for (let i = firstOpenBookingDay; i<=lastOpenBookingDay;i++) {
            bookingDisplayNone (i)
          }
    
    let startOpen = firstOpenBookingDay-7
    let endOpen = lastOpenBookingDay-7

    console.log(startOpen)
    console.log(endOpen)
    if (startOpen>=0){
        for (let i = startOpen; i<=endOpen;i++) {
            firstOpenBookingDay--
            lastOpenBookingDay--
            bookingDisplayFlex (i)
        } 
    }
       
    if (startOpen<0){
        firstOpenBookingDay = 0
        lastOpenBookingDay = 6

        for (let i = 0; i<=6;i++) {
            bookingDisplayFlex (i)
        }  
    }
    }
})

function bookingDisplayNone (i) {
    bookingDay[i].style.display = 'none'
    bookingTimes[i].style.display = 'none'
}

function bookingDisplayFlex (i) {
    bookingDay[i].style.display = 'flex'
    bookingTimes[i].style.display = 'flex'
}




