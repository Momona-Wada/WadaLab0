const fs = require("fs");
const path = require("path");
const { messages } = require("./lang/messages/en/user");

class FileReader {
    constructor(filename) {
        this.filePath = path.join("/tmp", filename);
    }

    readFile() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.filePath, "utf8", (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data)
                }
            })
        })
    }
}

module.exports = async (req, res) => {
    const fileReader = new FileReader("file.txt")

    try {
        const data = await fileReader.readFile();
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(`<p>${data}</p>`);
    } catch {
        console.log("Error reading file:", err)
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end(messages.FILE_NOT_FOUND);
    }
}