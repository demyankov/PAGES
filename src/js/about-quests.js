let app = document.querySelectorAll('.about-quests__image-wrap')

function visible (target, number) {
	let targetPosition = {
		top:window.pageYOffset + target.getBoundingClientRect().top,
		bottom:window.pageYOffset + target.getBoundingClientRect().bottom,
	}

	let windowsPosition = {
		top:window.pageYOffset,	
		bottom:window.pageYOffset + document.documentElement.clientHeight,
	}

	if (targetPosition?.bottom >windowsPosition?.top &&
		targetPosition?.top < windowsPosition?.bottom) {
            shake (target)
	} else {
        clearInterval()
        if (number%2===0) {         
            target.style.transform = `translate(-100%) scale(1) rotate(0)`
        } else {
            console.log(number)
            target.style.transform = `translate(100%) scale(1) rotate(0)`}
	} 
}

window.addEventListener('onload',()=>{
	app.forEach((element, index)=>{
        visible (element, index)
 })
})

window.addEventListener('scroll',()=> {
	app.forEach((element, index)=>{
       visible (element, index)  
    })
})

function shake (target) {    
    target.style.transform = `translate(0) scale(${1+(Math.random()-0.5)/10}) rotate(${(Math.random()-0.5)*4}deg)`
}




