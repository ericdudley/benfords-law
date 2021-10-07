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
import { Row } from "./types";
import { get, getData, makeid } from "./utils";

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
      const seed = makeid(8);
      if (attribute) {
        for (let i = 1; isFetchingRef.current && i <= 10; i += 1) {
          const response = await get(
            `/api?seed=${seed}&results=500&nat=us&page=${
              lastFetchedPageRef.current + 1
            }`
          );
          if (response) {
            lastFetchedPageRef.current += 1;
            const json = await response.json();
            const newRows: Row[] = json && json.results;
            if (newRows) {
              appendRows(newRows);
            }
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
                    <TableRow>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{getData(attribute, row)}</TableCell>
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
