const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

app.post("/feed", async (req, res) => {
  const {
    apresentacao,
    comentario,
    conteudo,
    didatica,
    dominio,
    ip
  } = req.body;
  await db
    .collection("feedback")
    .where("ip", "==", ip)
    .get()
    .then(query => {
      if (!query.empty) {
        res.sendStatus(403);
      } else {
        db.collection("feedback")
          .add({ apresentacao, comentario, conteudo, didatica, dominio, ip })
          .then(() => res.sendStatus(201))
          .catch(err => res.status(400).send({ err }));
      }
    });
});

exports.api = functions.https.onRequest(app);
