// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

// get users
server.get('/api/users', (req, res) => {
    db.find().then(users => {
        res.status(200).json(users)
    }).catch(err => res.status(500).json({error: "The users information could not be retrieved."}))
})

// get user by id
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id).then(user => {
        if (user) {
            res.status(200).json(user)
        }
        else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch(err => res.status(500).json({ error: "The user information could not be retrieved." }))
})

// post a new user
server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    if (!userInfo.name || !userInfo.bio) res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    db.insert(userInfo).then(user => res.status(201).json(user))
    .catch(err => res.status(500).json({error: 'an error'}));
})

// delete a user
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    // make sure the user you are trying to delete exists? is there a better way? should I .then after this before calling the .remove?
    db.findById(id).then(user => {if (!user) res.status(404).json({ message: "The user with the specified ID does not exist." })});
    db.remove(id).then(user => {
        res.status(204).end();
    })
    .catch(err => res.status(500).json({ error: "The user could not be removed" }))
})

// update a user
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const newInfo = req.body;
    if (!newInfo.name || !newInfo.bio) res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    db.update(id, newInfo).then(updated => {
        if (updated) {
            res.status(200).json(updated)
        }
        else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }        
    })
    .catch(err => res.status(500).json({error: "The user information could not be modified."}))
})

server.listen(5000, () => console.log('server is running on port 5000'));

