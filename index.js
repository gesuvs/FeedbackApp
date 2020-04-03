const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

app.post("/feed", (req, res) => {
  const { apresentacao, comentario, conteudo, didatica, dominio } = req.body;
  db.collection("feedback")
    .add({ apresentacao, comentario, conteudo, didatica, dominio })
    .then(() => res.send("criado"))
    .catch(err => console.error(err));
});

exports.api = functions.https.onRequest(app);
