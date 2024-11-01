const express = require ('express');
const router = express.Router();

const locationController = require ('../controllers/location.js');
const validation = require('../middleware/validate.js');

router.get('/', locationController.getAllLocations);

router.post('/', validation.saveLocation, locationController.createLocation);

router.get('/:id', locationController.getSingleLocation);

router.put('/:id', validation.saveLocation, locationController.editLocation);

router.delete('/:id', locationController.deleteLocation);

module.exports = router;