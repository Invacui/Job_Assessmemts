const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    bugs: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        feedbackText: {
            type: String,
            required: true
        }
    }],
    feedback: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        feedbackText: {
            type: String,
            required: true
        }
    }],
    query: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        feedbackText: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
