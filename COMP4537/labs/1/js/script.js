import { messages } from "../lang/messages/en/user.js"

document.addEventListener("DOMContentLoaded", () => {
    const title = document.getElementById("title")
    title.textContent = messages.LAB_1_TITLE

    const name = document.getElementById("name")
    name.textContent = messages.MY_NAME

    const writerBtn = document.getElementById("writer")
    writerBtn.textContent = messages.GO_TO_WRITER_PAGE

    const readerBtn = document.getElementById("reader")
    readerBtn.textContent = messages.GO_TO_READER_PAGE
})

