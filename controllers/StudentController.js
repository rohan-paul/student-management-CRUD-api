const mongoose = require("mongoose");
const Student = require('../models/Student');

let StudentController = {};

// function to show list of students
StudentController.list = function (req, res) {
    Student.find({}).exec(function (err, students) {
        if (err) {
            console.log("Error : ", err);
        } else {
            res.render("../views/students/index", {students: students});
        }
    });
};

/* A> exec()  - http://mongoosejs.com/docs/api.html#query_Query-exec

In mongoose, exec method will execute the query and return a Promise. Here in this particular case above, not much use of using the .exec() as I am not using the Promise as I have no complex call-back hell to manage, but its just a good practice.

B> All callbacks in Mongoose use the pattern: callback(error, result). If an error occurs executing the query, the error parameter will contain an error document, and result will be null. If the query is successful, the error parameter will be null, and the result will be populated with the results of the query.
*/

// function to show single student by id for which I will have a corresponding route to Get single student by id
StudentController.show = function(req, res) {
    Student.findOne({_id: req.params.id}).exec(function(err, student) {
        if(err) {
            console.log("Error : ", err);
        } else {
            res.render("../views/students/show", {student: student});
        }
    });
}

// function to only render the form for creating a new student, but the actual database-write function to save the new created student will be done by save() function that I am writing after this.
StudentController.create = function(req, res) {
    res.render('../views/students/create');
}

//function to save new student
StudentController.save = function(req, res) {
    var student = new Student(req.body);
    console.log(student);

    student.save(function(err) {
        if(err) {
            console.log(err);
            res.render("../views/students/create");
        } else {
            console.log("Successfully created a student");
            res.redirect('/students/show/'+student._id);
        }
    })
}

// Edit a student
StudentController.edit = function(req, res) {
    Student.findOne({_id: req.params.id}).exec(function(err, student) {
        if(err) {
            console.log("Error : ", err);
        } else {
            res.render("../views/students/edit", {student: student})
        }
    });
}

// Update a student
StudentController.update = function(req, res) {
    Student.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            address: req.body.address,
            batch: req.body.batch,
            work_Experience: req.body.work_Experience
        }
    }, {new: true}, function(err, student) {
        if (err) {
            console.log("Error : ", err);
            res.render("../views/students/edit", {student: req.body});
        }
        res.redirect('/students/show/' + student._id);
    });
};

/* http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate

Example of the format of the findByIdAndUpdate()

Model.findByIdAndUpdate(id, { name: 'jason bourne' }, options, callback)
In the above the part < {new: true} > is my options and after which I am passing the callback
< function(err, student) {} >

https://docs.mongodb.com/manual/reference/operator/update/set/
The $set operator replaces the value of a field with the specified value.
*/

//Delete a student
StudentController.delete = function(req, res) {
    Student.remove({_id: req.params.id}, function(err) {
        if (err) {
            console.log(err);
        }  else {
            console.log("Student deleted!");
            res.redirect("/students");
    }
  });
};

/* http://mongoosejs.com/docs/api.html#remove_remove

Removes all documents that match conditions from the collection. To remove just the first document that matches conditions, set the single option to true.

Example:
Character.remove({ name: 'Eddard Stark' }, function (err) {});
*/

module.exports = StudentController;