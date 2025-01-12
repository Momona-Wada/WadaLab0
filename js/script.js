import { messages } from "../lang/messages/en/user.js";
const MIN_BUTTONS = 3
const MAX_BUTTONS = 7
const SCRAMBLE_INTERVAL = 2000
const BUTTON_HEIGHT = "5em"
const BUTTON_WIDTH = "10em"

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
        button.style.height = BUTTON_HEIGHT
        button.style.width = BUTTON_WIDTH
        button.style.backgroundColor = color
        button.textContent = this.number

        const buttonContainer = document.getElementById("buttonContainer")
        buttonContainer.appendChild(button)

        return button
    }

    setRandomPosition() {
        const maxX = window.innerWidth - this.element.offsetWidth
        const maxY = window.innerHeight - this.element.offsetHeight

        const randomX = Math.random() * maxX
        const randomY = Math.random() * maxY

        this.element.style.position = "absolute"
        this.element.style.left = `${randomX}px`
        this.element.style.top = `${randomY}px`

    }

    hideNumber() {
        this.element.textContent = ""
    }

    showNumber() {
        this.element.textContent = this.number
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
        this.isGameOver = false
        this.currentBtnId = 1
    }

    start(numberInput) {
        this.clearButtons()

        this.colors = [...this.originalColors]

        for (let i = 1; i <= numberInput; i++) {
            const button = new Button(i, this.getRandomColor())
            this.buttons.push(button)
        }

        setTimeout(() => {
            this.scrambleButtons(numberInput)
        }, numberInput * 1000)

    }

    scrambleButtons(numberInput) {
        let count = 0

        const scrambleInterval = setInterval(() => {
            count++
            this.scrambleAllButtons()

            if (count >= numberInput) {
                clearInterval(scrambleInterval)

                setTimeout(() => {
                    this.memoryTest()
                }, 1000)
            }
        }, SCRAMBLE_INTERVAL)
    }

    scrambleAllButtons() {
        this.buttons.forEach(btn => {
            btn.setRandomPosition()
        })
    }

    memoryTest() {
        this.buttons.forEach(btn => {
            btn.hideNumber()
            btn.element.onclick = () => {
                this.handleButtonClick(btn)
            }
        })
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

    handleButtonClick(clickedBtn) {
        if (clickedBtn.number !== this.currentBtnId) {
            this.endGame(false)
            return
        }

        clickedBtn.showNumber()
        this.currentBtnId++

        if (this.currentBtnId > this.buttons.length) {
            this.endGame(true)
        } 
    }

    endGame(isCorrect) {
        const messageContainer = document.getElementById("messageContainer")

        if (isCorrect) {
            messageContainer.textContent = messages.CORRECT_ORDER
        } else {
            messageContainer.textContent = messages.WRONG_ORDER
            this.buttons.forEach(btn => {
                btn.showNumber()
            })
        }
        this.isGameOver = true

        this.buttons.forEach(btn => {
            btn.element.onclick = null
        })
    }
}


