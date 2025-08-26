module.exports = app => {
    const companies = require("../controllers/companies.controller.js");
  
    var router = require("express").Router();
  
    router.post("/contacts/:contactId/companies/", companies.create);
  
    router.get("/companies", companies.findAll);
  
    router.put("/companies/:company_id", companies.update);
  
    router.delete("/companies/:company_id", companies.delete);
  
    app.use('/api', router);
};