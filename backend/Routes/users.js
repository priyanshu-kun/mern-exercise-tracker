const Router = require("express").Router();
let User = require("../DB_Models/user.model");


Router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (e) {
        res.status(400).json('ERROR: ' + e);
    }
})


Router.post('/addUser', async (req, res) => {
    try {
        const username = req.body.username;
        const newUser = new User({ username });
        await newUser.save((err, user) => {
            if (err) throw new Error("User can't save!");
            console.log(`${user.username} is saved successfully!`);
            res.status(200).json({ msg: `${user.username} is saved successfully!` });
        });
    }
    catch (e) {
        res.status(500).json('ERROR: ' + e);
    }
})

module.exports = Router;