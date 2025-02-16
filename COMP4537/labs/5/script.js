import { messages } from "./lang/message/en/user.js";

document.addEventListener("DOMContentLoaded", ()=> {
    const samplePatientsText = document.getElementById("samplePatients")
    const insertPatientsDataText = document.getElementById("insertBtn")
    const executeQueryText = document.getElementById("executeQuery")
    const selectOrInsertText = document.getElementById("selectOrInsert")
    const responseAreaContainer = document.getElementById("responseCard")
    const responseArea = document.getElementById("response")
    const SERVER_URL = "https://oyster-app-ysyip.ondigitalocean.app/COMP4537/labs/5/api/v1/sql/"

    samplePatientsText.value = Object.entries(messages.SAMPLE_PATIENTS)
        .map(([name, dob]) => `${name}: ${dob}`)
        .join("\n")

    insertPatientsDataText.textContent = messages.INSERT_PATIENT_DATA
    executeQueryText.textContent = messages.EXECUTE_QUERY
    selectOrInsertText.textContent = messages.SELECT_OR_INSERT

    document.getElementById("insertBtn").addEventListener("click", () => {
        const samplePatientsData = Object.entries(messages.SAMPLE_PATIENTS)
            .map((([name, dob]) => (`${name}, ${dob}`)))
            .join(",")

        const query = `INSERT INTO patients (name, dob) VALUES ${samplePatientsData};`

        fetch(SERVER_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({query})
        })
        .then(response => response.json())
        .then(data => {
            responseAreaContainer.classList.remove("d-none")
            responseArea.textContent = data
        })
        .catch(err => {
            console.log(err)
            responseAreaContainer.classList.remove("d-none")
            responseArea.textContent = messages.UNABLE_TO_INSERT_DATA
        })
    })

    document.getElementById("executeQuery").addEventListener("click", () => {
        const query = document.getElementById("queryInput").value.trim()

        if (query.toUpperCase().startsWith("SELECT")) {
            fetch(`${SERVER_URL}?query=${encodeURIComponent(query)}`)
                .then(response => response.text())
                .then(data => {
                    responseAreaContainer.classList.remove("d-none")
                    responseArea.textContent = data
                })
                .catch(err => {
                    console.log(err)
                    responseAreaContainer.classList.remove("d-none")
                    responseArea.textContent = messages.UNABLE_TO_FETCH_DATA
                })
        } else if (query.toUpperCase().startsWith("INSERT")) {
            fetch(SERVER_URL, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({query})
            })
            .then(response => response.text())
            .then(data => {
                responseAreaContainer.classList.remove("d-none")
                responseArea.textContent = data
            })
            .catch(err => {
                console.log(err)
                responseAreaContainer.classList.remove("d-none")
                responseArea.textContent = messages.UNABLE_TO_INSERT_DATA
            })
        } else {
            responseAreaContainer.classList.remove("d-none")
            responseArea.classList.add("text-danger")
            responseArea.textContent = messages.INVALID_REQUEST
        }
    })
})