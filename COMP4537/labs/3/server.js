const http = require("http")
const url = require("url")
const path = require("path")
const fs = require("fs")
const utils = require("./modules/utils")

const filePath = path.join(__dirname, "locals/en/en.json")

const messages = JSON.parse(fs.readFileSync(filePath, "utf8"))

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query
    if (req.url.startsWith("/COMP4537/labs/3/getDate/")) {
        const name = queryObject.name
        const date = utils.getDate()

        const responseMessage = messages.greeting
            .replace("%NAME%", name)
            .replace("%DATE%", date)

        res.writeHead(200, {"Content-Type": "text/html"})
        res.end(`<div style="color: blue;">${responseMessage}</div>`)
    } else {
        res.writeHead(400, {"Content-Type": "text/html"})
        res.end("404 Not Found")
    }
})

server.listen(8080, () => {
    console.log("Server is listening 8080")
})