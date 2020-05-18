module.exports = app => {
    const coctels = require('../controllers/coctel.controller.js');

    app.post('/coctels', coctels.create);

    app.post('/coctelsList', coctels.createList);

    app.get('/coctels', coctels.findAll);

    app.get('/coctels/:coctelId', coctels.findOne);

    app.put('/coctels/:coctelId', coctels.update);

    app.delete('/coctels/:coctelId', coctels.delete);
};
