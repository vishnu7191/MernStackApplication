const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const employeeSchema = new mongoose.Schema(
  {
    empid: { type: Number, unique: true },  // Auto-incremented employee ID
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    designation: { type: String, required: true },
    gender: { type: String, required: true },
    course: { type: [String], required: true }, // Array of courses (e.g., MCA, BCA, BSC)
    image: { type: String, required: true }, // Store image as a Buffer
    doj: { type: Date, default: Date.now }, // Date of Joining, default is current time
  },
  { timestamps: true }
);

// Apply the auto-increment plugin to the schema
employeeSchema.plugin(AutoIncrement, { inc_field: "empid" });

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
