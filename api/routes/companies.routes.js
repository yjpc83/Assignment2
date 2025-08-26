module.exports = app => {
    const companies = require("../controllers/companies.controller.js");
  
    var router = require("express").Router();
  
    router.post("/contacts/:contactId/companies/", companies.create); // working
  
    router.get("/companies", companies.findAll); // working

    router.get("/contacts/:contactId/companies", companies.filterByContactId); // working
  
    router.put("/companies/:company_id", companies.update); // working
  
    router.delete("/companies/:company_id", companies.delete); // working
  
    app.use('/api', router);
};