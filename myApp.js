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
      console.log(doc);
      doc.favoriteFoods.push(foodToAdd);
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
  );
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    {
      name: personName,
    },
    {
      age: ageToSet,
    },
    {
      new: true,
    },
    (err, doc) => {
      if (err) return done(err);
      else done(null, doc);  
    }
  )
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId).then(
    (doc) => {
      done(null, doc);
    },
    (err) => {
      done(err);
    }
  );
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}).then(
    (doc) => {
      done(null, doc);
    },
    (err) => {
      done(err);
    }
  );
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: {$all: foodToSearch}})
    .sort({name: 1})
    .limit(2)
    .select('-age')
    .then(
      (doc) => {
        done(null, doc);
      },
      (err) => {
        done(err);
      }
    );
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
