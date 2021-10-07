import { InputLabel, MenuItem, Select } from "@mui/material";
import React, { useContext } from "react";
import { AppContext } from "./App";
import "./App.css";
import { Attribute } from "./types";

export const Form = () => {
  const { attribute, setAttribute } = useContext(AppContext);

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
        <MenuItem value={"none"}>Name number, age, postcode...</MenuItem>
        <MenuItem value={"name"}>Name number</MenuItem>
        <MenuItem value={"postcode"}>Postcode</MenuItem>
        <MenuItem value={"age"}>Age</MenuItem>
        <MenuItem value={"latitude"}>Latitude</MenuItem>
        <MenuItem value={"street number"}>Street Number</MenuItem>
      </Select>
    </div>
  );
};
