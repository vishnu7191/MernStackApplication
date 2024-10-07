import React, { useState, useEffect } from "react";
import Nav from "../home/Nav";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [totalEmployeeCount, setTotalEmployeeCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Page size for pagination
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Check for authentication (JWT token)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchEmployees = async (searchTerm = "", page = 1) => {
    setLoading(true);
    try {
      // Retrieve JWT token from localStorage
      const token = localStorage.getItem("token");

      // Check if token exists
      if (!token) {
        throw new Error("No token found, please log in.");
      }

      // Make the API request with the Authorization header
      const response = await axios.get(
        `http://localhost:5000/api/employees?search=${searchTerm}&page=${page}&limit=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add JWT token to the request header
          },
        }
      );

      setEmployees(response.data.employees); // No need for further processing
      setTotalEmployeeCount(response.data.totalCount); // Set total employee count
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(searchTerm, currentPage);
  }, [searchTerm, currentPage]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        // Retrieve JWT token from localStorage
        const token = localStorage.getItem("token");

        // Check if token exists
        if (!token) {
          throw new Error("No token found, please log in.");
        }
        await axios.delete(`http://localhost:5000/api/employees/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add JWT token to the request header
          },
        }); // Correct URL
        setMessage("Employee deleted successfully!");
        await setTimeout(() => {
          setMessage(""); // Clear the message
        }, 2000);
        fetchEmployees(searchTerm, currentPage); // Refresh employee list
      } catch (error) {
        console.error("Error deleting employee:", error);
        setMessage("Failed to delete employee. Please try again.");
      }
    }
  };

  const totalPages = Math.ceil(totalEmployeeCount / pageSize);

  return (
    <div>
      <Nav />
      <section className="w-[90%] mx-auto mt-5">
        <h1 className="text-2xl md:text-3xl font-bold">Employee List</h1>

        {message && <p className="text-green-500 font-semibold">{message}</p>}

        <div className="w-full flex flex-wrap items-center justify-around text-base md:text-lg mt-3">
          <div className="flex flex-1 flex-wrap gap-3 font-semibold items-center">
            <p>Total Count: {totalEmployeeCount}</p>
            <input
              type="text"
              placeholder="Search by id/name/email"
              className=" min-w-[20%] outline-none border border-gray-500 p-[3px_10px] rounded-md"
              onKeyDown={(e) => {
                if(e.key === 'Enter')
                  handleSearch(e.target.value)}
              }
                
            />
          </div>
          

          <div className="flex md:w-auto justify-between items-center mt-3 md:mt-0">
            
            <Link
              to={"/create_employee"}
              className="ml-3 bg-green-600 px-3 py-1 rounded-md font-semibold text-white"
            >
              Create
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-500 px-2 py-1 text-xs md:text-xl font-semibold">
                  Emp Id
                </th>
                <th className="border border-gray-500 px-2 py-1 text-xs md:text-xl font-semibold">
                  Image
                </th>
                <th className="border border-gray-500 px-2 py-1 text-xs md:text-xl font-semibold">
                  Name
                </th>
                <th className="border border-gray-500 px-2 py-1 text-xs md:text-xl font-semibold">
                  Email
                </th>
                <th className="border border-gray-500 px-2 py-1 text-xs md:text-xl font-semibold">
                  Mobile No
                </th>
                <th className="border border-gray-500 px-2 py-1 text-xs md:text-xl font-semibold">
                  Gender
                </th>
                <th className="border border-gray-500 px-2 py-1 text-xs md:text-xl font-semibold">
                  Course
                </th>
                <th className="border border-gray-500 px-2 py-1 text-xs md:text-xl font-semibold">
                  D.O.J
                </th>
                <th className="border border-gray-500 px-2 py-1 text-xs md:text-xl font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : employees.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-4">
                    No employees found.
                  </td>
                </tr>
              ) : (
                employees.map((employee) => {
                  return (
                    <tr key={employee.empid} className="text-center">
                      <td className="border border-gray-500 px-2 py-1 text-xs md:text-xl ">
                        {employee.empid}
                      </td>
                      <td className="border border-gray-500 px-1 py-1 text-xs md:text-xl flex justify-center">
                        <img
                          src={`../src/assets/${employee.image}`}
                          alt="img"
                          className="w-12 h-12"
                        />
                      </td>
                      <td className="border border-gray-500 px-2 py-1 text-xs md:text-xl">
                        {employee.name}
                      </td>
                      <td className="border border-gray-500 px-2 py-1 text-xs md:text-xl">
                        {employee.email}
                      </td>
                      <td className="border border-gray-500 px-2 py-1 text-xs md:text-xl">
                        {employee.mobile}
                      </td>
                      <td className="border border-gray-500 px-2 py-1 text-xs md:text-xl">
                        {employee.gender}
                      </td>
                      <td className="border border-gray-500 px-2 py-1 text-xs md:text-xl">
                        {employee.course[0]}
                      </td>
                      <td className="border border-gray-500 px-2 py-1 text-xs md:text-xl">
                        {new Date(employee.doj).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-500 px-2 py-1 text-xs md:text-xl">
                        <div className="flex justify-evenly space-x-2">
                          <Link
                            to={`/edit/${employee._id}`}
                            className="border-none bg-blue-600 px-2 py-1 rounded-md text-white text-xs md:text-sm hover:bg-blue-800 transition duration-200"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(employee._id)}
                            className="border-none bg-red-600 px-2 py-1 rounded-md text-white text-xs md:text-sm hover:bg-red-800 transition duration-200"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center mt-3">
          {/* Pagination */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`font-semibold py-1 px-2 rounded-lg mx-1 ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500"
                : "bg-gray-900 text-white"
            }`}
          >
            Previous
          </button>
          <span className="font-semibold mx-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className={`font-semibold py-1 px-2 rounded-lg mx-1 ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500"
                : "bg-gray-900 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

export default EmployeeList;
