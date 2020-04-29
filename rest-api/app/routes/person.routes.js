module.exports = app => {
  const person = require("../controllers/person.controller.js");

  // Create a new person
  app.post("/person", person.validate("create"), person.create);

  // Retrieve all persons
  app.get("/persons", person.findAll);

  // Retrieve a single person with personId
  app.get("/person/:personId", person.findOne);

  // Update a person with personId
  app.put("/person/:personId", person.validate("update"), person.update);

  // Delete a person with personId
  app.delete("/person/:personId", person.delete);

  // delete all persons
  // app.delete("/person", person.deleteAll);
};