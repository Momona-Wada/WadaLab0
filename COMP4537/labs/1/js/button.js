// This code is partially reviewed with ChatGPT

export class Button {
    constructor(container, label, className) {
        this.container = container
        this.label = label
        this.className = className
        this.button = null
        this.createButton()
    }

    createButton() {
        this.button = document.createElement("div")
        this.button.textContent = this.label
        this.button.className = this.className
        this.container.appendChild(this.button)
    }

    addClickListener(callback) {
        this.button.addEventListener("click", callback)
    } 
}
