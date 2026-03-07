import mongoose from 'mongoose';

const healthDataSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    sleepHours: { type: Number, default: 0 },
    waterIntake: { type: Number, default: 0 }, // in Liters
    steps: { type: Number, default: 0 },
    heartRate: { type: Number, default: 0 },
    weight: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    bmi: { type: Number, default: 0 },
    stressLevel: { type: Number, default: 0 }, // 1-10
    mood: { type: String },
    notes: { type: String }
});

// Calculate BMI before saving if weight and height are present
healthDataSchema.pre('save', function (next) {
    if (this.weight && this.height) {
        const heightInMeters = this.height / 100;
        this.bmi = (this.weight / (heightInMeters * heightInMeters)).toFixed(2);
    }
    next();
});

const HealthData = mongoose.model('HealthData', healthDataSchema);
export default HealthData;
