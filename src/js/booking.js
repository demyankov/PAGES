
let bookingWrapper = document.querySelector('.booking')
let bookingCardwrapper = document.querySelector('.booking-card-wrapper')
let bookingCloseCard = document.querySelector('#booking-card__close')
let bookingCancelCard = document.querySelector('#booking-close_btn')

bookingWrapper.addEventListener('click', (e)=>{
    e.target.closest('.booking__times-item')
    ? bookingCardwrapper.classList.toggle('booking-active')
    :null

}
)

bookingCloseCard.addEventListener('click', ()=>{
    bookingCardwrapper.classList.remove('booking-active')
})

bookingCancelCard.addEventListener('click', ()=>{
    bookingCardwrapper.classList.remove('booking-active')
})