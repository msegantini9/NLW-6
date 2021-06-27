const nightMode = document.getElementById("night-mode")
const body = document.querySelector(".body")
const bg = document.querySelector("#bg")
const logo = document.getElementById("logo")

console.log(nightMode)

if(nightMode.checked){
    body.classList.add("night-mode")
    logo.src = "/images/logo-white.svg"
} else if(!nightMode.checked){
    body.classList.remove("night-mode")
    logo.src = "/images/logo.svg"
}
nightMode.addEventListener('click', () => {
    if(nightMode.checked){
        body.classList.add("night-mode")
        logo.src = "/images/logo-white.svg"
    } else if(!nightMode.checked){
        body.classList.remove("night-mode")
        logo.src = "/images/logo.svg"
    }
})