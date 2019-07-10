// const express = require('express');
// const router = express.Router();

// const client_controller = require('../controllers/controllers')


// router.get('/test', client_controller.test);



// module.exports = router;

// // router.post('/Client', test.create);

module.exports = (app) => {

    const pers = require('../controllers/controllers.js');
    //const prof = require('../controllers/prof.controllers');

    // Create a new eleve
    app.post('/', pers.create);

    // // Retrieve all eleve
    app.get('/user', pers.getZoho);

    // //create a new prof
    app.post('/user', pers.postZoho);

    // // Retrieve all eleve
    // app.get('/prof', pers.findAllProf);

    // // Retrieve a single Product with productId
    // app.get('/eleve/:eleveId', pers.findOne);

    // // Update a Note with productId
    // app.put('/eleve/:clientId', eleve.update);

    // // Delete a Note with productId
    // app.delete('/eleve/:clientId', eleve.delete);
}