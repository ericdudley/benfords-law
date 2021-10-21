import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useContext } from "react";
import { AppContext } from "./App";
import "./App.css";
import { Attribute } from "./types";
import { ATTRIBUTE_HANDLERS } from "./utils";

export const Form = () => {
  const { clearRows, attribute, setAttribute } = useContext(AppContext);

  const onChange = (event: SelectChangeEvent) => {
    clearRows();
    setAttribute(event.target.value as Attribute);
  };

  return (
    <div>
      <InputLabel id="attribute-select">Select a data set to test</InputLabel>
      <Select labelId="attribute-select" value={attribute} onChange={onChange}>
        <MenuItem disabled value={"none"}>
          Factorials, currency conversions, etc.
        </MenuItem>
        {Array.from(Object.keys(ATTRIBUTE_HANDLERS)).map((key) => (
          <MenuItem key={key} value={key}>
            {key}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
