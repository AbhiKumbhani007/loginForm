import React from "react";
import * as yup from "yup";
import ReactTable from "react-table";
import UserDataTable from "./userDataTable";
import useAuth from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "./StyleSheet/error.css";

const Dashboard = () => {
  const [formData, setFormData] = React.useState([]);
  const [updatedData, setupdatedData] = React.useState({});
  const [isEdit, setIsEdit] = React.useState(false);
  const [initialData, setInitialData] = React.useState({
    maleName: "",
    femaleName: "",
    age: "",
    email: "",
    country: "",
    gender: "",
    joiningdate: "",
    maleBio: "",
    hobbie: [],
  });

  const { logout } = useAuth();
  const navigate = useNavigate();
  const minDate = 1 - 1 - 1753;

  const schema = yup.object({
    age: yup.string().required("Required"),
    email: yup.string().email("Invalid").required("Required"),
    gender: yup.string().nullable().required("Required"),
    country: yup.string().required("Required"),
    maleName: yup.string().when("gender", {
      is: "Male",
      then: yup.string().required(),
      otherwise: yup.string().notRequired(),
    }),
    maleBio: yup.string().when("gender", {
      is: "Male",
      then: yup.string().required("Male Bio is Required"),
      otherwise: yup.string().notRequired(),
    }),
    femaleName: yup.string().when("gender", {
      is: "Female",
      then: yup.string().required(),
      otherwise: yup.string().notRequired(),
    }),
    hobbie: yup.array().min(1, "select atleast one country").required(),
    joiningdate: yup
      .string()
      .matches(
        /(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)/,
        "Invalid Date"
      ) // for all date formats: ^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$|^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-(\d{4})$|^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$|^(\d{4})-(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])$
      .min(minDate, "Date should be greater than 01-01-1753")
      .required("Enter Date in DD-MM-YYYY format"),
  });

  const Countries = [
    { label: "Select Country", value: "", id: 1 },
    { label: "Albania", value: "Albania", id: 2 },
    { label: "Argentina", value: "Argentina", id: 3 },
    { label: "Austria", value: "Austria", id: 4 },
    { label: "Cocos Islands", value: "Cocos Islands", id: 5 },
    { label: "Kuwait", value: "Kuwait", id: 6 },
    { label: "Sweden", value: "Sweden", id: 7 },
    { label: "Venezuela", value: "Venezuela", id: 8 },
  ];

  const Hobbies = [
    { label: "Albania", value: 355, id: 1 },
    { label: "Argentina", value: 54, id: 2 },
    { label: "Austria", value: 43, id: 3 },
    { label: "Cocos Islands", value: 61, id: 4 },
    { label: "Kuwait", value: 965, id: 5 },
    { label: "Sweden", value: 46, id: 6 },
    { label: "Venezuela", value: 58, id: 7 },
  ];

  const Gender = [
    { label: "Male", id: 1 },
    { label: "Female", id: 2 },
  ];

  const onLogOut = () => {
    logout();
    navigate("/");
  };

  const submitForm = (values, { resetForm }) => {
    const newValues = {};
    if (values.gender === "Male") {
      values.femaleName = "";
    } else if (values.gender === "Female") {
      values.maleName = "";
      values.maleBio = "";
    }
    Object.keys(values).forEach((key) => {
      if (values[key] !== "") {
        newValues[key] = values[key];
      }
    });
    // setIsUpdate(false);
    setIsEdit(false);
    setFormData((prev) => [...prev, values]);
    // userData.push(newValues);
    console.log(newValues);
    resetForm();
  };

  const deleteRowData = (id) => {
    const data = [...formData];
    data.splice(id, 1);
    setFormData(data);
  };

  const updateRowData = (id) => {
    setupdatedData(formData.at(id));
    setIsEdit(true);
    console.log("updated data", updatedData);
  };

  return (
    <div>
      <Formik
        validationSchema={schema}
        initialValues={initialData}
        onSubmit={(values, { resetForm }) => {
          submitForm(values, { resetForm });
        }}
      >
        {({ values }) => (
          <div>
            <Form>
              <br />
              <div>
                <label>Email: </label>
                <Field name="email" type="text" />
                <ErrorMessage
                  name="email"
                  render={(msg) => <div className="error">{msg}</div>}
                />
                <br />
              </div>
              <br />
              <div>
                <label>Age: </label>
                <Field name="age" type="number" />
                <ErrorMessage
                  name="age"
                  render={(msg) => <div className="error">{msg}</div>}
                />
                <br />
              </div>
              <br />
              <div>
                <div>
                  <label>Gender: </label>
                </div>
                {Gender.map((gender) => {
                  return (
                    <div key={gender.id}>
                      <Field name="gender" value={gender.label} type="radio" />
                      <label>{gender.label} </label>
                    </div>
                  );
                })}
                <ErrorMessage
                  name="gender"
                  render={(msg) => <div className="error">{msg}</div>}
                />
                <br />
                {values.gender === "Male" && (
                  <>
                    <div>
                      <label>Male Name: </label>
                      <Field name="maleName" type="text" />
                      <ErrorMessage
                        name="maleName"
                        render={(msg) => <div className="error">{msg}</div>}
                      />
                    </div>
                    <br />
                    <div>
                      <label>Male Bio: </label>
                      <Field name="maleBio" as="textarea" />
                      <ErrorMessage
                        name="maleBio"
                        render={(msg) => <div className="error">{msg}</div>}
                      />
                    </div>
                  </>
                )}
                {values.gender === "Female" && (
                  <>
                    <div>
                      <label>Female Name: </label>
                      <Field name="femaleName" type="text" />
                      <ErrorMessage
                        name="femaleName"
                        render={(msg) => <div className="error">{msg}</div>}
                      />
                    </div>
                  </>
                )}
              </div>
              <br />
              <div>
                <label>joining Date: </label>
                <Field name="joiningdate" type="text" />
                <ErrorMessage
                  name="joiningdate"
                  render={(msg) => <div className="error">{msg}</div>}
                />
              </div>
              <br />
              <br />
              <div>
                <label>Country: </label>
                <Field name="country" as="select">
                  {Countries.map((country) => (
                    <option key={country.id} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="country"
                  render={(msg) => <div className="error">{msg}</div>}
                />
                <br />
              </div>
              <br />
              <br />
              <div>
                <label>Prefered Countries: </label>
                <br />
                <br />
                {Hobbies.map((hobbie) => (
                  <div key={hobbie.id}>
                    <div>
                      <Field
                        name="hobbie"
                        type="checkbox"
                        value={hobbie.label}
                      />
                      <label htmlFor="">{hobbie.label}</label>
                    </div>
                  </div>
                ))}
                <ErrorMessage
                  name="hobbie"
                  render={(msg) => <div className="error">{msg}</div>}
                />
                <br />
              </div>
              <button type="submit">Submit</button>
            </Form>
          </div>
        )}
      </Formik>
      <br />
      <input type="button" value="Log out" onClick={onLogOut} />
      <br />
      <br />
      <div>
        {/* <UserDataTable formData={formData} /> */}
        <table>
          <thead>
            <tr>
              <th>Male Name</th>
              <th>Female Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Country</th>
              <th>Joining Date</th>
              <th>Hobbies</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((user, index) => (
              <tr key={index}>
                <td>
                  {user.maleName === "" ? "not available" : user.maleName}
                </td>
                <td>
                  {user.femaleName === "" ? "not available" : user.femaleName}
                </td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.country}</td>
                <td>{user.joiningdate}</td>
                <td>{user.maleBio === "" ? "not available" : user.maleBio}</td>
                <td>{user.hobbie}</td>
                <td>
                  <button onClick={updateRowData}>Update</button>
                </td>
                <td>
                  <button onClick={deleteRowData}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
