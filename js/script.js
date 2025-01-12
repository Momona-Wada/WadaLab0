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

        gameManager.clearButtons()
        gameManager.clearMessages()

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
    constructor(number, color){
        this.number = number
        this.color = color
        this.element = this.createButton(color)
    }

    createButton(color) {
        const button = document.createElement("button")
        button.style.height = "5em"
        button.style.width = "10em"
        button.style.backgroundColor = color
        button.textContent = this.number

        const buttonContainer = document.getElementById("buttonContainer")
        buttonContainer.appendChild(button)

        return button
    }
}

class GameManager {
    constructor() {
        this.validator = new Validator(MIN_BUTTONS, MAX_BUTTONS)
        this.originalColors = [
            "#FFC1CC", 
            "#A7C7E7", 
            "#B2F2BB", 
            "#E6E6FA", 
            "#FFDAB9", 
            "#FFFACD", 
            "#FCE883"  
            ]
        this.colors = [...this.originalColors]
        this.buttons = []
    }

    start(numberButtons) {
        this.clearButtons()

        this.colors = [...this.originalColors]

        for (let i = 1; i <= numberButtons; i++) {
            const button = new Button(i, this.getRandomColor())
            this.buttons.push(button)
        }
    }

    clearButtons(){
        const buttonContainer = document.getElementById("buttonContainer")
        buttonContainer.innerHTML = ""
        this.buttons = []
    }

    clearMessages() {
        const messageContainer = document.getElementById("messageContainer")
        messageContainer.innerHTML = ""
    }

    getRandomColor() {
        const randomIndex = Math.floor(Math.random() * this.colors.length)
        const color = this.colors[randomIndex]
        this.colors.splice(randomIndex, 1)
        return color
    }

    
}


