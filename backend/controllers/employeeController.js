const Employee = require("../models/Employee");

// Get Employees with search and pagination
exports.getEmployees = async (req, res) => {
  const { search, page = 1, limit = 6 } = req.query;

  const query =
    search != ""
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { empid: search },
          ],
        }
      : {};

  console.log(query);

  try {
    // Fetch employee data and count simultaneously
    const employees = await Employee.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const totalCount = await Employee.countDocuments(query); // Get total employee count

    // Return both employees and totalCount
    res.json({ employees, totalCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Find Employee by ID
exports.findEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Employee
exports.createEmployee = async (req, res) => {
  console.log(req.body);
  const { name, email, mobile, designation, gender, course } = req.body;

  try {
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    const image = req.file.filename;

    const newEmployee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course, // Ensure the field name is correct
      image,
    });

    const savedEmployee = await newEmployee.save();
    res
      .status(201)
      .json({ success: "Employee created successfully", savedEmployee });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while creating the employee",
        error,
      });
  }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    if (req.file) {
      req.body.image = req.file.filename;
    }

    // Update other fields
    Object.assign(employee, req.body);
    const updatedEmployee = await employee.save();
    res.json({ success: "Employee updated successfully", updatedEmployee });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while updating the employee" });
  }
};
// Delete Employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await employee.deleteOne();
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
