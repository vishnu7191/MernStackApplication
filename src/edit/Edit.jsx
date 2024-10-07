import React, { useEffect, useState } from "react";
import Nav from "../home/Nav";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const { id } = useParams(); // Assuming you're using URL parameters for employee ID
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "HR",
    gender: "",
    course: [],
    image: null,
  });

  // Error State
  const [errors, setErrors] = useState({});

  const [imageChange, setImageChange] = useState(false);

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('token'); // Adjust based on your authentication method
    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  useEffect(() => {
    // Fetch existing employee data
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employees/${id}`,

            {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${localStorage.getItem("token")}`, // Send the token if necessary
                },
              }
        ); // Fetch employee data by ID
        await setFormData(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => {
        const newCourses = checked
          ? [...prevData.course, value]
          : prevData.course.filter((course) => course !== value);
        return { ...prevData, course: newCourses };
      });
    } else if (type === "file") {
      setImageChange(true);
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      formErrors.email = "Valid email is required";
    if (
      !formData.mobile ||
      isNaN(formData.mobile) ||
      formData.mobile.length !== 10
    )
      formErrors.mobile = "Valid 10-digit mobile number is required";
    if (!formData.gender) formErrors.gender = "Gender selection is required";
    if (formData.course.length === 0)
      formErrors.course = "Please select at least one course";
    // if (!formData.image) formErrors.image = "Please upload an image";
    console.log(formData.image);
    if (
      imageChange &&
      !["image/jpeg", "image/png", "image/jpg"].includes(formData.image.type)
    )
      formErrors.image = "Only .jpg, .png, or .jpeg file formats are allowed";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formDataToSend = new FormData();
      for (let key in formData) {
        if (key === "course") {
          formData.course.forEach((course) =>
            formDataToSend.append("course[]", course)
          );
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }
      try {
        const response = await axios.put(
          `http://localhost:5000/api/employees/${id}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          }
        ); // Update employee data
        if (response.data.success) {
          alert("Employee updated successfully!");
          navigate("/employee_list"); // Redirect to employee list after successful update
        } else {
          alert("Error updating employee");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div>
      <Nav />
      <section className="w-[90%] h-[80vh] mx-auto mt-8 flex flex-col items-center">
        <div className="md:w-[50%] w-[80%] flex items-center">
          <Link
            to={"/employee_list"}
            className="border border-none bg-gray-800 h-8 content-center rounded-md px-2 text-white"
          >
            Back
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold ml-[30%] mb-2">
            Edit Details
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="md:w-[50%] w-[80%] shadow-lg shadow-red-300 rounded-lg p-[20px] space-y-6 overflow-auto"
        >
          {/* Name */}
          <div>
            <label className="block font-semibold text-sm mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border border-gray-500 p-2 rounded-md"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
          </div>
          {/* Email */}
          <div>
            <label className="block font-semibold text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="dealsdray@gmail.com"
              className="w-full border border-gray-500 p-2 rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>
          {/* Mobile */}
          <div>
            <label className="block font-semibold text-sm mb-2">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile"
              className="w-full border border-gray-500 p-2 rounded-md"
            />
            {errors.mobile && (
              <p className="text-red-500 text-xs">{errors.mobile}</p>
            )}
          </div>
          {/* Designation */}
          <div>
            <label className="block font-semibold text-sm mb-2">
              Designation
            </label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full border border-gray-500 p-2 rounded-md"
            >
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          {/* Gender */}
          <div>
            <label className="block font-semibold text-sm mb-2">Gender</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-xs">{errors.gender}</p>
            )}
          </div>
          {/* Course */}
          <div>
            <label className="block font-semibold text-sm mb-2">Course</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="course"
                  value="mca"
                  checked={formData.course.includes("mca")}
                  onChange={handleChange}
                />
                MCA
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="course"
                  value="bca"
                  checked={formData.course.includes("bca")}
                  onChange={handleChange}
                />
                BCA
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="course"
                  value="bsc"
                  checked={formData.course.includes("bsc")}
                  onChange={handleChange}
                />
                BSC
              </label>
            </div>
            {errors.course && (
              <p className="text-red-500 text-xs">{errors.course}</p>
            )}
          </div>
          {/* Image */}
          <div>
            <label className="block font-semibold text-sm mb-2">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full border border-gray-500 p-2 rounded-md"
            />
            {errors.image && (
              <p className="text-red-500 text-xs">{errors.image}</p>
            )}
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-2"
            >
              Update
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Edit;
