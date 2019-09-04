module.exports = app => {
    const routes = require('../controllers/route.controller.js');

    app.post('/routes', routes.create);

    app.get('/routes', routes.findAll);

    app.get('/routes/:routeId', routes.findOne);

    app.put('/routes/:routeId', routes.update);

    app.delete('/routes/:routeId', routes.delete);
};
