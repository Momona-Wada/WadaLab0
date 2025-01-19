/*
* This code is partially reviewed with ChatGPT
*/
import { messages } from "../lang/messages/en/user.js"


document.addEventListener("DOMContentLoaded", () => {
    const backBtn = document.getElementById("backButton")
    backBtn.textContent = messages.BACK

    showSavedNotes()

    window.addEventListener("storage", () => {
        showSavedNotes()
    })

    setInterval(showSavedNotes, 2000)

})

function showSavedNotes() {
    const noteContainer = document.getElementById("savedNotesContainer")
    noteContainer.className = "d-flex flex-column gap-2"
    noteContainer.innerHTML = ""

    const savedNotes = JSON.parse(localStorage.getItem("notes"))
    savedNotes.forEach(noteData => {
        const noteText = document.createElement("textarea")
        noteText.textContent = noteData.text
        noteText.className = "form-control"

        noteContainer.appendChild(noteText)
    })
    const updatedTime = new Date().toLocaleTimeString()
    const updatedTimeContainer = document.getElementById("updateTimeContainer")
    updatedTimeContainer.textContent = `${messages.UPDATED_AT}:${updatedTime}`
}