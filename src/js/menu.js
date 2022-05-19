"use strict"

let button = document.querySelector('#button-burger')
let wrapper = document.querySelector('#wrapper')
let banner = document.querySelector('#banner')

button.addEventListener('click',()=>{
    wrapper.classList.toggle('menu-active')
    banner.classList.toggle('menu-active')
})

