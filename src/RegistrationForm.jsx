import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+(com|in)$/,
          "Invalid email address"
        )
        .required("Email is required"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
          "Password must include at least one uppercase letter, symbol and number"
        )
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Form submitted:", values);
      resetForm();
      setIsRegistered(true);
    },
  });
  useEffect(() => {
    let timer;
    if (isRegistered) {
      timer = setTimeout(() => {
        setIsRegistered(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isRegistered]);

  return (
    <div className="flex flex-col md:flex-row max-w-screen-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="md:w-1/2 order-2 md:order-1">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
          Registration Form
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              className="w-full px-3 py-2 placeholder-gray-400 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-600 mt-1">{formik.errors.firstName}</div>
            )}
          </div>

          <div className="mb-4">
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              className="w-full px-3 py-2 placeholder-gray-400 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-red-600 mt-1">{formik.errors.lastName}</div>
            )}
          </div>

          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="w-full px-3 py-2 placeholder-gray-400 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-600 mt-1">{formik.errors.email}</div>
            )}
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              className="w-full px-3 py-2 placeholder-gray-400 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <button
              type="button"
              className="absolute right-4 translate-y-3.5"
              onClick={handleTogglePassword}
            >
              {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
            </button>

            {formik.touched.password && formik.errors.password && (
              <div className="text-red-600 mt-1">{formik.errors.password}</div>
            )}
          </div>

          <div className="mb-4 relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full px-3 py-2 placeholder-gray-400 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            <button
              type="button"
              className="absolute right-4 translate-y-3.5"
              onClick={handleToggleConfirmPassword}
            >
              {showConfirmPassword ? <IoIosEye /> : <IoIosEyeOff />}
            </button>

            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="text-red-600 mt-1">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Register
          </button>
        </form>
        {isRegistered && (
          <center>
            <div className="text-green-600 mt-4">Successfully registered!</div>
          </center>
        )}
      </div>
      <div className="md:w-1/2 order-1 md:order-2 flex justify-center items-center mb-6">
        <img
          src="https://t3.ftcdn.net/jpg/05/71/06/76/360_F_571067620_JS5T5TkDtu3gf8Wqm78KoJRF1vobPvo6.jpg"
          alt=""
          className="lg:h-96 md:h-96 sm:w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default RegistrationForm;
