// import all the files in the models folder
const db = require("../models");

// define a const to access the companies model
const Company = db.companies;

// This was imported in all other controllers in this project but never used.
const Op = db.Sequelize.Op;

// Create company
exports.create = (req, res) => {
    // build a company object from request url parameters
    // will need to implement this in the routes
    // javascript objects are like python dictionaries
    const company = {
        company_name: req.body.company_name,
        company_address: req.body.company_address,
        // take care of difference between params and body
        contact_id: parseInt(req.params.contactId),
    };

    // This executes write into the database using sql behind the scene?
    // Model.SequelizeFunction(javascript object)
    Company.create(company)
        .then(data => {
            res.send(data); // This sends back a JSON of the record created just now.
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
        });
};

// Get all companies in table
exports.findAll = (req, res) => {
    Company.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

exports.filterByContactId = (req, res) => {
    Company.findAll({
        where: {
            contact_id: parseInt(req.params.contactId)
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Update company
exports.update = (req, res) => {
    const id = req.params.company_id;

    Company.update(req.body, {
        where: { company_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Company was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Company`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Company with id=" + id
            });
        });
};

// Delete one company using id
exports.delete = (req, res) => {
    const id = parseInt(req.params.company_id);

    Company.destroy({
        where: { company_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Company was deleted successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Company with id=${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Company with id=" + id
            });
        });
};