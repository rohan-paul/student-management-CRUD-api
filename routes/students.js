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

//create a student
router.get('/create', function(req, res) {
    student.create(req, res);
})

// save student
router.post('/save', function(req, res) {
    student.save(req, res);
})

//Edit student
router.get('/edit/:id', function(req, res) {
    student.edit(req, res);
});0

//Update a student
router.post('/update/:id', function(req, res) {
    student.update(req, res);
})

// delete student
router.post('/delete/:id', function(req, res, next) {
    student.delete(req, res);
});

module.exports = router;