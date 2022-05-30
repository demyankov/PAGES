let bookingWrapper = document.querySelector(".booking");
let bookingCardwrapper = document.querySelector(".booking-card-wrapper");
let bookingCloseCard = document.querySelector("#booking-card__close");
let bookingCancelCard = document.querySelector("#booking-close_btn");
let btnPrevious = document.querySelector("#btn_previous");
let btnNext = document.querySelector("#btn_next");
let bookingForm = document.querySelector("#booking-form");
let bookingDay = bookingForm.querySelectorAll(".booking__day");
let bookingTimes = bookingForm.querySelectorAll(".booking__times");
let countBookingDay = bookingDay.length;
let lastOpenBookingDay = countBookingDay;
let firstOpenBookingDay = 0;
let btnBooked = document.querySelector("#booking-submit_btn");
let inputConfidece = document.querySelector("#booking-card__confidence");
let inputPhone = document.querySelector("#phone");


// присваиваем data-id 
function writeDataId (){
  bookingDay.forEach((el, i)=>{
    el.setAttribute('data-id',i+1)
  })
  
  bookingTimes.forEach((el, i)=>{
    el.setAttribute('data-id',i+1)
  })  
  }
  
  writeDataId ()

  function createOption(select, value) {
    let option = document.createElement('option')
    option.innerText = value
    select.append(option)
  }

// РАБОТА С ФОРМОЙ БРОНИРОВАНИЯ
bookingWrapper.addEventListener("click", (e) => {
  let el = e.target.closest(".booking__times-item");
  // открытие формы бронирования
  if (el && !el.className.includes("booked")) {
    bookingCardwrapper.classList.toggle("booking-active");
    html.style.overflow = "hidden";

    // заполнене формы бронирования
    let gameDate = bookingCardwrapper.querySelector('#game-date')
    
    //запонение даты и времени игры в карточке бронирования
    let dateValue = el.getAttribute('data-time')
    dateValue ? gameDate.innerText = dateValue : gameDate.innerText = 'Дата игры не установлена'

    //заполнение количества игроков и тарифов
    let tariffsSelect = bookingCardwrapper.querySelector('#players')
      // createOption(tariffsSelect)



  } else {
    html.style.overflow = "auto";
  }
});

bookingCloseCard.addEventListener("click", () => {
  html.style.overflow = "auto";
  bookingCardwrapper.classList.remove("booking-active");
});

bookingCancelCard.addEventListener("click", () => {
  html.style.overflow = "auto";
  bookingCardwrapper.classList.remove("booking-active");
});

let costGame = document.querySelector("#cost-game");
let modeSelect = document.querySelector(".mode-select");

modeSelect.addEventListener("change", () => {
  costGame.innerText = modeSelect.value;
});

// РАБОТА С ОТОБРАЖЕНИЕМ РАСПИСАНИЯ
if (bookingDay.length > 7) {
  for (let i = 7; i < bookingDay.length; i++) {
    bookingDisplayNone(i);
  }
  lastOpenBookingDay = 6;
}

btnNext.addEventListener("click", () => {
  if (bookingDay.length > 7 && lastOpenBookingDay !== countBookingDay - 1) {
    for (let i = 0; i <= lastOpenBookingDay; i++) {
      bookingDisplayNone(i);
    }

    let startOpen = lastOpenBookingDay + 1;
    let endOpen = lastOpenBookingDay + 8;

    for (let i = startOpen; i < endOpen; i++) {
      if (i < countBookingDay) {
        firstOpenBookingDay++;
        lastOpenBookingDay++;
        bookingDisplayFlex(i);
      }
    }
  }
});

btnPrevious.addEventListener("click", () => {
  if (lastOpenBookingDay >= 7) {
    for (let i = firstOpenBookingDay; i <= lastOpenBookingDay; i++) {
      bookingDisplayNone(i);
    }

    let startOpen = firstOpenBookingDay - 7;
    let endOpen = lastOpenBookingDay - 7;

    console.log(startOpen);
    console.log(endOpen);
    if (startOpen >= 0) {
      for (let i = startOpen; i <= endOpen; i++) {
        firstOpenBookingDay--;
        lastOpenBookingDay--;
        bookingDisplayFlex(i);
      }
    }

    if (startOpen < 0) {
      firstOpenBookingDay = 0;
      lastOpenBookingDay = 6;

      for (let i = 0; i <= 6; i++) {
        bookingDisplayFlex(i);
      }
    }
  }
});

function bookingDisplayNone(i) {
  bookingDay[i].style.display = "none";
  bookingTimes[i].style.display = "none";
}

function bookingDisplayFlex(i) {
  bookingDay[i].style.display = "flex";
  bookingTimes[i].style.display = "flex";
}

//ЗАБРОНИРОВАТЬ
inputConfidece.addEventListener("input", () => {
  activateBtnSubmit();
});

inputPhone.addEventListener("input", () => {
  activateBtnSubmit();
});

function activateBtnSubmit() {
  console.log(inputConfidece.checked);
  console.log(inputPhone.value);
  if (inputConfidece.checked && inputPhone.value) {
    btnBooked.classList.remove("submit_btn");
    btnBooked.classList.add("submit_btn-active");
    btnBooked.disabled = false;
  } else {
    btnBooked.classList.add("submit_btn");
    btnBooked.classList.remove("submit_btn-active");
    btnBooked.disabled = true;
  }
}


