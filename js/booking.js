
// let html = document.querySelector('html')
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



