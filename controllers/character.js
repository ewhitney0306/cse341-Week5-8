const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    const result = await mongodb.getDb().db('HarryPotter').collection('characters').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const createCharacter = async (req, res) => {
    const character = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        species: req.body.species,
        magicalStatus: req.body.magicalStatus,
        hogwartsHouse: req.body.hogwartsHouse,
        bookOfFirstAppearance: req.body.bookOfFirstAppearance,
        bookOfLastAppearance: req.body.bookOfLastAppearance
    };

    const result = await mongodb
        .getDb()
        .db()
        .collection("characters")
        .insertOne(character);
    console.log(result); 

    if(result.insertedId != null){
        res.status(200).json(character);
    } else {
        res.status(500).json(response.error || "Some Error occurred while adding the character"); 
    }
};

const getSingle = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid contact ID to find a character.');
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db('HarryPotter')
        .collection('characters')
        .find({_id: userId});
    result.toArray().then ((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const editCharacter = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid contact ID to update a character.');
      }
    const userId = new ObjectId(req.params.id);
    const character = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        species: req.body.species,
        magicalStatus: req.body.magicalStatus,
        hogwartsHouse: req.body.hogwartsHouse,
        bookOfFirstAppearance: req.body.bookOfFirstAppearance,
        bookOfLastAppearance: req.body.bookOfLastAppearance
    };
    const result = await mongodb.getDb().db('HarryPotter').collection('characters').replaceOne({_id: userId}, character);

    console.log(result);
    if(result.modifiedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some Error occurred while updating the contact"); 
    }
};

const deleteCharacter = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid contact ID to delete a contact.');
    }
    const userId = new ObjectId(req.params.id);

    const result = await mongodb.getDb().db('HarryPotter').collection('characters').deleteOne({_id: userId});

    console.log(result);
    
    if(result.deletedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some Error occurred while deleting the contact"); 
    }
};

module.exports = {getAll, createCharacter, getSingle, editCharacter, deleteCharacter};