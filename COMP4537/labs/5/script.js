import { messages } from "./lang/message/en/user.js";

document.addEventListener("DOMContentLoaded", ()=> {
    const samplePatientsText = document.getElementById("samplePatients")
    const insertPatientsDataText = document.getElementById("insertBtn")
    const executeQueryText = document.getElementById("executeQuery")
    const selectOrInsertText = document.getElementById("selectOrInsert")

    samplePatientsText.textContent = Object.entries(messages.SAMPLE_PATIENTS)
        .map(([name, dob]) => `${name}: ${dob}`)
        .join("\n")

    insertPatientsDataText.textContent = messages.INSERT_PATIENT_DATA
    executeQueryText.textContent = messages.EXECUTE_QUERY
    selectOrInsertText.textContent = messages.SELECT_OR_INSERT
})