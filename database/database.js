const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://theorossignol:Nwmrpx365@firsttestclustertr.sxjrx.mongodb.net/DefLab_Internal', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Base de données connectée");
}).catch(err => {
  console.error("Erreur de connection à la base de données", err);
});