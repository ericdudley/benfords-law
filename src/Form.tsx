import { InputLabel, MenuItem, Select } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { AppContext } from "./App";
import "./App.css";
import { Attribute } from "./types";
import { ATTRIBUTE_HANDLERS } from "./utils";

export const Form = () => {
  const { clearRows, attribute, setAttribute } = useContext(AppContext);

  useEffect(() => {
    clearRows();
  }, [attribute]);

  return (
    <div>
      <InputLabel id="attribute-select">
        Select what data set you would like to use
      </InputLabel>
      <Select
        labelId="attribute-select"
        value={attribute}
        onChange={(event) => {
          setAttribute(event.target.value as Attribute);
        }}
      >
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
