import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String ,required: true ,},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verificationCode: { type: String },
  isVerified: { type: Boolean, default: false },
  codeExpiresAt: { type: Date },
  selectedCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }], 
});

const User = mongoose.model("User", userSchema);
export default User;