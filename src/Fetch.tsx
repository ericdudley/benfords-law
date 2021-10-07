import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useRef, useState } from "react";
import { AppContext } from "./App";
import "./App.css";
import { ATTRIBUTE_HANDLERS } from "./utils";

export const Fetch = () => {
  const { attribute, rows, appendRows } = useContext(AppContext);
  const [isFetching, setIsFetching] = useState(false);
  const isFetchingRef = useRef(false);
  const lastFetchedPageRef = useRef(0);

  const hasAttr = attribute && attribute !== "none";

  const startFetching = () => {
    const effect = async () => {
      setIsFetching(true);
      isFetchingRef.current = true;
      const seed = Math.random();
      if (hasAttr) {
        for (let i = 1; isFetchingRef.current && i <= 10; i += 1) {
          const rows = await ATTRIBUTE_HANDLERS[attribute](
            lastFetchedPageRef.current + 1,
            seed
          );
          if (rows) {
            lastFetchedPageRef.current += 1;
            appendRows(rows);
          }
        }
        setIsFetching(false);
        isFetchingRef.current = false;
      }
    };

    effect();
  };

  const stopFetching = () => {
    setIsFetching(false);
    isFetchingRef.current = false;
  };

  return (
    <div>
      <Box mt={2}>
        {hasAttr && !isFetching && (
          <Button variant="contained" onClick={startFetching}>
            {rows.length === 0 ? "Begin fetching data" : "Fetch more data"}
          </Button>
        )}
        {hasAttr && isFetching && (
          <Box display="flex" alignItems="center">
            <Button variant="outlined" onClick={stopFetching}>
              Cancel
            </Button>
            <Box ml={1}>
              <CircularProgress size={18} />
            </Box>
          </Box>
        )}
        {rows.length >= 5 && (
          <Box mt={2}>
            <Typography>Fetched {rows.length} rows</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>INDEX</TableCell>
                  <TableCell>{attribute.toUpperCase()}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .map((row, idx) => ({ row, idx }))
                  .slice(rows.length - 5, rows.length)
                  .map(({ row, idx }) => (
                    <TableRow key={row.id}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{row.label}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </Box>
    </div>
  );
};
