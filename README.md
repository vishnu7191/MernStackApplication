# MERN stack application

MERN (MongoDB, Express, React, Node) stack application with an Employee Management system:
1. Frontend (React.js)
The frontend is built with React.js, where users interact with the application through forms, buttons, and tables. Using components like Login, Register, Home, EmployeeList, CreateEmployee, and EditEmployee. The UI also includes search, filter, sort, and pagination functionalities.
Step-by-Step Principles:
1.	Routing:
   I’ve set up the React Router to handle page navigation using routes like /login, /register, /home, /employee-list, /create-employee, and /edit-employee.
o	Each route renders a respective component, with the Nav component visible on all pages except login and registration.
2.	Login and Register Pages:
o	The user enters login or registration information.
o	Axios is used to send API requests to the backend for authentication.
o	Validation and error handling are performed, and users are navigated to the Home page upon success.
3.	Employee List Page:
o	Displays a list of employees.
o	Search, filter, and sort features are implemented to enhance the user experience.
o	Pagination allows users to navigate through employee records page by page. Conditional rendering ensures that disabled buttons are styled differently (e.g., grey when disabled).
o	When deleting an employee, the success message shows for 2 seconds and then disappears automatically using setTimeout.
4.	Create and Edit Employee Pages:
o	Users can fill in forms to create or edit an employee record.
o	Form data (like name, email, mobile, designation, gender, and courses) is sent to the backend.
o	Employee details such as Date of Joining (DoJ) are formatted to show only the date, excluding the time part.
5.	Search, Filter, and Sort:
o	A search bar allows users to type queries and filter employee records based on name, email, or designation.
o	Sorting options enable sorting by fields like date of joining (DoJ) or name.
o	Search results update in real-time.
2. Backend (Node.js + Express)
The backend uses Node.js and Express to handle API requests from the frontend. It communicates with the MongoDB database to store, retrieve, and manipulate employee data.
Step-by-Step Principles:
1.	API Routes:
o	This have have various routes (e.g., POST /login, POST /register, GET /employees, POST /employee, PUT /employee/:id, and DELETE /employee/:id).
o	These routes handle CRUD (Create, Read, Update, Delete) operations for employees.
o	Middleware handles tasks like validation, authentication, and error handling.
2.	Employee Model:
o	I have defined an Employee Schema using Mongoose.
o	Key fields include name, email, mobile, designation, gender, course (array of courses), image (as a Buffer), and doj (Date of Joining).
o	An empid field will act as a primary key and can be auto-incremented using mongoose-sequence or another method.
3.	Handling Images:
o	The employee image is stored as a binary Buffer in MongoDB. This allows you to handle employee profile pictures or similar images.
4.	Date Formatting:
o	When displaying employee records, the DoJ (Date of Joining) is formatted to show only the date (without time) using JavaScript's .toLocaleDateString().
5.	Security:
o	Authentication logic ensures that only authenticated users can access certain routes (e.g., the employee list).
o	JWT (JSON Web Tokens) or similar mechanisms can be used for secure user sessions.
3. Database (MongoDB)
   I used MongoDB to store employee data. Mongoose serves as an ODM (Object Data Modeling) library, allowing you to interact with MongoDB in a structured way.
Step-by-Step Principles:
1.	Employee Collection:
o	The employee data is stored in a collection, with each employee having fields such as name, email, mobile, designation, etc.
2.	CRUD Operations:
o	Create: A new employee is added to the database when the form is submitted on the CreateEmployee page.
o	Read: The EmployeeList page retrieves employee data and displays it.
o	Update: Employees can be edited, and changes are saved to the database using the PUT request.
o	Delete: Employees can be deleted, and the frontend UI updates accordingly.
3.	Auto-Increment Field (empid):
o	While MongoDB’s _id field can uniquely identify records, you want an empid field that auto-increments. You can implement this without using mongoose-sequence by manually managing counters in the database, but using libraries is recommended for simplicity.
4. Pagination Logic
   I’ve implemented pagination to split employee data across multiple pages:
•	Previous and Next buttons navigate through pages.
•	The buttons are conditionally disabled (e.g., on the first or last page) and styled accordingly.
6. Success Message Timeout
When an employee is deleted, a success message is displayed for 2 seconds before it disappears. This is achieved using setTimeout:

Conclusion:
•	Frontend handles UI, form submissions, validation, and pagination.
•	Backend handles API requests, database operations, and business logic.
•	MongoDB stores employee data, including auto-incrementing IDs and images.
•	Security is managed with proper authentication and token management.
This step-by-step breakdown illustrates how each layer of your MERN stack application interacts and functions.
