const mongoose = require('mongoose');

const CoctelsSchema = mongoose.Schema(
    {
        name: String,
        image: String,
        preparation: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Coctel', CoctelsSchema);
