const sliders = document.querySelectorAll('.main-slider-element')
let positions = [0, 200, -200]

window.addEventListener('load', ()=>{
    for (let i=0; i < 3; i++) {
        if (positions[i] !=0){
            sliders[i].style.opacity = 0
        } else {
            sliders[i].style.opacity = 1
        }
        sliders[i].style.left = positions[i] + "%"
    }
})

function changePosition(positions){
    return [positions[2], positions[0], positions[1]]
}

const interval = setInterval(() => {
    positions = changePosition(positions)
    for (let i=0; i < 3; i++) {
        if (positions[i] !=0){
            sliders[i].style.opacity = 0
        } else {
            sliders[i].style.opacity = 1
        }
        sliders[i].style.left = positions[i] + "%"
    }
}, 5000)