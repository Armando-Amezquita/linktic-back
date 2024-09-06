const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const USER_ROLES = ['estudiante', 'moderador', 'admin'];

const userSchema = new Schema(
  {
    names: { type: String, required: true, trim: true },
    user: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true, enum: USER_ROLES, default: 'estudiante' },
    status: { type: String, required: true, trim: true, default: "active" },
    token: { type: String, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

module.exports = model("Users", userSchema);
 