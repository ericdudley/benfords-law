import { AppBar, Container, Link, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { createContext, useState } from "react";
import "./App.css";
import { Chart } from "./Chart";
import { Fetch } from "./Fetch";
import { Form } from "./Form";
import { Attribute, Row } from "./types";

export const AppContext = createContext({
  attribute: "" as Attribute,
  setAttribute: (attribute: Attribute) => {},
  rows: [] as Row[],
  appendRows: (rows: Row[]) => {},
  clearRows: () => {},
});

function App() {
  const [attribute, setAttribute] = useState<Attribute>("none");
  const [rows, setRows] = useState<Row[]>([]);

  return (
    <AppContext.Provider
      value={{
        attribute,
        setAttribute,
        clearRows: () => setRows([]),
        rows,
        appendRows: (newRows: Row[]) =>
          setRows((oldRows) => oldRows.concat(newRows)),
      }}
    >
      <div>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h5">Benford's Law</Typography>
            <Box ml={1} mr={2}>
              <Link
                target="_blank"
                href="https://en.wikipedia.org/wiki/Benford%27s_law"
                color="textPrimary"
              >
                <Typography variant="caption">Wikipedia</Typography>
              </Link>
            </Box>
            <Box margin="0 auto">
              <Typography>
                "In many naturally occurring collections of numbers, the leading
                digit is likely to be small."
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <main>
          <Box mt={2}>
            <Container maxWidth="md">
              <Typography variant="h6">
                On this page, we will fetch data from various public APIs to
                test if Benford's Law will apply to it.
              </Typography>
              <Form />
              <Fetch />
              <Chart />
            </Container>
          </Box>
        </main>
      </div>
    </AppContext.Provider>
  );
}

export default App;
