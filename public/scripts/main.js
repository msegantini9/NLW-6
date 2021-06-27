import Modal from './modal.js'

const modal = Modal()

const modalTitle = document.querySelector(".modal h2")
const modalDescription = document.querySelector(".modal p")
const modalButton = document.querySelector(".modal .buttons button")
const sendButton = document.querySelector("#question-form button")
const userId = document.querySelector("#userId").dataset.id
const roomId = document.querySelector("#room-id").dataset.id


//Pegar todos o botões que existem com a classe check
const checkButtons = document.querySelectorAll(".actions.questions a.check")
const deleteButtons = document.querySelectorAll(".actions.questions .delete")
const answerDeleteButtons = document.querySelectorAll("#answers .actions a.delete")

console.log(answerDeleteButtons)
console.log(deleteButtons)
console.log(checkButtons)
console.log(userId)

answerDeleteButtons.forEach(button => {
    button.addEventListener("click", (event) => handleClick(event, "answerDelete"))
})

checkButtons.forEach(button => {
    //adicionar a escuta
    button.addEventListener("click", (event) => handleClick(event, "check"))
})

deleteButtons.forEach(button => {
    button.addEventListener("click", (event) => handleClick(event, "delete"))
})

function handleClick(event, action = "check"){
    event.preventDefault()
    const text = action == "check" ? "Marcar como lida" : "Excluir"
    let slug = ""

    if(action == "check"){
        slug = "check"
    } else if(action == "delete"){
        slug = "delete"
    } else{
        slug = "answerDelete"
    }

    const questionId = event.target.dataset.id

    const form = document.querySelector(".modal form")
    form.setAttribute("action", `/question/${roomId}/${userId}/${questionId}/${slug}`)

    modalTitle.innerHTML = `${text} esta pergunta`
    modalDescription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`
    modalButton.innerHTML = `Sim, ${text.toLowerCase()}`

    action = "check" ? modalButton.classList.remove("red") : modalButton.classList.add("red")

    //abrir modal
    modal.open()
}