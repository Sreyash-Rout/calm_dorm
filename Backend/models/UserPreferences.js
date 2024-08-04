const mongoose = require('mongoose');

const userPreferencesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    preferences: {
        multiplayerGaming: Boolean,
        groupTherapy: Boolean,
        novelDiscussion: Boolean,
        oneOnOneCoaching: Boolean,
        journalWriting: Boolean,
        dayByYourself: Boolean
    }
});

const UserPreferences = mongoose.model('UserPreferences', userPreferencesSchema);

module.exports = UserPreferences;
