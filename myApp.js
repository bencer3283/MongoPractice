require('dotenv').config();
let mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


let Person = require('./person');

const createAndSavePerson = (done) => {
  let amy = new Person({
    name: 'Amy',
    age: 18,
    favoriteFoods: ['chocolate', 'mango']
  });
  amy.save().then(
    (doc) => {
      done(null, doc);
    },
    (err) => {
      done(err);
    }
  )
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople).then(
    (doc) => {
      done(null, doc);
    },
    (err) => {
      done(err);
    }
  );
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}).then(
    (doc) => {
      done(null, doc);
    },
    (err) => {
      done(err);
    }
  );
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: {$all: food}}).then( //or $in: ?
    (doc) => {
      done(null, doc);
    },
    (err) => {
      done(err);
    }
  );
};

const findPersonById = (personId, done) => {
  Person.findById(personId).then(
    (doc) => {
      done(null, doc);
    },
    (err) => {
      done(err);
    }
  );
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId).then(
    (doc) => {
      doc._favoriteFoods.push(foodToAdd);
      doc.save().then(
        (doc) => {
          console.log(doc);
          done(null, doc);
        },
        (err) => {
          done(err);
        }
      )
    },
    (err) => {
      done(err);
    }
  )
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
