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
      <InputLabel id="attribute-select">
        Select what data set you would like to use
      </InputLabel>
      <Select labelId="attribute-select" value={attribute} onChange={onChange}>
        <MenuItem disabled value={"none"}>
          Fibonacci sequence, book references, currencies...
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
