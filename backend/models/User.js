const mongoose = require('mongoose');

const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new mongoose.Schema({
  userid: { type: Number, unique: true },  // Auto-incremented user ID
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Apply the auto-increment plugin to the schema
userSchema.plugin(AutoIncrement, { inc_field: "userid" });

const User = mongoose.model('User', userSchema);

module.exports = User;
