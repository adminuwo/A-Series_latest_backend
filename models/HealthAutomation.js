import mongoose from 'mongoose';

const healthAutomationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    timestamp: { type: Date, default: Date.now },
    type: { type: String, enum: ['Detection', 'Decision', 'Action', 'Alert'], required: true },
    category: { type: String, enum: ['Monitoring', 'Risk', 'Routine', 'Reminder', 'ScoreUpdate'] },
    message: { type: String, required: true },
    severity: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    status: { type: String, enum: ['unread', 'read', 'archived'], default: 'unread' },
    metadata: { type: mongoose.Schema.Types.Mixed } // To store dynamic data like routine JSON
});

const HealthAutomation = mongoose.model('HealthAutomation', healthAutomationSchema);
export default HealthAutomation;
