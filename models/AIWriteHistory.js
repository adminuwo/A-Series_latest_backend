import mongoose from 'mongoose';

const aiWriteHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    segment: {
        type: String,
        required: true,
        enum: ['students', 'startups', 'freelancers', 'influencers', 'agencies', 'authors']
    },
    type: {
        type: String,
        required: true
    },
    inputData: {
        type: Object,
        required: true
    },
    outputData: {
        type: Object, // Structured JSON from Gemini
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const AIWriteHistory = mongoose.model('AIWriteHistory', aiWriteHistorySchema);
export default AIWriteHistory;
