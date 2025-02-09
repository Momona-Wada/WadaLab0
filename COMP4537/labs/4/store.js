// This code is assisted by chatGPT
import { messages } from "./lang/message/en/user.js";


document.addEventListener("DOMContentLoaded", function() {
    const wordInput = document.getElementById("wordInput")
    const definitionInput = document.getElementById("definitionInput")
    const addButton = document.querySelector(".btn-add")
    const missingWord = document.getElementById("wordErrorMessageContainer")
    const missingDefinition = document.getElementById("definitionErrorMessageContainer")

    addButton.addEventListener("click", function() {
        const word = wordInput.value.trim()
        const definition = definitionInput.value.trim()

        if (!word) {
            missingWord.innerText = messages.MISSING_WORD
            return
        }

        if (!definition) {
            missingDefinition.innerText = messages.MISSING_DEFINITION
            return
        }

        if (!word && !definition) {
            missingWord.innerText = messages.MISSING_WORD
            missingDefinition.innerText = messages.MISSING_DEFINITION
            return
        }

        // const data = JSON.stringify({word, definition})
        // console.log(data)

        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "https://oyster-app-ysyip.ondigitalocean.app/COMP4537/labs/4/api/definitions", true)
        xhttp.setRequestHeader("Content-Type", "application/json")


        xhttp.onreadystatechange = function () {
            if (xhttp.readyState !== 4) {
                return
            }
            if(xhttp.status === 200)
                {
                const response = JSON.parse(xhttp.responseText)
                alert(response.message)
                wordInput.value = ""
                definitionInput.value = ""
            } else {
                alert(messages.FAILED_TO_ADD_WORD)
            }
        }
        const data = JSON.stringify({"word": word, "definition": definition})
        xhttp.send(data)
    })
})