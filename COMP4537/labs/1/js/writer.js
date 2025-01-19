/*
* This code is partially reviewed with ChatGPT
*/
import { messages } from "../lang/messages/en/user.js"

document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.getElementById("addButton")
    addBtn.textContent = messages.ADD

    const backBtn = document.getElementById("backButton")
    backBtn.textContent = messages.BACK

    const notesContainer = document.getElementById("notesContainer")

    addBtn.addEventListener("click", () => {
        const note = new Note(notesContainer)
    })
    setInterval(saveNotes, 2000)
})

function saveNotes() {
    const notes = Array.from(document.querySelectorAll("textarea")).map(textarea => textarea.value)
    let jsonNotes = JSON.stringify(notes)
    localStorage.setItem("notes", jsonNotes)

    const saveTime = new Date().toLocaleTimeString()
    document.getElementById("saveTime").textContent = `${messages.STORED_AT}: ${saveTime}`
}

class Note {
    constructor(container) {
        this.container = container
        this.wrapper = null
        this.createNote()
    }
    createNote() {
        this.wrapper = document.createElement("div")
        this.wrapper.className = "d-flex flex-nowrap py-2 gap-2"

        const textArea = document.createElement("textarea")
        textArea.className = "form-control"

        const removeBtn = document.createElement("button")
        removeBtn.textContent = messages.REMOVE
        removeBtn.className = "btn btn-warning"

        removeBtn.addEventListener("click", () => {
            this.removeNote()
        })

        this.wrapper.appendChild(textArea)
        this.wrapper.appendChild(removeBtn)
        this.container.appendChild(this.wrapper)
    }

    removeNote() {
        if (this.wrapper) {
            this.wrapper.remove()
            saveNotes()
        }
    }
}
