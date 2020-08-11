const express = require('express');
const helmet = require('helmet');

const db = require("./data/dbConfig.js");

const server = express();

server.use(helmet());
server.use(express.json());


server.get('/', (req, res) => {
    res.send("The API is active")
})

server.get('/api/cars', (req, res) => {
    db('cars')
        .then(cars => {
            res.status(200).json({data: cars})
        })
        .catch(error => {
            console.log(error)
            res.status(500)
                .json({errorMessage: error.message})
        })
})

server.post('/api/cars', (req, res) => {
    db('cars')
        .insert(req.body)
        .returning('id')
        .then(validation => {
            res.status(201).json({Return:validation})
        })
        .catch(error => {
            console.log(error)
            res.status(500)
                .json({ errorMessage: error.message });
        })
})  

server.get('/api/cars/:id', (req, res) => {
    db("cars")
        .where({ id: req.params.id })
        .then(car => {
            if(!car){
                res.status(404).json({ message: "Car not found" });
            }else{
                res.status(200).json({data:car})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({errorMessage:error.message})
        })
})

server.put("/api/cars/:id", (req, res) => {

    db("cars")
        .where({ id: req.params.id })
        .update(req.body)
        .then(count => {
            if (count) {
                res.status(200).json({ message: "Car updated successfully" });
            } else {
                res.status(404).json({ message: "Car not found" });
            }
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({ error: error.message });
        });
});

server.delete("/api/cars/:id", (req, res) => {
    db("cars")
        .where({ id: req.params.id })
        .del() 
        .then(count => {
            if (count) {
                res.status(200).json({ message: "Car removed successfully" });
            } else {
                res.status(404).json({ message: "Car not found" });
            }
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({ error: error.message });
        });
});


module.exports = server;
