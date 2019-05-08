const express = require('express');
const api = require('./database/api/api');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('sup homie');
});

module.exports = router;