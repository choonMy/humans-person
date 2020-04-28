const sql = require("./db.js");

// constructor
const Person = function(person) {
  this.name = person.name;
  this.email = person.email;
  this.date_of_birth = person.date_of_birth;
  this.id_card_number = person.id_card_number;
  this.gender = person.gender;
  this.country = person.country;
  this.cdate = new Date(), 
  this.mdate = null
};

Person.create = (newPerson, result) => {
  sql.query("INSERT INTO person SET ?", newPerson, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created person: ", { id: res.insertId, ...newPerson });
    result(null, { id: res.insertId, ...newPerson });
  });
};

Person.findById = (personId, result) => {
  sql.query(`SELECT * FROM person WHERE id = ${personId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found person: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found person with the id
    result({ kind: "not_found" }, null);
  });
};

Person.getAll = result => {
  sql.query("SELECT * FROM person", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("persons: ", res);
    result(null, res);
  });
};

Person.updateById = (id, person, result) => {
  sql.query(
    "UPDATE person SET email = ?, name = ?, date_of_birth = ?, id_card_number = ?, gender = ?, country = ?, mdate = ? WHERE id = ?",
    [person.email, person.name, person.date_of_birth, person.id_card_number, person.gender, person.country, new Date(), id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found person with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated person: ", { id: id, ...person });
      result(null, { id: id, ...person });
    }
  );
};

Person.remove = (id, result) => {
  sql.query("DELETE FROM person WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found person with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted person with id: ", id);
    result(null, res);
  });
};

Person.removeAll = result => {
  sql.query("DELETE FROM person", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} persons`);
    result(null, res);
  });
};

module.exports = Person;