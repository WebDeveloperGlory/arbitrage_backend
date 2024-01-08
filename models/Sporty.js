const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the SportySchema
const SportySchema = new Schema({
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    gameId: { type: String, required: true },
    clockTime: { type: String, required: true },
    odds: {
        '1': { type: String, required: true },
        '2': { type: String, required: true },
        'X': { type: String, required: true },
        'Over': { type: String, required: true },
        'Under': { type: String, required: true }
    },
    afSelectInputText: { type: String, required: true }
});

// Create the SportyModel based on SportySchema
const SportyModel = mongoose.model('SportyModel', SportySchema);

module.exports = SportyModel;