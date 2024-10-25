const validator = require('../helpers/validate');

const saveCharacter = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'string',
        species: 'required|string',
        magicalStatus: 'required|string',
        hogwartsHouse: 'required|string',
        bookOfFirstAppearance: 'required|integer|min:1',
        bookOfLastAppearance: 'required|integer|max:7'
    };

    validator(req.body, validationRule, {}, (err, status) =>{
        if(!status){
            res.status(412).send({
                success: false,
                message: 'Validation Failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveCharacter
}