import React from "react";

import Dropdown from "./DropDown";

const options = [
  { label: "English", value: 1 },
  { label: "Hindi", value: 2 },
  { label: "Gujarati", value: 3 },
];

class DropdownEXP extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      SeletedVal: "",
    };
  }

  handleChange = (e) => {
    var value = e.target.value;

    this.setState({
      SeletedVal: value,
    });
  };

  render() {
    return (
      <Dropdown
        id={"1"}
        name={"location"}
        options={options}
        title={"Locations"}
        handleChange={this.handleChange}
        selectedValue={this.state.SeletedVal}
      />
    );
  }
}

export default DropdownEXP;
