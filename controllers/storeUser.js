const User = require('../models/User')
const path = require('path')
module.exports = async (req, res) => {
    try {
    const user = await User.create(req.body);
    console.log(user);
    res.redirect('/');
    } catch (error) {
    if (error.name === 'ValidationError') {
    const errorMessages = Object.keys(error.errors).map(key =>
    error.errors[key].message);
    console.error(errorMessages);
    return res.redirect('/auth/register');
    }
    console.error(error);
    res.status(500).send('An error occurred while creating the user');
    }
    };