import mongoose from 'mongoose';

const aiWriteCalendarSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    companyName: String,
    month: String,
    industry: String,
    targetAudience: String,
    platforms: [String],
    calendarData: {
        type: Array, // Array of structured post objects
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const AIWriteCalendar = mongoose.model('AIWriteCalendar', aiWriteCalendarSchema);
export default AIWriteCalendar;
