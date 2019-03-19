// implement your API here
const express = require('express');

const db = require('./data/db.js');

const morgan = require('morgan');

const cors = require('cors');

const server = express();


server.use(express.json());
server.use(cors());
server.use(morgan("dev"));

// get users
server.get('/api/users', (req, res) => {
    db.find().then(users => 
        res.status(200).json(users)
    ).catch(err => res.status(500).json({error: "The users information could not be retrieved."}))
})

// get user by id
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id).then(user => {
        if (user) {
            return res.status(200).json(user)
        }
        else {
            return res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch(err => res.status(500).json({ error: "The user information could not be retrieved." }))
})

// post a new user
server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    if (!userInfo.name || !userInfo.bio) return res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    db.insert(userInfo).then(user => res.status(201).json(user))
    .catch(err => res.status(500).json({error: 'an error'}));
})

// delete a user
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id).then(response => {
        if (response) {
            // I'm still not sure why I can't see this response in postman
            return res.status(204).json(response);
        }
        else {
            return res.status(404).json({ message: "The user with the specified ID does not exist." })
        }  
    })
    .catch(err => res.status(500).json({ error: "The user could not be removed" }))
})

// update a user
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const newInfo = req.body;
    if (!newInfo.name || !newInfo.bio) return res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    db.update(id, newInfo).then(updated => {
        if (updated) {
            return res.status(200).json(updated)
        }
        else {
            return res.status(404).json({ message: "The user with the specified ID does not exist." })
        }        
    })
    .catch(err => res.status(500).json({error: "The user information could not be modified."}))
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

