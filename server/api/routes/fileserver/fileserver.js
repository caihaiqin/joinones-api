const express = require('express')
const filerouter = new express.Router()
const path = require('path')
console.log(path.join(__dirname, '../public'));
filerouter.use('/public', express.static(path.join(__dirname, '../public')))

module.exports = filerouter