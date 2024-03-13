const express = require('express');
const dbHandler = require('../db');
const minionsRouter = express.Router();

module.exports = minionsRouter;

function checkBodyProperties(req, res, next) {
    const body = req.body;
    const properties = ['name', 'title', 'salary', 'weaknesses'];
    for(property of properties) {
        if(!body[property]) {
            const error = new Error(`There is no ${property}`);
            error.status = 400;
            return next(error);
        }
    }
    if(isNaN(body['salary']) || Number(body['salary']) < 0) {
        const error = new Error(`${body['salary']} is not a valid salary.`)
        error.status = 400;
        return next(error);
    }

    next();
}

//minionsRouter.use(checkBodyProperties)

// get all
minionsRouter.get('/', (req, res, next) => {
    const minions = dbHandler.getAllFromDatabase('minions');
    if(minions) {
        res.send(minions);
    } else {
        res.status(404).send();
    }
   
})

// create
minionsRouter.post('/', checkBodyProperties, (req, res, next) => {
    const body = req.body;
    const minion = dbHandler.addToDatabase('minions', body);
    res.status(200).send(minion);
})

// get by Id
minionsRouter.get('/:minionId', (req, res, next) => {
    const minionId = req.params.minionId;
    const minion = dbHandler.getFromDatabaseById('minions', minionId);
    if(minion) {
        res.status(200).send(minion);
    } else {
        res.status(404).send();
    }
})
// update by Id
minionsRouter.put('/:minionId', checkBodyProperties, (req, res, next) => {
    const minionId = req.params.minionId;
    req.body.id = req.params.minionId;
    const minion = dbHandler.updateInstanceInDatabase('minions', req.body);
    if(minion) {
        res.status(200).send(minion);
    } else {
        res.status(404).send();
    }
})
// delete by id
minionsRouter.delete('/:minionId', (req, res, next) => {
    const minionId = req.params.minionId;
    if(dbHandler.deleteFromDatabasebyId('minions', minionId)) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
})

