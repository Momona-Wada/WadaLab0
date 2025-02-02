const { doc, setDoc } = require("firebase/firestore");
const { db } = require("../../../firebaseConfig.js");

module.exports = async (req, res) => {
    const text = req.query.text;

    if (!text) {
        res.status(400).send("No text provided.");
        return;
    }

    try {
        // Firestoreにテキストデータを保存
        await setDoc(doc(db, "files", "file1"), { content: text });

        res.status(200).send("Text successfully saved to Firestore.");
    } catch (error) {
        console.error("Error saving to Firestore:", error);
        res.status(500).send("Internal Server Error");
    }
};
