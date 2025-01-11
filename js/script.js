import { messages } from "../lang/messages/en/user.js";
const MIN_BUTTONS = 3
const MAX_BUTTONS = 7

document.addEventListener("DOMContentLoaded", () => {
    const label = document.getElementById("labelText")
    label.textContent = messages.HOW_MANY_BUTTONS

    const goButton = document.getElementById("goButton")
    goButton.textContent = messages.GO_BUTTON

    const gameManager = new GameManager()
    goButton.addEventListener("click", () => {
        const input = document.getElementById("numberInput").value
        const errorMessage = document.getElementById("messageContainer")

        if (gameManager.validator.isValidInput(Number(input))) {
            errorMessage.textContent = ""
            gameManager.start(Number(input))
        } else {
            errorMessage.textContent = gameManager.validator.getErrorMessage()
        }
    })
})

class Validator {
    constructor(min, max) {
        this.min = min
        this.max = max
    }
    
    isValidInput(number) {
        return number >= this.min && number <= this.max
    }

    getErrorMessage() {
        return messages.INVALID_INPUT
    }
}

class Button {
    constructor(number){
        this.number = number
        this.element = this.createButton()
    }

    createButton() {
        const button = document.createElement("button")
        button.style.height = "5rem"
        button.style.width = "10em"
        button.style.backgroundColor = this.getRandomColor()

        const buttonContainer = document.getElementById("buttonContainer")
        buttonContainer.appendChild(button)

        return button
    }

    getRandomColor() {
        const colors = ["red", "blue", "yellow", "green", "purple", "pink", "orange"]
        const randomIndex = Math.floor(Math.random() * colors.length)
        console.log(colors[randomIndex])
        return colors[randomIndex]
    }
}

class GameManager {
    constructor() {
        this.validator = new Validator(MIN_BUTTONS, MAX_BUTTONS)
        this.buttons = []
    }

    start(numberButtons) {
        this.clearButtons()

        for (let i = 1; i <= numberButtons; i++) {
            const button = new Button(i)
            this.buttons.push(button)
        }
    }

    clearButtons(){
        const buttonContainer = document.getElementById("buttonContainer")
        buttonContainer.innerHTML = ""
        this.buttons = []
    }
}


