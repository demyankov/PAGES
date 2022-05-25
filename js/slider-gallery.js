// let slidePreviewWrapper
let slideCollection

window.addEventListener('load',()=>{
    let slidePreviewWrapper = document.querySelector('.flex-control-nav')
    slideCollection = slidePreviewWrapper.querySelectorAll('li')
    let slidePreviewFocus = slidePreviewWrapper.getElementsByClassName('flex-active')
    let buttonNext = document.querySelector('.flex-next')
    let buttonPrevious = document.querySelector('.flex-prev')

    slideCollection.forEach ((el, i)=>{
        el.setAttribute('data-id', i+1)}
    )

    
    buttonNext.addEventListener('click',(e)=> {
        slidePreviewFocus = slidePreviewWrapper.querySelector('.flex-active')
        moveImages (slidePreviewWrapper, slidePreviewFocus)     
    })

    buttonPrevious.addEventListener('click',(e)=> {
        slidePreviewFocus = slidePreviewWrapper.querySelector('.flex-active')
        moveImages (slidePreviewWrapper, slidePreviewFocus)
    })
    
    let btnAllPhoto = document.querySelector('#btn-all-photo') 
         btnAllPhoto.addEventListener('click',()=>{
        slidePreviewWrapper.classList.toggle('flex-control-nav-all') 
        slidePreviewWrapper.className.includes('flex-control-nav-all')
        ?btnAllPhoto.querySelector('span').innerText = 'Скрыть все'
        :btnAllPhoto.querySelector('span').innerText = 'Посмотреть все'
    })
}
)

function moveImages (wrapper, slideFocus) {  
    let focusId =  +slideFocus.closest('li').getAttribute('data-id')

	let activeSlidePosition = {
		left: window.pageXOffset + slideFocus?.getBoundingClientRect().left,
        right: window.pageXOffset + slideFocus?.getBoundingClientRect().right,
	}

	let wrapperPosition = {
		left: window.pageXOffset + wrapper.getBoundingClientRect().left,
        right: window.pageXOffset + wrapper.getBoundingClientRect().right,
	}    

	if (activeSlidePosition?.right>wrapperPosition?.right) {   
            slideCollection.forEach((el)=>{ 
                el.style.transform = `translateX(${-(focusId-1)*100}%)`
            }) 
            } else if (activeSlidePosition?.left<wrapperPosition?.left) { 
                slideCollection.forEach((el)=>{ 
                el.style.transform = `translateX(${-(focusId-1)*100}%)`            
            })
          
	}
}







