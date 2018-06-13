var express = require('express');
var router = express.Router();
var student = require("../controllers/StudentController.js");

//Get all students
router.get('/', function(req, res) {
    student.list(req, res);
});

// Get single student by id
router.get('/show/:id', function(req, res) {
    student.show(req, res)
})

//