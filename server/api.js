const express = require('express');

const apiRouter = express.Router();

const minionsRouter = require('./api/minions');
const meetingsRouter = require('./api/meetings');
const ideasRouter = require('./api/ideas');

apiRouter.use('/api/minions', minionsRouter);
apiRouter.use('/api/meetings', meetingsRouter);
apiRouter.use('/api/ideas', ideasRouter);
module.exports = apiRouter;
