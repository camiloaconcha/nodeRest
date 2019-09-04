const Route = require('../models/route.model.js');

exports.create = (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: 'Note content can not be empty',
        });
    }

    const route = new Route({
        title: req.body.title || 'Untitled route',
        content: req.body.content,
    });

    route
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the Note.',
            });
        });
};

exports.findAll = (req, res) => {
    Route.find()
        .then(routes => {
            res.send(routes);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving data.',
            });
        });
};

exports.findOne = (req, res) => {
    Route.findById(req.params.routeId)
        .then(route => {
            if (!route) {
                return res.status(404).send({
                    message: 'Route not found with id ' + req.params.routeId,
                });
            }
            res.send(route);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Route not found with id ' + req.params.routeId,
                });
            }
            return res.status(500).send({
                message: 'Error retrieving note with id ' + req.params.routeId,
            });
        });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: 'Note content can not be empty',
        });
    }

    Route.findByIdAndUpdate(
        req.params.routeId,
        {
            title: req.body.title || 'Untitled Note',
            content: req.body.content,
        },
        { new: true }
    )
        .then(route => {
            if (!route) {
                return res.status(404).send({
                    message: 'route not found with id ' + req.params.routeId,
                });
            }
            res.send(route);
        })
        .catch(err => {
            if (err.kind === 'routeId') {
                return res.status(404).send({
                    message: 'Note not found with id ' + req.params.routeId,
                });
            }
            return res.status(500).send({
                message: 'Error updating note with id ' + req.params.routeId,
            });
        });
};

exports.delete = (req, res) => {
    Route.findByIdAndRemove(req.params.routeId)
        .then(route => {
            if (!route) {
                return res.status(404).send({
                    message: 'Note not found with id ' + req.params.routeId,
                });
            }
            res.send({ message: 'Note deleted successfully!' });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: 'Note not found with id ' + req.params.routeId,
                });
            }
            return res.status(500).send({
                message: 'Could not delete note with id ' + req.params.routeId,
            });
        });
};
