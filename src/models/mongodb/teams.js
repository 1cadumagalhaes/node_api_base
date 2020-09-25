const Mongoose = require('mongoose');
const teamSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    universo: {
        type: String,
        required: true,
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
});


module.exports = Mongoose.models.teams || Mongoose.model('teams', teamSchema);