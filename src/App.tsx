import { Container, CssBaseline, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { createContext, useState } from "react";
import { Helmet } from "react-helmet";
import "./App.css";
import { Chart } from "./Chart";
import { Explanation } from "./Explanation";
import { Fetch } from "./Fetch";
import { Footer } from "./Footer";
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
      <Helmet>
        <title>Benford's Law</title>
        <meta
          name="description"
          content="A demonstration of the mathematical distribution, Benford's Law."
        />
        <meta name="author" content="Eric Dudley" />
      </Helmet>
      <CssBaseline />
      <div className="app">
        <main>
          <Container maxWidth="md">
            <Typography variant="h3" mt={2}>
              Benford's Law
            </Typography>
            <Box
              margin="0 auto"
              borderLeft="solid darkgrey 3px"
              paddingY="16px"
              display="flex"
              alignItems="center"
              paddingLeft="8px"
            >
              <Typography fontSize="20px">
                "In many naturally occurring collections of numbers, the leading
                digit is likely to be small."
              </Typography>
            </Box>
            <Explanation />
            <Box mt={2}>
              <Typography variant="h6">
                Using the form below, you can test several data sets to see if
                they conform to Benford's Law.
              </Typography>
              <Form />
              <Fetch />
              <Chart />
            </Box>
          </Container>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </AppContext.Provider>
  );
}

export default App;
