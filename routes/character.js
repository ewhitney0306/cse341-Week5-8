const express = require ('express');
const router = express.Router();

const characterController = require ('../controllers/character.js');
const validation = require('../middleware/validate.js');

router.get('/', characterController.getAllCharacters);

router.post('/', validation.saveCharacter, characterController.createCharacter);

router.get('/:id', characterController.getSingleCharacter);

router.put('/:id', validation.saveCharacter, characterController.editCharacter);

router.delete('/:id', characterController.deleteCharacter);

module.exports = router;