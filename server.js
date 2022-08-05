const express = require("express");
const connect = require("./config/connectDB");
const app = express();
const port = process.env.PORT || 5000;
const Person = require("./models/Person");
connect();

//Create and Save a Record of a Model:

const addPerson = async () => {
  try {
    const newPerson = new Person({
      name: "Ali",
      age: 40,
      favoriteFoods: ["couscous", "tea", "icecream", "burritos"],
    });

    console.log(newPerson instanceof Person);
    newPerson.save();
  } catch (error) {}
};
//addPerson()

//Create Many Records with model.create()

const arrayOfPeople = async () => {
  try {
    const people = await Person.create([
      {
        name: "ahlem",
        age: 26,
        favoriteFoods: ["pizza", "pasta", "burritos"],
      },
      {
        name: "habiba",
        age: 25,
        favoriteFoods: ["couscous", "chiken nuggets", "suchi"],
      },
      {
        name: "youssef",
        age: 27,
        favoriteFoods: ["sandwich", "couscous", "coffee"],
      },
    ]);
    console.log(people);
  } catch (error) {
    console.error(error);
  }
};
//arrayOfPeople()

//Use model.find() to Search Your Database
const findByName = async (name) => {
  try {
    const peopleByName = await Person.find({ name });
    console.log(peopleByName);
  } catch (error) {
    console.error(error);
  }
};
//findByName("ahlem")

//Use model.findOne() to Return a Single Matching Document from Your Database
const findByFood = async (food) => {
  try {
    const personByFood = await Person.findOne({ favoriteFoods: food });
    console.log(personByFood);
  } catch (error) {
    console.error(error);
  }
};
//findByFood("couscous")

//Use model.findById() to Search Your Database By _id
const findBy_ID = async (personId) => {
  try {
    await Person.findById(personId, function (error, person) {
      console.log(person);
    });
  } catch (error) {
    console.error(error);
  }
};
//findBy_ID("62cd2d93465aee29712379c4")

//Perform Classic Updates by Running Find, Edit, then Save
const UPdate = async (personId) => {
  try {
    await Person.findById(personId, function (error, person) {
      if (error) {
        console.log(error);
      } else {
        person.favoriteFoods.push("burritos");
        person.save();
        console.log(person);
      }
    });
  } catch (error) {
    console.error(error);
  }
};
//UPdate("62cd4b117b5b8442357cc7b0")

//Perform New Updates on a Document Using model.findOneAndUpdate()
const UpdateAgeByName = async (personName) => {
  try {
    const person = await Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true }
    );
    console.log(person);
  } catch (error) {
    console.error(error);
  }
};
//UpdateAgeByName("habiba")

//Delete One Document Using model.findByIdAndRemove
const deleteByID = async (id) => {
  Person.findByIdAndRemove(id, function (error, removedP) {
    if (error) {
      console.log(error);
    } else {
      console.log("Removed person : ", removedP);
    }
  });
};
//deleteByID("62cd4377f88715e2a90e6640")

//MongoDB and Mongoose - Delete Many Documents with model.remove()
const removeManyPeople = async (name) => {
  Person.remove({ name }, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
    }
  });
};
//removeManyPeople("Mary")

//Chain Search Query Helpers to Narrow Search Results
const peopleFoundFiltred = async (favFood) => {
    try {
        const filtredP=await Person.find({ favoriteFoods: favFood })
        .sort({ name: 1 }).limit(2)
        .select("-age")
        .exec();
        console.log(filtredP)
    } catch (error) {
       console.log(error) 
    }
};

//peopleFoundFiltred("burritos");

app.listen(port, () => {
  console.log(`you're listenning ${port}`);
});