import React from "react";

function UserDataTable(props) {
  const [formData, setFormData] = React.useState(props.formData);

  function deleteRowData(id) {
    const data = [...formData];
    data.splice(id, 1);
    setFormData(data);
  }

  return (
    <div>
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
              <td>{user.maleName === "" ? "not available" : user.maleName}</td>
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
                <button>Update</button>
              </td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDataTable;
