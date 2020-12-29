const Router = require("express").Router();
let Exercise = require("../DB_Models/excercise.modal");


Router.get('/', async (req, res) => {
    try {
        const exer = await Exercise.find();
        res.json(exer);
    }
    catch (e) {
        res.status(400).json('ERROR: ' + e);
    }
})


Router.post('/addExercise', async (req, res) => {
    try {
        const username = req.body.username;
        const description = req.body.description;
        const duration = Number(req.body.duration);
        const date = Date.parse(req.body.date);
        const newExercise = new Exercise({ username, description, duration, date });
        await newExercise.save((err, exe) => {
            if (err) throw new Error("User can't save!");
            console.log(`Exercise ${exe.description} is saved successfully!`);
            res.status(200).json({
                msg: `Exercise ${exe.description} is saved successfully!`
            })
        });
    }
    catch (e) {
        res.status(500).json('ERROR: ' + e);
    }
})

Router.get('/:id', async (req, res) => {

    try {
        const exercise = await Exercise.findById(req.params.id)
        console.log(exercise)
        res.json(exercise);
    }
    catch (e) {
        res.status(400).json('ERROR: ' + e);
    }
})

Router.delete('/:id', async (req, res) => {

    try {
        await Exercise.findByIdAndDelete(req.params.id, (err, exe) => {
            if (err) throw new Error("User can't be deleted");
            res.status(200).json({ msg: `${exe.description} is deleted!` })
        });
    }
    catch (e) {
        res.status(500).json('ERROR: ' + e);
    }

})

Router.post('/update/:id', async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        console.log("reqBody: ", req.body);
        console.log("exercie: ", exercise)
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        // console.log("exercise****", exercise)

        exercise.save((err, exe) => {
            if (err) throw new Error("User can't save!" + err);
            console.log(`Exercise ${exe.description} is saved successfully!`);
            res.sendStatus(200);
        })

    }
    catch (e) {
        res.status(500).json('ERROR: ' + e);
    }

})

module.exports = Router;