import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true, index: true },
    name: String,
    email: String,
    age: Number,
    gender: String,
    state: String,
    district: String,
    city: String,
    residence: String,
    education: String,
    studentStatus: String,
    employment: String,
    occupation: String,
    annualIncome: Number,
    incomeSource: String,
    householdSize: Number,
    dependents: Number,
    interests: [String],
    savedSchemes: [String],
    comparedSchemes: [String],
    circumstances: String,
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);
