// console.log("Loading modules...");
// const fs = require("fs")
// const path = require("path")
// const url = require("url")
// const { messages } = require("./lang/messages/en/user")


// class FileWriter {
//     constructor(filename) {
//         this.filePath = path.join("/tmp", filename);
//         console.log("File path resolved to:", this.filePath);
//     }

//     appendText(text) {
//         return new Promise((resolve, reject) => {
//             fs.appendFile(this.filePath, text + "\n", (err) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve()
//                 }
//             })
//         })
        
//     }
// }

// module.exports = async (req, res) => {
//     const parsedUrl = url.parse(req.url, true);
//     const text = parsedUrl.query.text;

//     if (!text) {
//         res.writeHead(400, messages.TEXT_NOT_PROVIDED);
//         return;
//     }

//     const fileWriter = new FileWriter("file.txt");
    
//     try {
//         await fileWriter.appendText(text);
//         res.writeHead(200, {"Content-Type": "text/html"});
//         res.end(messages.TEXT_APPENDED_SUCCESSFULLY);
//     } catch (err) {
//         console.error("Error appending text:", err)
//         res.writeHead(500, {"Content-Type": "text/html"});
//         res.end(messages.INTERNAL_SERVER_ERROR);
//     }
// }

const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc } = require("firebase/firestore");

// Firebase設定
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = async (req, res) => {
    const text = req.query.text;

    if (!text) {
        res.status(400).send("No text provided.");
        return;
    }

    try {
        // Firestoreにテキストを保存
        await setDoc(doc(db, "files", "file1"), { content: text });
        res.status(200).send("Text successfully saved to Firestore.");
    } catch (error) {
        console.error("Error saving to Firestore:", error);
        res.status(500).send("Internal Server Error");
    }
};
