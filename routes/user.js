const joi = require('joi');
const router = require('express').Router();
const { User } = require('../services/user');
const { Router } = require('express');

const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(20).required(),
});

router.post('/', async (req, res, next) => {
    try {
        const { value, error } = schema.validate(req.body);
        if (error) {
            next(error);
        }

        const user = new User(value.name, value.email, value.password);
        await user.register();

        res.status(201).json({
            id: user.getID(),
            name: user.name,
            email: user.email,
            password: user.getPassword(),
        });
    } catch (error) {
        next(error);
    }
})

router.get('/', (req, res) => {
    res.render('welcome', { company: 'Binar' });
})

module.exports = router;
