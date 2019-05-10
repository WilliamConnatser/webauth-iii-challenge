require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./router');
const server = express();

server.use(cors());
server.use(express.json());
server.use('/api/', router);

const port = process.env.PORT || 5000;

server.listen(port, console.log(`\n \n Server running \n \u{1F469}\u{200D}\u{1F680} \n \u{1F468}\u{200D}\u{1F680} \n on ${port}`.toUpperCase()));