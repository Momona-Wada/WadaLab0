/*
* This code is partially reviewed with ChatGPT
*/
import { messages } from "../lang/messages/en/user.js"
import { Button } from "./button.js"

document.addEventListener("DOMContentLoaded", () => {
    const addBtnContainer = document.getElementById("addButton")
    const backBtnContainer = document.getElementById("backButton")
    const notesContainer = document.getElementById("notesContainer")

    const addBtn = new Button(addBtnContainer, messages.ADD, "btn-primary")
    addBtn.addClickListener(() => {
        const note = new Note(notesContainer)
    })

    const backBtn = new Button(backBtnContainer, messages.BACK, "btn-danger")
    backBtn.addClickListener(() => {
        location.href = "index.html"
    })

    const savedNotes = JSON.parse(localStorage.getItem("notes")) || []
    savedNotes.forEach(noteData => {
        const note = new Note(notesContainer)
        note.wrapper.querySelector("textarea").value = noteData.text
        note.wrapper.querySelector("textarea").dataset.id = noteData.id
    })

    setInterval(saveNotes, 2000)
})

function saveNotes() {
    const notes = Array.from(document.querySelectorAll("textarea")).map(textarea => {
        return {
            id: textarea.dataset.id,
            text: textarea.value
        }
    })
    let jsonNotes = JSON.stringify(notes)
    localStorage.setItem("notes", jsonNotes)

    const saveTime = new Date().toLocaleTimeString()
    document.getElementById("saveTime").textContent = `${messages.STORED_AT}: ${saveTime}`
}

let noteIdCounter = 1
class Note {
    constructor(container) {
        this.container = container
        this.id = noteIdCounter++
        this.wrapper = null
        this.createNote()
    }
    createNote() {
        this.wrapper = document.createElement("div")
        this.wrapper.className = "d-flex flex-nowrap py-2 gap-2"

        const textArea = document.createElement("textarea")
        textArea.className = "form-control"
        textArea.dataset.id = this.id

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

