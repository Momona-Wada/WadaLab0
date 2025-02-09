import { messages } from "./lang/message/en/user.js";

document.addEventListener("DOMContentLoaded", function() {
    const wordInput = document.getElementById("wordInput")
    const searchButton = document.querySelector(".btn-search")
    const resultArea = document.getElementById("resultArea")
    const resultWord = document.getElementById("resultWord")
    const resultDefinition = document.getElementById("resultDefinition")
    const resultRequestNumber = document.getElementById("resultRequestNum")
    const errorMessage = document.getElementById("errorMessageContainer")

    const title = document.getElementById("titleSearch")
    title.textContent = messages.SEARCH_TITLE

    const searchForWordText = document.getElementById("searchWord")
    searchForWordText.textContent = messages.SEARCH_FOR_WORD

    const wordText = document.getElementById("word")
    wordText.textContent = messages.WORD

    const searchButtonText = document.getElementById("searchButton")
    searchButtonText.textContent = messages.SEARCH_BUTTON

    const goToStorePageText = document.getElementById("goToStore")
    goToStorePageText.textContent = messages.GO_TO_STORE_PAGE

    searchButton.addEventListener("click", function() {
        const word = wordInput.value.trim()
        errorMessage.innerText = ""
        resultWord.innerText = "";
        resultDefinition.innerText = "";
        resultRequestNumber.innerText = "";
        resultArea.classList.add("d-none");

        if (!word) {
            errorMessage.innerText = messages.MISSING_WORD
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
                console.log(response)

                resultArea.classList.remove("d-none")
                
                if (response.status == "success") {
                    const definition = response.message
                    
                    if (!definition || definition.trim() === "") {
                        resultWord.innerText = messages.NOT_FOUND
                        resultDefinition.innerText = `${word} ${messages.IS_NOT_IN_DICTIONARY}`
                    } 
                    else {
                        resultWord.innerText = word
                        resultDefinition.innerText = definition
                    }
                } else {
                    resultWord.innerText = messages.NOT_FOUND
                    resultDefinition.innerText = `${word} ${messages.IS_NOT_IN_DICTIONARY}`
                }
            }
            else if (xhttp.status === 404) {
                const response = JSON.parse(xhttp.responseText)
                console.log(response)

                resultArea.classList.remove("d-none");
                resultRequestNumber.innerText = `${messages.REQUEST_NUM} ${response.numberOfRequests}`;
                resultWord.innerText = messages.NOT_FOUND;
                resultDefinition.innerText = `${word} ${messages.IS_NOT_IN_DICTIONARY}`;
                wordInput.value = ""
            }
            else {
                resultWord.innerText = messages.ERROR;
                resultDefinition.innerText = messages.FAILED_TO_GET_DEFINITION;
            }
        }
        xhttp.send()
    })
})