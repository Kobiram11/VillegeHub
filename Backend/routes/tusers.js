const router = require('express').Router();

// Project Model
const Tuser = require('../models/Tuser');

// CREATE
router.route('/create').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;

    const newUser = new Tuser({
    	name,
    	email,
    	role,
    });

    newUser.save()
        .then(() => res.json('User successfully created!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// READ
router.route('/').get((req, res) => {
    Tuser.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE
router.route('/:id').delete((req,res) => {
    Tuser.findByIdAndDelete(req.params.id)
    .then(ticket => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

