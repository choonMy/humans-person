const Person = require("../model/person.model");
const { check, validationResult } = require("express-validator/check");

// Create and Save a new person
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });

    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({
            errors: errors.array()
        })
    }

    // Create a person
    const person = new Person({
        email: req.body.email,
        name: req.body.name,
        date_of_birth: req.body.dob,
        id_card_number: req.body.idCardNum,
        gender: req.body.gender,
        country: req.body.country
    });

    // Save person in the database
    Person.create(person, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the person."
            });
        else res.status(200).send({
            ret: 0,
            data: data
        });
    });
};

// Retrieve all persons from the database.
exports.findAll = (req, res) => {
    Person.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving persons."
            });
        else res.status(200).send({
            ret: 0,
            data: data
        });
    });
};

// Find a single person with a personId
exports.findOne = (req, res) => {
    Person.findById(req.params.personId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found person with id ${req.params.personId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving person with id " + req.params.personId
                });
            }
        } else res.status(200).send({
            ret: 0,
            data: data
        });
    });
};

// Update a person identified by the personId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Person.updateById(
        req.params.personId,
        new Person(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found person with id ${req.params.personId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating person with id " + req.params.personId
                    });
                }
            } else res.send({
                ret: 0,
                data: data
            });
        }
    );
};

// Delete a person with the specified personId in the request
exports.delete = (req, res) => {
    Person.remove(req.params.personId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    ret: -1,
                    data: {
                        "message": `Not found person with id ${req.params.personId}.`
                    }

                });
            } else {
                res.status(500).send({
                    message: "Could not delete person with id " + req.params.personId
                });
            }
        } else res.send({
            ret: 0,
            data: {
                "message": `person was deleted successfully!`
            }
        });
    });
};

// Delete all persons from the database.
exports.deleteAll = (req, res) => {
    Person.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all persons."
            });
        else res.send({ message: `All persons were deleted successfully!` });
    });
};

exports.validate = (method) => {
    switch (method) {
        case 'create': {
            return [
                check('name', "name is missing").exists(),
                check('name', "name cannot be empty").not().isEmpty(),
                check('email', "email is missing").exists(),
                check('dob', "dob is missing").exists(),
                check('idCardNum', "idCardNum is missing").exists(),
                check('gender', "gender is missing").exists(),
                check('country', "country is missing").exists()
            ]
        }
        case 'update': {
            return [
                check('name', "name is missing").exists(),
                check('name', "name cannot be empty").not().isEmpty(),
                check('email', "email is missing").exists(),
                check('dob', "dob is missing").exists(),
                check('idCardNum', "idCardNum is missing").exists(),
                check('gender', "gender is missing").exists(),
                check('country', "country is missing").exists()
            ]
        }
        
    }

}