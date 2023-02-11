import React from "react";
import axios from "axios";
import * as yup from "yup";
import useAuth from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Dashboard = () => {
  const newValues = {};
  const url = "http://192.168.192.227:4000/admin/module/";
  const minDate = 1 - 1 - 1753;
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [formData, setFormData] = React.useState([]);
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
    { label: "Reading", value: 355, id: 1 },
    { label: "Writing", value: 54, id: 2 },
    { label: "Swimming", value: 43, id: 3 },
    { label: "Travelling", value: 61, id: 4 },
    { label: "Music Playing", value: 965, id: 5 },
    { label: "Dancing", value: 46, id: 6 },
    { label: "VideoGames", value: 58, id: 7 },
  ];

  const Gender = [
    { label: "Male", id: 1 },
    { label: "Female", id: 2 },
  ];

  React.useEffect(() => {
    getUserData();
  }, []);

  const onLogOut = () => {
    logout();
    navigate("/");
  };

  const getUserData = async () => {
    await axios
      .get(url)
      .then((res) => {
        const data = res.data;
        return data.data;
      })
      .then((data) => {
        setFormData(data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const addUserData = async (newValues) => {
    await axios
      .post(url, newValues)
      .then((res) => {
        getUserData()
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const submitForm = (values, { resetForm }) => {
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
    addUserData(newValues);
    resetForm();
  };

  const deleteRowData = async (id) => {
    // const deleteID = {}
    await axios
      .delete(url.concat(`/${id}`))
      .then((res) => {
        getUserData()
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const updateRowData = (id) => {
    const data = formData.at(id);
    setTimeout(() => {
      setInitialData(() => {
        initialData.maleName = data.maleName;
        initialData.femaleName = data.femaleName;
        initialData.age = data.age;
        initialData.email = data.email;
        initialData.country = data.country;
        initialData.gender = data.gender;
        initialData.joiningdate = data.joiningdate;
        initialData.maleBio = data.maleBio;
        initialData.hobbie = data.hobbie;
      });
    }, 1000);
  };

  return (
    <div className="bg-slate-50 pt-6">
      <Formik
        validationSchema={schema}
        initialValues={initialData}
        onSubmit={(values, { resetForm }) => {
          submitForm(values, { resetForm });
        }}
      >
        {({ values }) => (
          <div className=" flex justify-center pl-8">
            <div className="block px-20 py-10 rounded-lg shadow-lg bg-white w-1/2">
              <div className="text-left  text-gray-800 py-2 ">
                <h3 className="text-3xl font-bold mb-8">Details Form</h3>
              </div>
              <Form className="w-full max-w-sm">
                <div className="">
                  <div>
                    <label className="cursor-pointer text-base">Email: </label>
                    <Field
                      name="email"
                      placeholder="Email Id"
                      type="text"
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
                    <br />
                  </div>
                  <br />
                  <div>
                    <label className="cursor-pointer text-base">Age: </label>
                    <Field
                      name="age"
                      type="number"
                      placeholder="Age"
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    <ErrorMessage
                      name="age"
                      render={(msg) => (
                        <span className="text-xs tracking-wide text-red-600">
                          {msg}
                        </span>
                      )}
                    />
                    <br />
                  </div>
                  <br />
                  <div>
                    <label className="cursor-pointer text-base">
                      Joining Date:{" "}
                    </label>
                    <Field
                      name="joiningdate"
                      type="text"
                      placeholder="Joining Date"
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    <ErrorMessage
                      name="joiningdate"
                      render={(msg) => (
                        <span className="text-xs tracking-wide text-red-600">
                          {msg}
                        </span>
                      )}
                    />
                  </div>
                  <br />
                  <div className="pb-2">
                    <label className="cursor-pointer text-base">Gender: </label>
                  </div>
                  <div className="border rounded-md pt-5 px-5 mb-3">
                    <div className="">
                      {Gender.map((gender) => {
                        return (
                          <div key={gender.id} className="form-check mb-2">
                            <Field
                              name="gender"
                              value={gender.label}
                              type="radio"
                              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                            />
                            <label className="cursor-pointer text-base pl-2">
                              {gender.label}{" "}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                    <ErrorMessage
                      name="gender"
                      render={(msg) => (
                        <span className="text-xs tracking-wide text-red-600">
                          {msg}
                        </span>
                      )}
                    />
                    <br />
                    {values.gender === "Male" && (
                      <>
                        <div>
                          <label className="cursor-pointer text-base">Name: </label>
                          <Field
                            name="maleName"
                            placeholder="Name"
                            type="text"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                          <ErrorMessage
                            name="maleName"
                            render={(msg) => (
                              <span className="text-xs tracking-wide text-red-600">
                                {msg}
                              </span>
                            )}
                          />
                        </div>
                        <br />
                        <div>
                          <label className="cursor-pointer text-base">Bio: </label>
                          <Field
                            name="maleBio"
                            as="textarea"
                            placeholder="Bio"
                            className="form-control block w-full px-4 py-2 mt-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          />
                          <ErrorMessage
                            name="maleBio"
                            render={(msg) => (
                              <span className="text-xs tracking-wide text-red-600">
                                {msg}
                              </span>
                            )}
                          />
                        </div>
                        <br />
                      </>
                    )}
                    {values.gender === "Female" && (
                      <>
                        <div>
                          <label className="cursor-pointer text-base">Name: </label>
                          <Field
                            name="femaleName"
                            placeholder="Name"
                            type="text"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                          <ErrorMessage
                            name="femaleName"
                            render={(msg) => (
                              <span className="text-xs tracking-wide text-red-600">
                                {msg}
                              </span>
                            )}
                          />
                        </div>
                        <br />
                      </>
                    )}
                  </div>
                  <div>
                    <div className="pb-3">
                      <label className="cursor-pointer text-base">Country: </label>
                    </div>
                    <Field
                      name="country"
                      as="select"
                      className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    >
                      {Countries.map((country) => (
                        <option key={country.id} value={country.value}>
                          {country.label}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="country"
                      render={(msg) => (
                        <span className="text-xs tracking-wide text-red-600">
                          {msg}
                        </span>
                      )}
                    />
                    <br />
                  </div>
                  <div>
                    <label className="cursor-pointer text-base">Hobbies: </label>
                    <br />
                    <br />
                    {Hobbies.map((hobbie) => (
                      <div key={hobbie.id} className="form-check">
                        <div>
                          <Field
                            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                            name="hobbie"
                            type="checkbox"
                            value={hobbie.label}
                          />
                          <label className="form-check-label inline-block text-gray-800">
                            {hobbie.label}
                          </label>
                        </div>
                      </div>
                    ))}
                    <ErrorMessage
                      name="hobbie"
                      render={(msg) => (
                        <span className="text-xs tracking-wide text-red-600">
                          {msg}
                        </span>
                      )}
                    />
                    <br />
                  </div>
                  <div className="flex space-x-2 justify-center pt-5">
                    <button
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      className="inline-block mx-5 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      type="submit"
                    >
                      Submit
                    </button>
                    <button
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      className="inline-block px-6 mx-5 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                      type="button"
                      value="Log out"
                      onClick={onLogOut}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
      <br />

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b bg-gray-200">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-black px-6 py-4 text-left"
                    >
                      Index
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-black px-6 py-4 text-left"
                    >
                      Male Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-black px-6 py-4 text-left"
                    >
                      Female Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-black px-6 py-4 text-left"
                    >
                      Age
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-black px-6 py-4 text-left"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-black px-6 py-4 text-left"
                    >
                      Gender
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-black px-6 py-4 text-left"
                    >
                      Country
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-black px-6 py-4 text-left"
                    >
                      Joining Date
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-black px-6 py-4 text-left"
                    >
                      Male Bio
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-black px-6 py-4 text-left"
                    >
                      Hobbies
                    </th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {formData.map((user,index) => (
                    <tr key={user.id} className="border-b">
                      <td className="text-sm text-black font-light px-6 py-4 whitespace-nowrap">
                        {index+1}
                      </td>
                      <td className="text-sm text-black font-light px-6 py-4 whitespace-nowrap">
                        {user.maleName === "" || user.maleName == null
                          ? "N/A"
                          : user.maleName}
                      </td>
                      <td className="text-sm text-black font-light px-6 py-4 whitespace-nowrap">
                        {user.femaleName === "" || user.femaleName == null
                          ? "N/A"
                          : user.femaleName}
                      </td>
                      <td className="text-sm text-black font-light px-6 py-4 whitespace-nowrap">
                        {user.age}
                      </td>
                      <td className="text-sm text-black font-light px-6 py-4 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="text-sm text-black font-light px-6 py-4 whitespace-nowrap">
                        {user.gender}
                      </td>
                      <td className="text-sm text-black font-light px-6 py-4 whitespace-nowrap">
                        {user.country}
                      </td>
                      <td className="text-sm text-black font-light px-6 py-4 whitespace-nowrap">
                        {user.joiningdate}
                      </td>
                      <td className="text-sm text-black font-light px-6 py-4 whitespace-nowrap">
                        {user.maleBio === "" || user.maleBio == null
                          ? "N/A"
                          : user.maleBio}
                      </td>
                      <td className="text-sm text-black font-light px-6 py-4 whitespace-nowrap">
                        {user.hobbie}
                      </td>
                      <td className="text-sm text-black font-light px-6 py-4 whitespace-nowrap">
                        <button
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                          onClick={updateRowData}
                        >
                          Update
                        </button>
                      </td>
                      <td className="text-sm text-black font-light px-6 py-4 whitespace-nowrap">
                        <button
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                          className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                          onClick={() => deleteRowData(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
