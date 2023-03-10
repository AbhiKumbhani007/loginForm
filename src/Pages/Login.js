import React from "react";
import { useNavigate } from "react-router-dom";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import useAuth from "../Context/AuthContext";
import { loginWithEmailAndPassword } from "../Redux/userDataSlice";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const isUserAuthed = useSelector((state) => state.userData.userAuthed);
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    email: yup.string().email("Invalid Email").required("Required"),
    password: yup.string().min(4).max(32).required("Required"),
  });

  const loginApi = async (email, password) => {
    const data = {
      email: email,
      password: password,
    };
    dispatch(loginWithEmailAndPassword(data));
    isUserAuthed &&
      login().then(() => {
        navigate("/dashboard");
      });
  };

  return (
    <div className="">
      <Formik
        className=""
        validationSchema={validationSchema}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values, { resetForm }) => {
          localStorage.setItem("username", values.email);
          localStorage.setItem("password", values.password);
          loginApi(values.email, values.password);
          // localStorage.getItem("token") &&
          resetForm();
        }}
      >
        <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
          <div className="px-12 py-10 mt-4 text-left bg-white shadow-lg max-w-max">
            <h3 className="text-2xl font-bold text-center">
              Login to your account
            </h3>
            <Form action="">
              <div className="mt-6">
                <div className="w-120">
                  <label className="block">Email</label>
                  <Field
                    name="email"
                    type="text"
                    placeholder="Email"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  <ErrorMessage
                    name="email"
                    render={(msg) => (
                      <span className="text-xs tracking-wide text-red-600">
                        {msg}
                      </span>
                    )}
                  />
                </div>
                <div className="mt-4">
                  <label className="block">Password</label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  <ErrorMessage
                    name="password"
                    render={(msg) => (
                      <span className="text-xs tracking-wide text-red-600">
                        {msg}
                      </span>
                    )}
                  />
                </div>
                <div className="flex items-baseline justify-between">
                  <button
                    className="px-6 py-2 mt-8 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                    type="submit"
                    value="submit"
                  >
                    Login
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </Formik>
    </div>
  );
};

export default Login;
