const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllLocations = async (req, res, next) => {
    const result = await mongodb.getDb().db('HarryPotter').collection('Locations').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const createLocation = async (req, res) => {
    const location = {
        locationName: req.body.locationName,
        countryOfOrigin: req.body.CountryOfOrigin,
        bookOfFirstAppearance: req.body.bookOfFirstAppearance,
        bookOfLastAppearance: req.body.bookOfLastAppearance
    };

    const result = await mongodb
        .getDb()
        .db()
        .collection("Locations")
        .insertOne(location);
    console.log(result); 

    if(result.insertedId != null){
        res.status(200).json(location);
    } else {
        res.status(500).json(response.error || "Some Error occurred while adding the location"); 
    }
};

const getSingleLocation = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid location ID to find a location.');
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db('HarryPotter')
        .collection('Locations')
        .find({_id: userId});
    result.toArray().then ((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const editLocation = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid location ID to update a location.');
      }
    const userId = new ObjectId(req.params.id);
    const location = {
        locationName: req.body.locationName,
        CountryOfOrigin: req.body.CountryOfOrigin,
        bookOfFirstAppearance: req.body.bookOfFirstAppearance,
        bookOfLastAppearance: req.body.bookOfLastAppearance
    };
    const result = await mongodb.getDb().db('HarryPotter').collection('Locations').replaceOne({_id: userId}, location);

    console.log(result);
    if(result.modifiedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some Error occurred while updating the location"); 
    }
};

const deleteLocation = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid location ID to delete a location.');
    }
    const userId = new ObjectId(req.params.id);

    const result = await mongodb.getDb().db('HarryPotter').collection('Locations').deleteOne({_id: userId});

    console.log(result);
    
    if(result.deletedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some Error occurred while deleting the location"); 
    }
};

module.exports = {getAllLocations, createLocation, getSingleLocation, editLocation, deleteLocation};