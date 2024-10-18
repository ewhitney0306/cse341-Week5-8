const express = require ('express');
const router = express.Router();

const characterController = require ('../controllers/character.js');

router.get('/', characterController.getAll);

router.post('/', characterController.createCharacter);

router.get('/:id', characterController.getSingle);

router.put('/:id', characterController.editCharacter);

router.delete('/:id', characterController.deleteCharacter);

module.exports = router;