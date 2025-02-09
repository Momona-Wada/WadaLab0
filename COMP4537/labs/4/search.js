const {messages} = require("./lang/message/en/user.js")

document.addEventListener("DOMContentLoaded", function() {
    const wordInput = document.getElementById("wordInput")
    const searchButton = document.querySelector(".btn-search")
    const resultArea = document.getElementById("resultArea")
    const resultWord = document.getElementById("resultWord")
    const resultDefinition = document.getElementById("resultDefinition")

    searchButton.addEventListener("click", function() {
        const word = wordInput.value.trim()

        if (!word) {
            resultDefinition.innerText = messages.MISSING_WORD
            return
        }

        const xhttp = new XMLHttpRequest()
        xhttp.open("GET", `https://oyster-app-ysyip.ondigitalocean.app/COMP4537/labs/4/api/definitions?word=${word}`, true)

        xhttp.onreadystatechange = function () {
            if (xhttp.readyState !== 4) {
                return
            } 
            
            if (xhttp.status == 200) {
                const response = JSON.parse(xhttp.responseText)

                resultArea.classList.remove("d-none")
    
                if (response.message) {
                    resultWord.innerText = messages.NOT_FOUND
                    resultDefinition.innerText = response.message //たつがmessage持ってるか確認
                } else if (!response.definition || response.definition.trim() === "") {
                    resultWord.innerText = messages.NOT_FOUND
                    resultDefinition.innerText = `${word} ${messages.IS_NOT_IN_DICTIONARY}`
                } 
                else {
                    resultWord.innerText = `${messages.WORD}: ${word}`
                    resultDefinition.innerText = `${messages.DEFINITION}: ${response.definition}`
                }
            }
            else {
                resultWord.innerText = messages.ERROR
                resultDefinition.innerText = messages.FAILED_TO_GET_DEFINITION
            }
        }
        xhttp.send()
    })
})