// const fs = require("fs");
// const path = require("path");
// const { messages } = require("./lang/messages/en/user");

// class FileReader {
//     constructor(filename) {
//         this.filePath = path.join("/tmp", filename);
//     }

//     readFile() {
//         return new Promise((resolve, reject) => {
//             fs.readFile(this.filePath, "utf8", (err, data) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(data)
//                 }
//             })
//         })
//     }
// }

// module.exports = async (req, res) => {
//     const fileReader = new FileReader("file.txt")

//     try {
//         const data = await fileReader.readFile();
//         res.writeHead(200, {"Content-Type": "text/html"});
//         res.end(`<p>${data}</p>`);
//     } catch(err) {
//         console.log("Error reading file:", err)
//         res.writeHead(404, {"Content-Type": "text/html"});
//         res.end(messages.FILE_NOT_FOUND);
//     }
// }

const { initializeApp } = require("firebase/app");
const { getFirestore, doc, getDoc } = require("firebase/firestore");

// Firebase設定
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = async (req, res) => {
    try {
        const docRef = doc(db, "files", "file1");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            res.status(200).send(`File content: ${docSnap.data().content}`);
        } else {
            res.status(404).send("File not found.");
        }
    } catch (error) {
        console.error("Error reading from Firestore:", error);
        res.status(500).send("Internal Server Error");
    }
};
