const mongoose = require("mongoose");
const Student = require('../models/Student');

let StudentController = {};

// function to show list of students

StudentController.list = function (req, res) {
    Student.find({}).exec(function (err, students) {
        if (err) {
            console.log("Error : ", err);
        } else {
            res.render("../views/students/index", {students: students})
        }
    })
}

/* A> exec()  - http://mongoosejs.com/docs/api.html#query_Query-exec

In mongoose, exec method will execute the query and return a Promise. Here in this particular case above, not much use of using the .exec() as I am not using the Promise as I have no complex call-back hell to manage, but its just a good practice.

B> All callbacks in Mongoose use the pattern: callback(error, result). If an error occurs executing the query, the error parameter will contain an error document, and result will be null. If the query is successful, the error parameter will be null, and the result will be populated with the results of the query.
*/

// function to show single student by id

StudentController.show = function(req, res) {
    Student.find({_id: req.params.id}).exec(function(err, student) {
        if(err) {
            console.log("Error : ", err);
        } else {
            res.render("../views/students/show")
        }
    })
}

// function to create new student
StudentController.create = function(req, res) {
    res.render('../views/students/create');
}

//function to save new student

StudentController.save = function(req, res) {
    var student = new Student(req.body);

    student.save(function(err) {
        if(err) {
            console.log(err);
            res.render("../views/students/create")
        } else {
            console.log("Successfully created a student");
        }
    })
}