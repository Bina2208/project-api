const express = require('express');
const dbHandler = require('../db');
const minionsRouter = express.Router();

module.exports = minionsRouter;

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
minionsRouter.post('/', (req, res, next) => {

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
minionsRouter.put('/:minionId', (req, res, next) => {
    const minionId = req.params.minionId;
    const minion = dbHandler.updateInstanceInDatabase('minions', minionId);
    if(minion) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
})
// delete by id
minionsRouter.delete('/:minionId', (req, res, next) => {
    const minionId = req.params.minionId;
    if(dbHandler.deleteFromDatabaseById('minions', minionId)) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
})