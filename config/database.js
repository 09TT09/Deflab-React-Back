const mongoose = require("mongoose");

mongoose.connect(`mongodb+srv://${process.env.DB_USER_PASSWORD}@${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {console.log("Base de données connectée");})
    .catch(err => {console.error("Erreur de connection à la base de données", err);});
