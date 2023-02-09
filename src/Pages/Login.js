import * as yup from "yup";
import useAuth from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const isAuthed = localStorage.getItem("isAuthenticated");
  console.log(isAuthed);

  const validationSchema = yup.object({
    name: yup.string().required("NAME IS REQUIRED"),
    password: yup.string().min(4).max(32).required(),
  });

  return (
    <div>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: "",
          password: "",
        }}
        onSubmit={(values) => {
          console.log(values);
          localStorage.setItem("username", values.name);
          localStorage.setItem("password", values.password);
          localStorage.setItem("isAuthenticated", true);
          login().then(() => {
            navigate("/dashboard");
          });
        }}
      >
        <Form>
          <label>Name:</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" />
          <br /> <br />
          <label>Password:</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" />
          <br /> <br />
          <button type="submit" value="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
