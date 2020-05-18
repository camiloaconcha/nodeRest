const Coctel = require('../models/coctel.model.js');

exports.createList = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Coctel details should be filled',
        });
    }
    const saveCoctel = (coctel) => {
        const coctelModel = new Coctel({
            name: coctel.name || 'Untitled Coctel',
            image: coctel.image,
            preparation: coctel.preparation,
        });

        coctelModel
            .save()
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        'Some error occurred while creating the coctel.',
                });
            });
    };

    req.body.map((coctel) => saveCoctel(coctel));
};

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Coctel content can not be empty',
        });
    }

    const coctelModel = new Coctel({
        name: req.body.name || 'Untitled Coctel',
        image: req.body.image,
        preparation: req.body.preparation,
    });

    coctelModel
        .save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the Note.',
            });
        });
};

exports.findAll = (req, res) => {
    Coctel.find()
        .then((coctels) => {
            res.send(coctels);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving data.',
            });
        });
};

exports.findOne = (req, res) => {
    Coctel.findById(req.params.coctelId)
        .then((coctel) => {
            if (!coctel) {
                return res.status(404).send({
                    message: 'Coctel not found with id ' + req.params.coctelId,
                });
            }
            res.send(coctel);
        })
        .catch((err) => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Coctel not found with id ' + req.params.coctelId,
                });
            }
            return res.status(500).send({
                message:
                    'Error retrieving Coctel with id ' + req.params.coctelId,
            });
        });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: 'Coctel content can not be empty',
        });
    }

    Coctel.findByIdAndUpdate(
        req.params.coctelId,
        {
            name: req.body.name || 'Untitled Note',
            image: req.body.image,
            preparation: req.body.preparation,
        },
        { new: true }
    )
        .then((coctel) => {
            if (!coctel) {
                return res.status(404).send({
                    message: 'coctel not found with id ' + req.params.coctelId,
                });
            }
            res.send(coctel);
        })
        .catch((err) => {
            if (err.kind === 'coctelId') {
                return res.status(404).send({
                    message: 'Note not found with id ' + req.params.coctelId,
                });
            }
            return res.status(500).send({
                message: 'Error updating note with id ' + req.params.coctelId,
            });
        });
};

exports.delete = (req, res) => {
    Coctel.findByIdAndRemove(req.params.coctelId)
        .then((coctel) => {
            if (!coctel) {
                return res.status(404).send({
                    message: 'Note not found with id ' + req.params.coctelId,
                });
            }
            res.send({ message: 'Note deleted successfully!' });
        })
        .catch((err) => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: 'Coctel not found with id ' + req.params.coctelId,
                });
            }
            return res.status(500).send({
                message: 'Could not delete note with id ' + req.params.coctelId,
            });
        });
};
