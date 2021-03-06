const router = require("express").Router();

const isAdmin = require("../middleware/isAdmin");
const isLoggedIn = require("../middleware/isLoggedIn");
const Ejercicio = require("../models/Ejercicios.model");
const Exercise = require("../models/AllExercises.model");
const User = require("../models/User.model");
const Api = require("../services/ApiHandler");
const FitnessAPI = new Api();



router.get("/crear-ejercicio", isAdmin , (req, res) => {

console.log(`*2*"*"*"*" ` , isLoggedIn)
  
   User.findOne( req.session.user ) 

  .then((found) => {
    // If the user is found, send the message username is taken
    if (found.nivel === "administrador") {
        console.log(`*******************`, found)
        res.render("administrador/crearEjercicio", {isLoggedIn: req.session.user})
 }
 else {res.redirect("/")}
   
  })})


router.post("/crear-ejercicio", (req, res) => {
          const { name, description, category, muscles, equipment, comments } = req.body;

        const query = {
        name: name,
        description: description,
        category: { name: category },
        muscles: [{name: muscles}],
        equipment: [{name: equipment}],
        comments: [{name: comments}],
        }

            Exercise.create(query)
            .then(() => { res.render(`index`) 
        })
            .catch((err) => {
          res.status(400).send(err)
        })
})




module.exports = router;