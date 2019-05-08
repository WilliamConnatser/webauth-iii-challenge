const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const api = require('./database/api/api');
const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || 'a default secret if dotenv file missing';

router.get('/', (req, res) => {
    res.status(200).send('sup homie');
});

router.post('/register', (req, res) => {
    if (req.body.username === undefined) res.status(422).send({
        message: 'Need Username'
    })
    else if (req.body.password === undefined) res.status(422).send({
        message: 'Need Password'
    })
    else if (req.body.department === undefined) res.status(422).send({
        message: 'Need Department'
    })

    req.body.password = bcrypt.hashSync(req.body.password, 10);

    api.register(req.body)
        .then(response => {
            const token = jwt.sign(response, jwtSecret, {
                expiresIn: '1h'
            });
            res.status(200).send(token);
        })
        .catch(err => {
            if (err.errno === 19) res.status(422).send({
                message: 'Username Taken'
            })
            else res.status(500).send({
                message: 'Internal Server Error'
            });
        });
});

router.post('/login', (req, res) => {
    if (req.body.username === undefined) res.status(422).send({
        message: 'Enter a username'
    });
    else if (req.body.password === undefined) res.status(422).send({
        message: 'Enter a password'
    });
    else
        api.login(req.body)
        .then(response => {
            if (response.username !== undefined && bcrypt.compareSync(req.body.password, response.password, 10)) {
                const token = jwt.sign(response, jwtSecret, {
                    expiresIn: '1h'
                });
                res.status(200).send(token);
            } else {
                res.status(422).send({
                    message: 'Invalid credentials'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Internal Server Error'
            })
        });

});

router.get('/users', auth, ({
    headers
}, res) => {
    api.getAllUsers(headers.user.department)
        .then(response => {
            res.status(200).send({
                data: response
            });
        })
        .catch(err => res.status(500).send({
            message: 'Internal Server Error'
        }));
});

function auth(req, res, next) {
    if (req.headers.token === undefined) res.status(401).send({
        message: 'Log in first'
    });

    try {
        const user = jwt.verify(req.headers.token, jwtSecret);

        api.getUserByUsername(user.username)
            .then(response => {
                if (response.username !== undefined) {
                    req.headers.user = user;
                    next();
                } else {
                    res.status(422).send({
                        message: 'Log in first'
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: 'Internal Server Error'
                })
            });

    } catch (err) {
        res.status(500).send({
            message: 'Invalid Token'
        })
    }
}

module.exports = router;