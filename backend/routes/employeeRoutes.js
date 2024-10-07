const express = require('express');
const {
  getEmployees,
  findEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); // Multer middleware
const router = express.Router();

router.get('/', authMiddleware, getEmployees);
router.get('/:id', authMiddleware, findEmployeeById);
router.post('/', authMiddleware,  upload.single('image'),  createEmployee);
router.put('/:id', authMiddleware, upload.single('image'), updateEmployee);
router.delete('/:id', authMiddleware, deleteEmployee);

module.exports = router;
